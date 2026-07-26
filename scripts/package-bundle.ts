import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { deflateRawSync } from 'node:zlib'

type Entry = {
  name: string
  data: Buffer
}

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value
  for (let bit = 0; bit < 8; bit += 1) crc = (crc & 1) !== 0 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1
  return crc >>> 0
})

function crc32(data: Buffer) {
  let crc = 0xffffffff
  for (const byte of data) crc = (crcTable[(crc ^ byte) & 0xff] ?? 0) ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

async function walk(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const paths = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)
      return entry.isDirectory() ? walk(entryPath) : [entryPath]
    }),
  )
  return paths.flat()
}

function zip(entries: Entry[]) {
  const localParts: Buffer[] = []
  const centralParts: Buffer[] = []
  let offset = 0

  for (const entry of entries) {
    const name = Buffer.from(entry.name)
    const compressed = deflateRawSync(entry.data, { level: 9 })
    const checksum = crc32(entry.data)
    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4)
    local.writeUInt16LE(0x0800, 6)
    local.writeUInt16LE(8, 8)
    local.writeUInt16LE(0, 10)
    local.writeUInt16LE(0x0021, 12)
    local.writeUInt32LE(checksum, 14)
    local.writeUInt32LE(compressed.length, 18)
    local.writeUInt32LE(entry.data.length, 22)
    local.writeUInt16LE(name.length, 26)
    localParts.push(local, name, compressed)

    const central = Buffer.alloc(46)
    central.writeUInt32LE(0x02014b50, 0)
    central.writeUInt16LE(20, 4)
    central.writeUInt16LE(20, 6)
    central.writeUInt16LE(0x0800, 8)
    central.writeUInt16LE(8, 10)
    central.writeUInt16LE(0, 12)
    central.writeUInt16LE(0x0021, 14)
    central.writeUInt32LE(checksum, 16)
    central.writeUInt32LE(compressed.length, 20)
    central.writeUInt32LE(entry.data.length, 24)
    central.writeUInt16LE(name.length, 28)
    central.writeUInt32LE(0, 38)
    central.writeUInt32LE(offset, 42)
    centralParts.push(central, name)
    offset += local.length + name.length + compressed.length
  }

  const centralDirectory = Buffer.concat(centralParts)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  end.writeUInt16LE(entries.length, 8)
  end.writeUInt16LE(entries.length, 10)
  end.writeUInt32LE(centralDirectory.length, 12)
  end.writeUInt32LE(offset, 16)
  return Buffer.concat([...localParts, centralDirectory, end])
}

const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8')) as { version: string }
const sourcePaths = [
  ...(await walk('ports')),
  ...(await walk('themes')),
  'README.md',
  'CONTRIBUTING.md',
  'CHANGELOG.md',
  'LICENSE',
  'logo.png',
].sort()

const entries: Entry[] = await Promise.all(
  sourcePaths.map(async (sourcePath) => ({
    name: `angrboda/${sourcePath}`,
    data: await fs.readFile(sourcePath),
  })),
)

const manifest = {
  name: 'Angrboða cross-tool theme bundle',
  version: packageJson.version,
  files: entries.map(({ name, data }) => ({
    path: name,
    bytes: data.length,
    sha256: createHash('sha256').update(data).digest('hex'),
  })),
}
entries.push({
  name: 'angrboda/MANIFEST.json',
  data: Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`),
})

await fs.mkdir('dist', { recursive: true })
const outputPath = `dist/angrboda-themes-${packageJson.version}.zip`
await fs.writeFile(outputPath, zip(entries))
console.log(`Created ${outputPath} with ${entries.length} files.`)
