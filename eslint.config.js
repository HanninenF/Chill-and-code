const expoConfig = require('eslint-config-expo/flat');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  expoConfig,

  {
    ignores: ['dist/**', 'web-build/**', 'node_modules/**'],
  },

  {
    files: ['src/**/*.{ts,tsx}'],

    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'max-lines-per-function': [
        'warn',
        {
          max: 100,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      complexity: ['warn', 15],

      'max-params': ['warn', 4],

      'no-restricted-syntax': [
        'error',

        // Colors
        {
          selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
          message: 'Use theme color tokens instead of hardcoded hex colors.',
        },
        {
          selector: String.raw`Literal[value=/^rgba?\(/]`,
          message:
            'Use theme color tokens instead of hardcoded rgb/rgba colors.',
        },

        // Spacing
        {
          selector:
            'Property[key.name=/^(margin|marginTop|marginRight|marginBottom|marginLeft|padding|paddingTop|paddingRight|paddingBottom|paddingLeft|gap|rowGap|columnGap)$/] Literal[value]:not([value=0])',
          message: 'Use spacing tokens instead of hardcoded spacing values.',
        },
        // Radius
        {
          selector:
            'Property[key.name=/^(borderRadius|borderTopLeftRadius|borderTopRightRadius|borderBottomLeftRadius|borderBottomRightRadius)$/] Literal[value]:not([value=0])',
          message: 'Use radius tokens instead of hardcoded radius values.',
        },

        // Border width
        {
          selector:
            'Property[key.name=/^(borderWidth|borderTopWidth|borderRightWidth|borderBottomWidth|borderLeftWidth)$/] Literal[value]:not([value=0])',
          message:
            'Use borderWidth tokens instead of hardcoded border width values.',
        },

        // Typography
        {
          selector:
            'Property[key.name=/^(fontSize|lineHeight)$/] Literal[value]',
          message:
            'Use typography tokens instead of hardcoded font size or line height values.',
        },
        {
          selector: "Property[key.name='fontWeight'] Literal[value]",
          message:
            'Use typography.fontWeight tokens instead of hardcoded font weight values.',
        },

        // Opacity
        {
          selector: "Property[key.name='opacity'] Literal[value]",
          message: 'Use opacity tokens instead of hardcoded opacity values.',
        },

        // Elevation / shadow
        {
          selector:
            'Property[key.name=/^(elevation|shadowOpacity|shadowRadius)$/] Literal[value]:not([value=0])',
          message:
            'Use elevation or shadow tokens instead of hardcoded shadow values.',
        },

        // zIndex
        {
          selector: "Property[key.name='zIndex'] Literal[value]",
          message: 'Use zIndex tokens instead of hardcoded zIndex values.',
        },

        // Rotation / degrees
        {
          selector: "Property[key.name='transform'] Literal[value=/deg/]",
          message: 'Use degree tokens instead of hardcoded rotation values.',
        },
      ],
    },
  },

  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'max-lines': [
        'warn',
        { max: 200, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    files: ['src/screens/**/*.{ts,tsx}'],
    rules: {
      'max-lines': [
        'warn',
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    files: ['src/hooks/**/*.{ts,tsx}'],
    rules: {
      'max-lines': [
        'warn',
        { max: 200, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    files: ['src/utils/**/*.{ts,tsx}'],
    rules: {
      'max-lines': [
        'warn',
        { max: 250, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    files: ['src/types/**/*.{ts,tsx}'],
    rules: {
      'max-lines': 'off',
    },
  },
  {
    files: ['src/theme/**/*.{ts,tsx}'],
    rules: {
      'max-lines': 'off',
      'no-restricted-syntax': 'off',
    },
  },
]);
