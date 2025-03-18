import { getColors } from './primer'
import { AngrbodaThemes } from './colors'

export default function getTheme({ style, name }) {
  // Usage: `pick({ light: "lightblue", dark: "darkblue" })`
  const pick = options => options[style]

  const angrboda = (key: keyof typeof AngrbodaThemes) => pick({ light: AngrbodaThemes[key][1], dark: AngrbodaThemes[key][0] })

  const primer = getColors(style)

  const foreground = angrboda('foreground')
  const background = angrboda('background')
  const secondaryForeground = angrboda('secondaryForeground')
  const border = angrboda('border')
  const activeForeground = angrboda('activeForeground')
  const activeBackground = angrboda('activeBackground')
  const strongBackground = angrboda('strongBackground')
  const tabBackground = angrboda('tabBackground')
  const primary = angrboda('primary')
  const secondary = angrboda('secondary')

  return {
    name,
    colors: {
      focusBorder: '#00000000',
      foreground,
      descriptionForeground: secondaryForeground,
      errorForeground: angrboda('red'),

      'textLink.foreground': primary,
      'textLink.activeForeground': primary,
      'textBlockQuote.background': background,
      'textBlockQuote.border': border,
      'textCodeBlock.background': background,
      'textPreformat.foreground': primer.gray[6],
      'textSeparator.foreground': primer.gray[3],

      'editorBracketHighlight.foreground1': angrboda('comment'),
      'editorBracketHighlight.foreground2': angrboda('comment'),
      'editorBracketHighlight.foreground3': angrboda('comment'),
      'editorBracketHighlight.foreground4': angrboda('comment'),
      'editorBracketHighlight.foreground5': angrboda('comment'),
      'editorBracketHighlight.foreground6': angrboda('comment'),
      'editorBracketHighlight.unexpectedBracket.foreground': angrboda('tertiary'),

      'button.background': primary,
      'button.foreground': background,
      'button.hoverBackground': pick({ light: '#ca3131', dark: '#ff7a7a' }),

      'checkbox.background': activeBackground,
      'checkbox.border': pick({ light: primer.gray[3], dark: primer.white }),

      'dropdown.background': background,
      'dropdown.border': border,
      'dropdown.foreground': foreground,
      'dropdown.listBackground': activeBackground,

      'input.background': activeBackground,
      'input.border': border,
      'input.foreground': foreground,
      'input.placeholderForeground': secondaryForeground,

      'badge.foreground': background,
      'badge.background': secondaryForeground,

      'progressBar.background': primary,

      'titleBar.activeForeground': activeForeground,
      'titleBar.activeBackground': background,
      'titleBar.inactiveForeground': angrboda('ignored'),
      'titleBar.inactiveBackground': background,
      'titleBar.border': activeBackground,

      'activityBar.foreground': foreground,
      'activityBar.inactiveForeground': angrboda('ignored'),
      'activityBar.background': background,
      'activityBarBadge.foreground': background,
      'activityBarBadge.background': activeForeground,
      'activityBar.activeBorder': primary,
      'activityBar.border': border,

      'sideBar.foreground': activeForeground,
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

      'tree.indentGuidesStroke': pick({
        light: '#e1e4e880',
        dark: '#3a424a80',
      }),

      'notificationCenterHeader.foreground': angrboda('ignored'),
      'notificationCenterHeader.background': background,
      'notifications.foreground': foreground,
      'notifications.background': background,
      'notifications.border': border,
      'notificationsErrorIcon.foreground': angrboda('red'),
      'notificationsWarningIcon.foreground': angrboda('orange'),
      'notificationsInfoIcon.foreground': angrboda('blue'),

      'pickerGroup.border': pick({ light: '#e1e4e880', dark: '#4d545980' }),
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
      'tab.inactiveForeground': pick({ light: '#8f9498', dark: '#a8aeb3' }),
      'tab.inactiveBackground': activeBackground,
      'tab.activeBackground': background,
      'tab.hoverBackground': tabBackground,
      'tab.unfocusedHoverBackground': background,
      'tab.border': border,
      'tab.unfocusedActiveBorderTop': border,
      'tab.activeBorder': border,
      'tab.unfocusedActiveBorder': border,
      'tab.activeBorderTop': primary,

      'breadcrumb.foreground': pick({ light: '#8f9498', dark: '#7d858d' }),
      'breadcrumb.focusForeground': foreground,
      'breadcrumb.activeSelectionForeground': primer.gray[6],
      'breadcrumbPicker.background': background,

      'editor.foreground': foreground,
      'editor.background': background,
      'editorWidget.background': background,
      'editor.foldBackground': background,
      'editor.lineHighlightBackground': activeBackground,
      'editorLineNumber.foreground': pick({
        light: `${secondary}50`,
        dark: `${secondary}40`,
      }),
      'editorLineNumber.activeForeground': pick({
        light: secondary,
        dark: `${secondary}cc`,
      }),
      'editorIndentGuide.background': pick({
        light: '#eff2f660',
        dark: '#3a424a40',
      }),
      'editorIndentGuide.activeBackground': pick({
        light: '#d7dbe080',
        dark: '#4d545960',
      }),
      'editorWhitespace.foreground': pick({
        light: '#d1d5da60',
        dark: '#3a424a40',
      }),
      'editorCursor.foreground': pick({
        light: '#000000cc',
        dark: activeForeground,
      }),

      'editor.findMatchBackground': pick({
        light: `${primary}40`,
        dark: `${primary}40`,
      }),
      'editor.findMatchHighlightBackground': pick({
        light: '#31284235',
        dark: '#312842',
      }),
      'editor.inactiveSelectionBackground': pick({
        light: `${secondary}20`,
        dark: `${secondary}20`,
      }),
      'editor.selectionBackground': pick({
        light: `${secondary}40`,
        dark: `${secondary}40`,
      }),
      'editor.selectionHighlightBackground': pick({
        light: `${secondary}20`,
        dark: `${secondary}20`,
      }),
      'editor.wordHighlightBackground': pick({
        light: `${secondary}40`,
        dark: `${secondary}40`,
      }),
      'editor.wordHighlightStrongBackground': pick({
        light: `${primary}35`,
        dark: `${primary}35`,
      }),
      'editorBracketMatch.background': pick({
        light: `${secondary}20`,
        dark: `${secondary}20`,
      }),

      'diffEditor.insertedTextBackground': pick({
        light: '#1c6b4830',
        dark: '#3d833530',
      }),
      'diffEditor.removedTextBackground': pick({
        light: '#ab595930',
        dark: '#cb595930',
      }),

      'scrollbar.shadow': pick({ light: '#6a737d33', dark: '#0003' }),
      'scrollbarSlider.background': pick({
        light: `${secondary}18`,
        dark: `${secondary}18`,
      }),
      'scrollbarSlider.hoverBackground': pick({
        light: `${secondary}25`,
        dark: `${secondary}25`,
      }),
      'scrollbarSlider.activeBackground': pick({
        light: `${secondary}35`,
        dark: `${secondary}35`,
      }),
      'editorOverviewRuler.border': `${secondary}00`,

      'panel.background': background,
      'panel.border': border,
      'panelTitle.activeBorder': primary,
      'panelTitle.activeForeground': activeForeground,
      'panelTitle.inactiveForeground': angrboda('ignored'),
      'panelInput.border': pick({ light: '#e1e4e880', dark: '#3a424a80' }),

      'terminal.foreground': foreground,
      'terminal.ansiBrightBlack': pick({
        light: pick({ light: '#484942', dark: AngrbodaThemes.foreground[1] }),
        dark: pick({ light: AngrbodaThemes.background[0], dark: '#484942' }),
      }),
      'terminal.ansiBrightBlue': angrboda('blue'),
      'terminal.ansiBrightCyan': angrboda('cyan'),
      'terminal.ansiBrightGreen': angrboda('green'),
      'terminal.ansiBrightMagenta': angrboda('magenta'),
      'terminal.ansiBrightRed': angrboda('red'),
      'terminal.ansiBrightWhite': pick({
        light: pick({ light: AngrbodaThemes.foreground[0], dark: '#f6f6f6' }),
        dark: pick({ light: AngrbodaThemes.background[1], dark: '#f6f6f6' }),
      }),
      'terminal.ansiBrightYellow': angrboda('yellow'),
      'terminal.ansiBlack': pick({
        light: pick({ light: '#2e2e2a', dark: AngrbodaThemes.foreground[1] }),
        dark: pick({ light: AngrbodaThemes.background[0], dark: '#2e2e2a' }),
      }),
      'terminal.ansiBlue': angrboda('blue'),
      'terminal.ansiCyan': angrboda('cyan'),
      'terminal.ansiGreen': angrboda('green'),
      'terminal.ansiMagenta': angrboda('magenta'),
      'terminal.ansiRed': angrboda('red'),
      'terminal.ansiWhite': pick({
        light: AngrbodaThemes.foreground[0],
        dark: AngrbodaThemes.background[1],
      }),
      'terminal.ansiYellow': angrboda('yellow'),

      'gitDecoration.addedResourceForeground': pick({
        light: angrboda('green'),
        dark: `${angrboda('green')}cc`,
      }),
      'gitDecoration.modifiedResourceForeground': pick({
        light: angrboda('blue'),
        dark: `${angrboda('blue')}cc`,
      }),
      'gitDecoration.deletedResourceForeground': pick({
        light: angrboda('red'),
        dark: `${angrboda('red')}cc`,
      }),
      'gitDecoration.untrackedResourceForeground': pick({
        light: angrboda('cyan'),
        dark: `${angrboda('cyan')}cc`,
      }),
      'gitDecoration.ignoredResourceForeground': pick({
        light: angrboda('ignored'),
        dark: angrboda('ignored').replace('60', '40'),
      }),
      'gitDecoration.conflictingResourceForeground': pick({
        light: angrboda('orange'),
        dark: `${angrboda('orange')}cc`,
      }),
      'gitDecoration.submoduleResourceForeground': pick({
        light: angrboda('secondaryForeground'),
        dark: angrboda('secondaryForeground').replace('90', '80'),
      }),

      'editorGutter.modifiedBackground': pick({
        light: angrboda('blue'),
        dark: `${angrboda('blue')}cc`,
      }),
      'editorGutter.addedBackground': pick({
        light: angrboda('green'),
        dark: `${angrboda('green')}cc`,
      }),
      'editorGutter.deletedBackground': pick({
        light: angrboda('red'),
        dark: `${angrboda('red')}cc`,
      }),

      'debugToolBar.background': background,
      'editor.stackFrameHighlightBackground': pick({
        light: primer.yellow[1],
        dark: '#a7076a',
      }),
      'editor.focusedStackFrameHighlightBackground': pick({
        light: primer.yellow[2],
        dark: '#b8087d',
      }),

      'peekViewEditor.matchHighlightBackground': pick({ dark: '#ffd33d33' }),
      'peekViewResult.matchHighlightBackground': pick({ dark: '#ffd33d33' }),
      'peekViewEditor.background': background,
      'peekViewResult.background': background,

      'settings.headerForeground': activeForeground,
      'settings.modifiedItemIndicator': primary,
      'welcomePage.buttonBackground': pick({
        light: '#f6f8fa',
        dark: '#3a424a',
      }),
      'welcomePage.buttonHoverBackground': pick({
        light: '#e1e4e8',
        dark: '#4d5459',
      }),

      'problemsErrorIcon.foreground': angrboda('red'),
      'problemsWarningIcon.foreground': angrboda('orange'),
      'problemsInfoIcon.foreground': angrboda('blue'),

      'editorError.foreground': angrboda('red'),
      'editorWarning.foreground': pick({
        light: angrboda('orange'),
        dark: angrboda('orange'),
      }),
      'editorInfo.foreground': angrboda('blue'),
      'editorHint.foreground': angrboda('green'),

      'editorGutter.commentRangeForeground': pick({
        light: angrboda('ignored'),
        dark: angrboda('ignored').replace('60', '40'),
      }),
      'editorGutter.foldingControlForeground': pick({
        light: angrboda('secondaryForeground'),
        dark: angrboda('secondaryForeground').replace('90', '80'),
      }),
    },
    semanticHighlighting: true,
    semanticTokenColors: {
      namespace: angrboda('namespace'),
      interface: angrboda('interface'),
      class: angrboda('class'),
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: {
          foreground: angrboda('comment'),
        },
      },
      {
        scope: ['punctuation', 'meta.tag.inline.any.html', 'meta.tag.block.any.html', 'meta.brace'],
        settings: {
          foreground: angrboda('punctuation'),
        },
      },
      {
        scope: [
          'constant',
          'entity.name.constant',
          'variable.other.constant',
          'variable.language',
          'meta.definition.variable',
        ],
        settings: {
          foreground: angrboda('constant'),
        },
      },
      {
        scope: ['entity', 'entity.name'],
        settings: {
          foreground: angrboda('function'),
        },
      },
      {
        scope: 'variable.parameter.function',
        settings: {
          foreground,
        },
      },
      {
        scope: 'entity.name.tag',
        settings: {
          foreground: angrboda('literal'),
        },
      },
      {
        scope: 'entity.name.function',
        settings: {
          foreground: angrboda('function'),
        },
      },
      {
        scope: 'keyword',
        settings: {
          foreground: angrboda('keyword'),
        },
      },
      {
        scope: ['storage', 'storage.type'],
        settings: {
          foreground: angrboda('builtin'),
        },
      },
      {
        scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'],
        settings: {
          foreground,
        },
      },
      {
        scope: ['string', 'punctuation.definition.string', 'string punctuation.section.embedded source'],
        settings: {
          foreground: angrboda('string'),
        },
      },
      {
        scope: 'support',
        settings: {
          foreground: angrboda('property'),
        },
      },
      {
        scope: ['meta.property-name', 'entity.other.attribute-name', 'meta.object-literal.key'],
        settings: {
          foreground: angrboda('property'),
        },
      },
      {
        scope: 'variable',
        settings: {
          foreground: angrboda('variable'),
        },
      },
      {
        scope: 'namespace',
        settings: {
          foreground: angrboda('namespace'),
        },
      },
      {
        scope: 'keyword.operator',
        settings: {
          foreground: angrboda('builtin'),
        },
      },
      {
        scope: 'invalid.broken',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'invalid.deprecated',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'invalid.illegal',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'invalid.unimplemented',
        settings: {
          fontStyle: 'italic',
          foreground: primer.red[7],
        },
      },
      {
        scope: 'carriage-return',
        settings: {
          fontStyle: 'italic underline',
          background: pick({ light: primer.red[5], dark: primer.red[6] }),
          foreground: primer.gray[0],
          content: '^M',
        },
      },
      {
        scope: 'message.error',
        settings: {
          foreground: primer.red[7],
        },
      },
      {
        scope: 'string source',
        settings: {
          foreground,
        },
      },
      {
        scope: 'string variable',
        settings: {
          foreground: angrboda('string'),
        },
      },
      {
        scope: ['source.regexp', 'string.regexp'],
        settings: {
          foreground: angrboda('regex'),
        },
      },
      {
        scope: [
          'string.regexp.character-class',
          'string.regexp constant.character.escape',
          'string.regexp source.ruby.embedded',
          'string.regexp string.regexp.arbitrary-repitition',
        ],
        settings: {
          foreground: angrboda('string'),
        },
      },
      {
        scope: 'string.regexp constant.character.escape',
        settings: {
          fontStyle: 'bold',
          foreground: primer.green[6],
        },
      },
      {
        scope: 'support.constant',
        settings: {
          foreground: angrboda('constant'),
        },
      },
      {
        scope: 'support.variable',
        settings: {
          foreground: angrboda('literal'),
        },
      },
      {
        scope: 'constant.numeric',
        settings: {
          foreground: angrboda('number'),
        },
      },
      {
        scope: 'keyword.other.unit',
        settings: {
          foreground: angrboda('builtin'),
        },
      },
      {
        scope: 'constant.language.boolean',
        settings: {
          foreground: angrboda('boolean'),
        },
      },
      {
        scope: 'meta.module-reference',
        settings: {
          foreground: primary,
        },
      },
      {
        scope: 'punctuation.definition.list.begin.markdown',
        settings: {
          foreground: angrboda('orange'),
        },
      },
      {
        scope: ['markup.heading', 'markup.heading entity.name'],
        settings: {
          fontStyle: 'bold',
          foreground: primary,
        },
      },
      {
        scope: 'markup.quote',
        settings: {
          foreground: primary,
        },
      },
      {
        scope: 'markup.italic',
        settings: {
          fontStyle: 'italic',
          foreground,
        },
      },
      {
        scope: 'markup.bold',
        settings: {
          fontStyle: 'bold',
          foreground,
        },
      },
      {
        scope: 'markup.raw',
        settings: {
          foreground: primary,
        },
      },
      {
        scope: ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted'],
        settings: {
          background: primer.red[0],
          foreground: primer.red[7],
        },
      },
      {
        scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
        settings: {
          background: primer.green[0],
          foreground: primer.green[6],
        },
      },
      {
        scope: ['markup.changed', 'punctuation.definition.changed'],
        settings: {
          background: primer.orange[1],
          foreground: primer.orange[6],
        },
      },
      {
        scope: ['markup.ignored', 'markup.untracked'],
        settings: {
          foreground: primer.gray[1],
          background: primer.blue[6],
        },
      },
      {
        scope: 'meta.diff.range',
        settings: {
          foreground: pick({ light: primer.purple[5], dark: primer.purple[6] }),
          fontStyle: 'bold',
        },
      },
      {
        scope: 'meta.diff.header',
        settings: {
          foreground: primer.blue[6],
        },
      },
      {
        scope: 'meta.separator',
        settings: {
          fontStyle: 'bold',
          foreground: primer.blue[6],
        },
      },
      {
        scope: 'meta.output',
        settings: {
          foreground: primer.blue[6],
        },
      },
      {
        scope: [
          'brackethighlighter.tag',
          'brackethighlighter.curly',
          'brackethighlighter.round',
          'brackethighlighter.square',
          'brackethighlighter.angle',
          'brackethighlighter.quote',
        ],
        settings: {
          foreground: angrboda('tertiary'),
        },
      },
      {
        scope: 'brackethighlighter.unmatched',
        settings: {
          foreground: primer.red[7],
        },
      },
      {
        scope: [
          'constant.other.reference.link',
          'string.other.link',
          'punctuation.definition.string.begin.markdown',
          'punctuation.definition.string.end.markdown',
        ],
        settings: {
          foreground: angrboda('string'),
        },
      },
      {
        scope: ['markup.underline.link.markdown'],
        settings: {
          foreground: secondaryForeground,
          fontStyle: 'underline',
        },
      },
    ],
  }
}
