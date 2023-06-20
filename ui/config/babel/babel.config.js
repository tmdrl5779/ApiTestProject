const presets = [
  [
    '@babel/preset-env',
    {
      targets: '> 0.25%, not dead',
      useBuiltIns: 'entry',
      corejs: 3,
    },
  ],
  [
    '@babel/preset-react',
    {
      runtime: 'automatic',
      importSource: '@emotion/react',
    },
  ],
  '@babel/preset-typescript',
]

const plugins = ['@emotion/babel-plugin']
if (process.env['NODE_ENV'] === 'development') {
  plugins.push(require.resolve('react-refresh/babel'))
}

module.exports = { presets, plugins }
