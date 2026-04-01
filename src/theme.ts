import type { ThemeColorKey } from './colors'
import { themeColors } from './colors'

type Style = 'light' | 'dark'

/** Resolve a themed pair for the current VS Code appearance. */
function t(style: Style, key: ThemeColorKey): string {
  return themeColors[key][style === 'dark' ? 0 : 1]
}

/**
 * When light and dark need different strings (not from `themeColors`), branch explicitly.
 * Only use where `t()` is not enough.
 */
function whenLightDark(style: Style, light: string, dark: string): string {
  return style === 'light' ? light : dark
}

function bracketHighlightColors(style: Style): Record<string, string> {
  const b = t(style, 'bracket')
  return Object.fromEntries([1, 2, 3, 4, 5, 6].map((n) => [`editorBracketHighlight.foreground${n}`, b]))
}

export default function getTheme({ style, name }: { style: Style; name: string }) {
  const w = (light: string, dark: string) => whenLightDark(style, light, dark)

  const foreground = t(style, 'foreground')
  const background = t(style, 'background')
  const secondaryForeground = t(style, 'secondaryForeground')
  const border = t(style, 'border')
  const activeForeground = t(style, 'activeForeground')
  const activeBackground = t(style, 'activeBackground')
  const strongBackground = t(style, 'strongBackground')
  const tabBackground = t(style, 'tabBackground')
  const primary = t(style, 'primary')
  const secondary = t(style, 'secondary')
  const tertiary = t(style, 'tertiary')

  const gitFg = (key: 'gitAdded' | 'gitModified' | 'gitDeleted' | 'gitUntracked') =>
    w(t(style, key), `${t(style, key)}cc`)

  return {
    name,
    colors: {
      focusBorder: '#00000000',
      ...bracketHighlightColors(style),

      foreground,
      descriptionForeground: secondaryForeground,
      errorForeground: t(style, 'red'),

      'textLink.foreground': primary,
      'textLink.activeForeground': primary,
      'textBlockQuote.background': background,
      'textBlockQuote.border': border,
      'textCodeBlock.background': background,
      'textPreformat.foreground': secondaryForeground,
      'textSeparator.foreground': secondaryForeground,

      'editorBracketHighlight.unexpectedBracket.foreground': tertiary,

      'button.background': primary,
      'button.foreground': background,
      'button.hoverBackground': primary,

      'checkbox.background': activeBackground,
      'checkbox.border': w(t(style, 'border'), t(style, 'activeForeground')),

      'dropdown.background': background,
      'dropdown.border': border,
      'dropdown.foreground': foreground,
      'dropdown.listBackground': t(style, 'dropdownBackground'),

      'input.background': activeBackground,
      'input.border': border,
      'input.foreground': foreground,
      'input.placeholderForeground': secondaryForeground,

      'badge.foreground': background,
      'badge.background': secondaryForeground,

      'progressBar.background': primary,

      'titleBar.activeForeground': activeForeground,
      'titleBar.activeBackground': background,
      'titleBar.inactiveForeground': t(style, 'ignored'),
      'titleBar.inactiveBackground': background,
      'titleBar.border': activeBackground,

      'activityBar.foreground': foreground,
      'activityBar.inactiveForeground': t(style, 'ignored'),
      'activityBar.background': background,
      'activityBarBadge.foreground': background,
      'activityBarBadge.background': activeForeground,
      'activityBar.activeBorder': primary,
      'activityBar.border': border,

      'sideBar.foreground': foreground,
      'sideBar.background': background,
      'sideBar.border': border,
      'sideBarTitle.foreground': foreground,
      'sideBarSectionHeader.foreground': secondary,
      'sideBarSectionHeader.background': background,
      'sideBarSectionHeader.border': border,

      'list.hoverForeground': foreground,
      'list.inactiveSelectionForeground': foreground,
      'list.activeSelectionForeground': activeForeground,
      'list.hoverBackground': activeBackground,
      'list.inactiveSelectionBackground': activeBackground,
      'list.activeSelectionBackground': strongBackground,
      'list.inactiveFocusBackground': background,
      'list.focusBackground': activeBackground,

      'tree.indentGuidesStroke': t(style, 'indentGuide'),

      'notificationCenterHeader.foreground': foreground,
      'notificationCenterHeader.background': background,
      'notifications.foreground': foreground,
      'notifications.background': background,
      'notifications.border': border,
      'notificationsErrorIcon.foreground': t(style, 'red'),
      'notificationsWarningIcon.foreground': t(style, 'orange'),
      'notificationsInfoIcon.foreground': t(style, 'uiInfo'),

      'pickerGroup.border': secondaryForeground,
      'pickerGroup.foreground': foreground,
      'quickInput.background': background,
      'quickInput.foreground': foreground,

      'statusBar.foreground': activeForeground,
      'statusBar.background': background,
      'statusBar.border': border,
      'statusBar.noFolderBackground': background,
      'statusBar.debuggingBackground': activeBackground,
      'statusBar.debuggingForeground': activeForeground,
      'statusBarItem.prominentBackground': activeBackground,

      'editorGroupHeader.tabsBackground': background,
      'editorGroupHeader.tabsBorder': border,
      'editorGroup.border': border,

      'tab.activeForeground': activeForeground,
      'tab.inactiveForeground': secondaryForeground,
      'tab.inactiveBackground': activeBackground,
      'tab.activeBackground': background,
      'tab.hoverBackground': tabBackground,
      'tab.unfocusedHoverBackground': background,
      'tab.border': border,
      'tab.unfocusedActiveBorderTop': border,
      'tab.activeBorder': border,
      'tab.unfocusedActiveBorder': border,
      'tab.activeBorderTop': primary,

      'breadcrumb.foreground': secondaryForeground,
      'breadcrumb.focusForeground': foreground,
      'breadcrumb.activeSelectionForeground': secondaryForeground,
      'breadcrumbPicker.background': background,

      'editor.foreground': foreground,
      'editor.background': background,
      'editorWidget.background': background,
      'editor.foldBackground': background,
      'editor.lineHighlightBackground': activeBackground,
      'editorLineNumber.foreground': w(`${secondary}50`, `${secondary}40`),
      'editorLineNumber.activeForeground': w(secondary, `${secondary}cc`),
      'editorIndentGuide.background': t(style, 'indentGuide'),
      'editorIndentGuide.activeBackground': t(style, 'activeIndentGuide'),
      'editorWhitespace.foreground': t(style, 'indentGuide'),
      'editorCursor.foreground': w(t(style, 'foreground'), activeForeground),

      'editor.findMatchBackground': `${primary}40`,
      'editor.findMatchHighlightBackground': t(style, 'tabBackground'),
      'editor.inactiveSelectionBackground': `${secondary}20`,
      'editor.selectionBackground': `${secondary}40`,
      'editor.selectionHighlightBackground': `${secondary}20`,
      'editor.wordHighlightBackground': `${secondary}40`,
      'editor.wordHighlightStrongBackground': `${primary}35`,
      'editorBracketMatch.background': `${secondary}20`,

      'diffEditor.insertedTextBackground': `${t(style, 'gitAdded')}30`,
      'diffEditor.removedTextBackground': `${t(style, 'gitDeleted')}30`,

      'scrollbar.shadow': secondaryForeground,
      'scrollbarSlider.background': `${secondary}18`,
      'scrollbarSlider.hoverBackground': `${secondary}25`,
      'scrollbarSlider.activeBackground': `${secondary}35`,
      'editorOverviewRuler.border': `${secondary}00`,

      'panel.background': background,
      'panel.border': border,
      'panelTitle.activeBorder': primary,
      'panelTitle.activeForeground': activeForeground,
      'panelTitle.inactiveForeground': t(style, 'ignored'),
      'panelInput.border': secondaryForeground,

      'terminal.foreground': foreground,
      'terminal.ansiBrightBlack': foreground,
      'terminal.ansiBrightBlue': t(style, 'blue'),
      'terminal.ansiBrightCyan': t(style, 'cyan'),
      'terminal.ansiBrightGreen': t(style, 'green'),
      'terminal.ansiBrightMagenta': t(style, 'magenta'),
      'terminal.ansiBrightRed': t(style, 'red'),
      'terminal.ansiBrightWhite': w(foreground, activeForeground),
      'terminal.ansiBrightYellow': t(style, 'yellow'),
      'terminal.ansiBlack': foreground,
      'terminal.ansiBlue': t(style, 'blue'),
      'terminal.ansiCyan': t(style, 'cyan'),
      'terminal.ansiGreen': t(style, 'green'),
      'terminal.ansiMagenta': t(style, 'magenta'),
      'terminal.ansiRed': t(style, 'red'),
      'terminal.ansiWhite': w(foreground, background),
      'terminal.ansiYellow': t(style, 'yellow'),

      'gitDecoration.addedResourceForeground': gitFg('gitAdded'),
      'gitDecoration.modifiedResourceForeground': gitFg('gitModified'),
      'gitDecoration.deletedResourceForeground': gitFg('gitDeleted'),
      'gitDecoration.untrackedResourceForeground': gitFg('gitUntracked'),
      'gitDecoration.ignoredResourceForeground': t(style, 'gitIgnoredDim'),
      'gitDecoration.conflictingResourceForeground': w(t(style, 'gitConflicting'), `${t(style, 'gitConflicting')}cc`),
      'gitDecoration.submoduleResourceForeground': t(style, 'submoduleResource'),

      'editorGutter.modifiedBackground': gitFg('gitModified'),
      'editorGutter.addedBackground': gitFg('gitAdded'),
      'editorGutter.deletedBackground': gitFg('gitDeleted'),

      'debugToolBar.background': background,
      'editor.stackFrameHighlightBackground': w(t(style, 'yellow'), t(style, 'purple')),
      'editor.focusedStackFrameHighlightBackground': w(t(style, 'yellow'), t(style, 'purple')),

      'peekViewEditor.matchHighlightBackground': t(style, 'yellow'),
      'peekViewResult.matchHighlightBackground': t(style, 'yellow'),
      'peekViewEditor.background': background,
      'peekViewResult.background': background,

      'settings.headerForeground': activeForeground,
      'settings.modifiedItemIndicator': primary,
      'welcomePage.buttonBackground': t(style, 'tabBackground'),
      'welcomePage.buttonHoverBackground': activeBackground,

      'problemsErrorIcon.foreground': t(style, 'red'),
      'problemsWarningIcon.foreground': t(style, 'orange'),
      'problemsInfoIcon.foreground': t(style, 'uiInfo'),

      'editorError.foreground': t(style, 'red'),
      'editorWarning.foreground': t(style, 'orange'),
      'editorInfo.foreground': t(style, 'uiInfo'),
      'editorHint.foreground': t(style, 'green'),

      'editorGutter.commentRangeForeground': t(style, 'gitIgnoredDim'),
      'editorGutter.foldingControlForeground': t(style, 'foldingControl'),
    },
    semanticHighlighting: true,
    semanticTokenColors: {
      namespace: t(style, 'namespace'),
      interface: t(style, 'interface'),
      class: t(style, 'class'),
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: { foreground: t(style, 'comment') },
      },
      {
        scope: ['punctuation', 'meta.tag.inline.any.html', 'meta.tag.block.any.html', 'meta.brace'],
        settings: { foreground: t(style, 'punctuation') },
      },
      {
        scope: [
          'constant',
          'entity.name.constant',
          'variable.other.constant',
          'variable.language',
          'meta.definition.variable',
        ],
        settings: { foreground: t(style, 'constant') },
      },
      { scope: ['entity', 'entity.name'], settings: { foreground: t(style, 'function') } },
      { scope: 'variable.parameter.function', settings: { foreground } },
      { scope: 'entity.name.tag', settings: { foreground: t(style, 'literal') } },
      { scope: 'entity.name.function', settings: { foreground: t(style, 'function') } },
      { scope: 'keyword', settings: { foreground: t(style, 'keyword') } },
      { scope: ['storage', 'storage.type'], settings: { foreground: t(style, 'builtin') } },
      { scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'], settings: { foreground } },
      {
        scope: ['string', 'punctuation.definition.string', 'string punctuation.section.embedded source'],
        settings: { foreground: t(style, 'string') },
      },
      { scope: 'support', settings: { foreground: t(style, 'property') } },
      {
        scope: ['meta.property-name', 'entity.other.attribute-name', 'meta.object-literal.key'],
        settings: { foreground: t(style, 'property') },
      },
      { scope: 'variable', settings: { foreground: t(style, 'variable') } },
      { scope: 'namespace', settings: { foreground: t(style, 'namespace') } },
      { scope: 'keyword.operator', settings: { foreground: t(style, 'builtin') } },
      {
        scope: ['meta.decorator', 'punctuation.decorator', 'support.decorator'],
        settings: { foreground: t(style, 'decorator') },
      },
      {
        scope: ['invalid.broken', 'invalid.deprecated', 'invalid.illegal', 'invalid.unimplemented', 'message.error'],
        settings: { fontStyle: 'italic', foreground: t(style, 'red') },
      },
      {
        scope: 'carriage-return',
        settings: {
          fontStyle: 'italic underline',
          background: t(style, 'red'),
          foreground: background,
          content: '^M',
        },
      },
      { scope: 'string source', settings: { foreground } },
      { scope: 'string variable', settings: { foreground: t(style, 'string') } },
      { scope: ['source.regexp', 'string.regexp'], settings: { foreground: t(style, 'regex') } },
      {
        scope: [
          'string.regexp.character-class',
          'string.regexp constant.character.escape',
          'string.regexp source.ruby.embedded',
          'string.regexp string.regexp.arbitrary-repitition',
        ],
        settings: { foreground: t(style, 'string') },
      },
      {
        scope: 'string.regexp constant.character.escape',
        settings: { fontStyle: 'bold', foreground: t(style, 'green') },
      },
      { scope: 'support.constant', settings: { foreground: t(style, 'constant') } },
      { scope: 'support.variable', settings: { foreground: t(style, 'literal') } },
      { scope: 'constant.numeric', settings: { foreground: t(style, 'number') } },
      { scope: 'keyword.other.unit', settings: { foreground: t(style, 'builtin') } },
      { scope: 'constant.language.boolean', settings: { foreground: t(style, 'boolean') } },
      { scope: 'meta.module-reference', settings: { foreground: primary } },
      { scope: 'punctuation.definition.list.begin.markdown', settings: { foreground: t(style, 'orange') } },
      { scope: ['markup.heading', 'markup.heading entity.name'], settings: { fontStyle: 'bold', foreground: primary } },
      { scope: 'markup.quote', settings: { foreground: primary } },
      { scope: 'markup.italic', settings: { fontStyle: 'italic', foreground } },
      { scope: 'markup.bold', settings: { fontStyle: 'bold', foreground } },
      { scope: 'markup.raw', settings: { foreground: primary } },
      {
        scope: ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted'],
        settings: { background: t(style, 'red'), foreground: background },
      },
      {
        scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
        settings: { background: t(style, 'green'), foreground: background },
      },
      {
        scope: ['markup.changed', 'punctuation.definition.changed'],
        settings: { background: t(style, 'orange'), foreground: background },
      },
      {
        scope: ['markup.ignored', 'markup.untracked'],
        settings: { foreground: secondaryForeground, background: t(style, 'blue') },
      },
      { scope: 'meta.diff.range', settings: { foreground: t(style, 'purple'), fontStyle: 'bold' } },
      { scope: 'meta.diff.header', settings: { foreground: t(style, 'uiInfo') } },
      { scope: 'meta.separator', settings: { fontStyle: 'bold', foreground: t(style, 'uiInfo') } },
      { scope: 'meta.output', settings: { foreground: t(style, 'uiInfo') } },
      {
        scope: [
          'brackethighlighter.tag',
          'brackethighlighter.curly',
          'brackethighlighter.round',
          'brackethighlighter.square',
          'brackethighlighter.angle',
          'brackethighlighter.quote',
        ],
        settings: { foreground: tertiary },
      },
      { scope: 'brackethighlighter.unmatched', settings: { foreground: t(style, 'red') } },
      {
        scope: [
          'constant.other.reference.link',
          'string.other.link',
          'punctuation.definition.string.begin.markdown',
          'punctuation.definition.string.end.markdown',
        ],
        settings: { foreground: t(style, 'string') },
      },
      {
        scope: ['markup.underline.link.markdown'],
        settings: { foreground: secondaryForeground, fontStyle: 'underline' },
      },
    ],
  }
}
