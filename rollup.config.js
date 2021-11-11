import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss-modules'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/m3o-next.js',
    format: 'cjs'
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      extract: true,
      plugins: [],
      modules: true,
      autoModules: true,
      writeDefinitions: true
    })
  ]
}
