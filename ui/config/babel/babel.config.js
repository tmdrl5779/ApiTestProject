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
    },
  ],
  '@babel/preset-typescript',
]

const plugins = []
if (process.env['NODE_ENV'] === 'development') {
  plugins.push(require.resolve('react-refresh/babel'))
}

module.exports = { presets, plugins }
