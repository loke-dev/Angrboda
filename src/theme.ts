import { themeColors } from './colors'

export default function getTheme({ style, name }: { style: 'light' | 'dark'; name: string }) {
  const pick = (options: { light?: string; dark?: string }) => {
    if (!options[style]) return style === 'light' ? options.dark : options.light
    return options[style]
  }

  const theme = (key: keyof typeof themeColors) => pick({ light: themeColors[key][1], dark: themeColors[key][0] })

  const foreground = theme('foreground')
  const background = theme('background')
  const secondaryForeground = theme('secondaryForeground')
  const border = theme('border')
  const activeForeground = theme('activeForeground')
  const activeBackground = theme('activeBackground')
  const strongBackground = theme('strongBackground')
  const tabBackground = theme('tabBackground')
  const primary = theme('primary')
  const secondary = theme('secondary')
  const tertiary = theme('tertiary')

  return {
    name,
    colors: {
      focusBorder: '#00000000',
      foreground,
      descriptionForeground: secondaryForeground,
      errorForeground: theme('red'),

      'textLink.foreground': primary,
      'textLink.activeForeground': primary,
      'textBlockQuote.background': background,
      'textBlockQuote.border': border,
      'textCodeBlock.background': background,
      'textPreformat.foreground': theme('secondaryForeground'),
      'textSeparator.foreground': theme('secondaryForeground'),

      'editorBracketHighlight.foreground1': theme('bracket'),
      'editorBracketHighlight.foreground2': theme('bracket'),
      'editorBracketHighlight.foreground3': theme('bracket'),
      'editorBracketHighlight.foreground4': theme('bracket'),
      'editorBracketHighlight.foreground5': theme('bracket'),
      'editorBracketHighlight.foreground6': theme('bracket'),
      'editorBracketHighlight.unexpectedBracket.foreground': tertiary,

      'button.background': primary,
      'button.foreground': background,
      'button.hoverBackground': pick({ light: theme('primary'), dark: theme('primary') }),

      'checkbox.background': activeBackground,
      'checkbox.border': pick({ light: theme('border'), dark: theme('activeForeground') }),

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
      'titleBar.inactiveForeground': theme('ignored'),
      'titleBar.inactiveBackground': background,
      'titleBar.border': activeBackground,

      'activityBar.foreground': foreground,
      'activityBar.inactiveForeground': theme('ignored'),
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

      'tree.indentGuidesStroke': pick({
        light: theme('indentGuide'),
        dark: theme('indentGuide'),
      }),

      'notificationCenterHeader.foreground': foreground,
      'notificationCenterHeader.background': background,
      'notifications.foreground': foreground,
      'notifications.background': background,
      'notifications.border': border,
      'notificationsErrorIcon.foreground': theme('red'),
      'notificationsWarningIcon.foreground': theme('orange'),
      'notificationsInfoIcon.foreground': theme('blue'),

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
      'editorLineNumber.foreground': pick({
        light: `${secondary}50`,
        dark: `${secondary}40`,
      }),
      'editorLineNumber.activeForeground': pick({
        light: secondary,
        dark: `${secondary}cc`,
      }),
      'editorIndentGuide.background': pick({
        light: theme('indentGuide'),
        dark: theme('indentGuide'),
      }),
      'editorIndentGuide.activeBackground': pick({
        light: theme('activeIndentGuide'),
        dark: theme('activeIndentGuide'),
      }),
      'editorWhitespace.foreground': pick({
        light: theme('indentGuide'),
        dark: theme('indentGuide'),
      }),
      'editorCursor.foreground': pick({
        light: theme('foreground'),
        dark: activeForeground,
      }),

      'editor.findMatchBackground': pick({
        light: `${primary}40`,
        dark: `${primary}40`,
      }),
      'editor.findMatchHighlightBackground': pick({
        light: theme('tabBackground'),
        dark: theme('tabBackground'),
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
        light: `${theme('gitAdded')}30`,
        dark: `${theme('gitAdded')}30`,
      }),
      'diffEditor.removedTextBackground': pick({
        light: `${theme('gitDeleted')}30`,
        dark: `${theme('gitDeleted')}30`,
      }),

      'scrollbar.shadow': pick({ light: theme('secondaryForeground'), dark: theme('secondaryForeground') }),
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
      'panelTitle.inactiveForeground': theme('ignored'),
      'panelInput.border': pick({ light: theme('secondaryForeground'), dark: theme('secondaryForeground') }),

      'terminal.foreground': foreground,
      'terminal.ansiBrightBlack': pick({
        light: pick({ light: theme('foreground'), dark: theme('foreground') }),
        dark: pick({ light: theme('background'), dark: theme('foreground') }),
      }),
      'terminal.ansiBrightBlue': theme('blue'),
      'terminal.ansiBrightCyan': theme('cyan'),
      'terminal.ansiBrightGreen': theme('green'),
      'terminal.ansiBrightMagenta': theme('magenta'),
      'terminal.ansiBrightRed': theme('red'),
      'terminal.ansiBrightWhite': pick({
        light: pick({ light: theme('foreground'), dark: theme('activeForeground') }),
        dark: pick({ light: theme('background'), dark: theme('activeForeground') }),
      }),
      'terminal.ansiBrightYellow': theme('yellow'),
      'terminal.ansiBlack': pick({
        light: pick({ light: theme('foreground'), dark: theme('foreground') }),
        dark: pick({ light: theme('background'), dark: theme('foreground') }),
      }),
      'terminal.ansiBlue': theme('blue'),
      'terminal.ansiCyan': theme('cyan'),
      'terminal.ansiGreen': theme('green'),
      'terminal.ansiMagenta': theme('magenta'),
      'terminal.ansiRed': theme('red'),
      'terminal.ansiWhite': pick({
        light: theme('foreground'),
        dark: theme('background'),
      }),
      'terminal.ansiYellow': theme('yellow'),

      'gitDecoration.addedResourceForeground': pick({
        light: theme('gitAdded'),
        dark: `${theme('gitAdded')}cc`,
      }),
      'gitDecoration.modifiedResourceForeground': pick({
        light: theme('gitModified'),
        dark: `${theme('gitModified')}cc`,
      }),
      'gitDecoration.deletedResourceForeground': pick({
        light: theme('gitDeleted'),
        dark: `${theme('gitDeleted')}cc`,
      }),
      'gitDecoration.untrackedResourceForeground': pick({
        light: theme('gitUntracked'),
        dark: `${theme('gitUntracked')}cc`,
      }),
      'gitDecoration.ignoredResourceForeground': pick({
        light: theme('gitIgnored'),
        dark: theme('gitIgnored').replace('60', '40'),
      }),
      'gitDecoration.conflictingResourceForeground': pick({
        light: theme('gitConflicting'),
        dark: `${theme('gitConflicting')}cc`,
      }),
      'gitDecoration.submoduleResourceForeground': pick({
        light: theme('secondaryForeground'),
        dark: theme('secondaryForeground').replace('90', '80'),
      }),

      'editorGutter.modifiedBackground': pick({
        light: theme('gitModified'),
        dark: `${theme('gitModified')}cc`,
      }),
      'editorGutter.addedBackground': pick({
        light: theme('gitAdded'),
        dark: `${theme('gitAdded')}cc`,
      }),
      'editorGutter.deletedBackground': pick({
        light: theme('gitDeleted'),
        dark: `${theme('gitDeleted')}cc`,
      }),

      'debugToolBar.background': background,
      'editor.stackFrameHighlightBackground': pick({
        light: theme('yellow'),
        dark: theme('purple'),
      }),
      'editor.focusedStackFrameHighlightBackground': pick({
        light: theme('yellow'),
        dark: theme('purple'),
      }),

      'peekViewEditor.matchHighlightBackground': pick({ dark: theme('yellow') }),
      'peekViewResult.matchHighlightBackground': pick({ dark: theme('yellow') }),
      'peekViewEditor.background': background,
      'peekViewResult.background': background,

      'settings.headerForeground': activeForeground,
      'settings.modifiedItemIndicator': primary,
      'welcomePage.buttonBackground': pick({
        light: theme('tabBackground'),
        dark: theme('tabBackground'),
      }),
      'welcomePage.buttonHoverBackground': pick({
        light: theme('activeBackground'),
        dark: theme('activeBackground'),
      }),

      'problemsErrorIcon.foreground': theme('red'),
      'problemsWarningIcon.foreground': theme('orange'),
      'problemsInfoIcon.foreground': theme('blue'),

      'editorError.foreground': theme('red'),
      'editorWarning.foreground': pick({
        light: theme('orange'),
        dark: theme('orange'),
      }),
      'editorInfo.foreground': theme('blue'),
      'editorHint.foreground': theme('green'),

      'editorGutter.commentRangeForeground': pick({
        light: theme('ignored'),
        dark: theme('ignored').replace('60', '40'),
      }),
      'editorGutter.foldingControlForeground': pick({
        light: theme('secondaryForeground'),
        dark: theme('secondaryForeground').replace('90', '80'),
      }),
    },
    semanticHighlighting: true,
    semanticTokenColors: {
      namespace: theme('namespace'),
      interface: theme('interface'),
      class: theme('class'),
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: {
          foreground: theme('comment'),
        },
      },
      {
        scope: ['punctuation', 'meta.tag.inline.any.html', 'meta.tag.block.any.html', 'meta.brace'],
        settings: {
          foreground: theme('punctuation'),
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
          foreground: theme('constant'),
        },
      },
      {
        scope: ['entity', 'entity.name'],
        settings: {
          foreground: theme('function'),
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
          foreground: theme('literal'),
        },
      },
      {
        scope: 'entity.name.function',
        settings: {
          foreground: theme('function'),
        },
      },
      {
        scope: 'keyword',
        settings: {
          foreground: theme('keyword'),
        },
      },
      {
        scope: ['storage', 'storage.type'],
        settings: {
          foreground: theme('builtin'),
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
          foreground: theme('string'),
        },
      },
      {
        scope: 'support',
        settings: {
          foreground: theme('property'),
        },
      },
      {
        scope: ['meta.property-name', 'entity.other.attribute-name', 'meta.object-literal.key'],
        settings: {
          foreground: theme('property'),
        },
      },
      {
        scope: 'variable',
        settings: {
          foreground: theme('variable'),
        },
      },
      {
        scope: 'namespace',
        settings: {
          foreground: theme('namespace'),
        },
      },
      {
        scope: 'keyword.operator',
        settings: {
          foreground: theme('builtin'),
        },
      },
      {
        scope: 'invalid.broken',
        settings: {
          fontStyle: 'italic',
          foreground: theme('red'),
        },
      },
      {
        scope: 'invalid.deprecated',
        settings: {
          fontStyle: 'italic',
          foreground: theme('red'),
        },
      },
      {
        scope: 'invalid.illegal',
        settings: {
          fontStyle: 'italic',
          foreground: theme('red'),
        },
      },
      {
        scope: 'invalid.unimplemented',
        settings: {
          fontStyle: 'italic',
          foreground: theme('red'),
        },
      },
      {
        scope: 'carriage-return',
        settings: {
          fontStyle: 'italic underline',
          background: pick({ light: theme('red'), dark: theme('red') }),
          foreground: theme('background'),
          content: '^M',
        },
      },
      {
        scope: 'message.error',
        settings: {
          foreground: theme('red'),
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
          foreground: theme('string'),
        },
      },
      {
        scope: ['source.regexp', 'string.regexp'],
        settings: {
          foreground: theme('regex'),
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
          foreground: theme('string'),
        },
      },
      {
        scope: 'string.regexp constant.character.escape',
        settings: {
          fontStyle: 'bold',
          foreground: theme('green'),
        },
      },
      {
        scope: 'support.constant',
        settings: {
          foreground: theme('constant'),
        },
      },
      {
        scope: 'support.variable',
        settings: {
          foreground: theme('literal'),
        },
      },
      {
        scope: 'constant.numeric',
        settings: {
          foreground: theme('number'),
        },
      },
      {
        scope: 'keyword.other.unit',
        settings: {
          foreground: theme('builtin'),
        },
      },
      {
        scope: 'constant.language.boolean',
        settings: {
          foreground: theme('boolean'),
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
          foreground: theme('orange'),
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
          background: theme('red'),
          foreground: theme('background'),
        },
      },
      {
        scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
        settings: {
          background: theme('green'),
          foreground: theme('background'),
        },
      },
      {
        scope: ['markup.changed', 'punctuation.definition.changed'],
        settings: {
          background: theme('orange'),
          foreground: theme('background'),
        },
      },
      {
        scope: ['markup.ignored', 'markup.untracked'],
        settings: {
          foreground: theme('secondaryForeground'),
          background: theme('blue'),
        },
      },
      {
        scope: 'meta.diff.range',
        settings: {
          foreground: pick({ light: theme('purple'), dark: theme('purple') }),
          fontStyle: 'bold',
        },
      },
      {
        scope: 'meta.diff.header',
        settings: {
          foreground: theme('blue'),
        },
      },
      {
        scope: 'meta.separator',
        settings: {
          fontStyle: 'bold',
          foreground: theme('blue'),
        },
      },
      {
        scope: 'meta.output',
        settings: {
          foreground: theme('blue'),
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
          foreground: tertiary,
        },
      },
      {
        scope: 'brackethighlighter.unmatched',
        settings: {
          foreground: theme('red'),
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
          foreground: theme('string'),
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
