import resolve from '@rollup/plugin-node-resolve'
import ts from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json' assert { type: 'json' }

const minifiedOutputs = [
  {
    file: pkg.exports['.'].import,
    format: 'esm',
  },
  {
    file: pkg.exports['.'].require,
    format: 'cjs',
  },
]

const unminifiedOutputs = minifiedOutputs.map(({ file, ...rest }) => ({
  ...rest,
  file: file.replace('.min.', '.'),
}))

const commonPlugins = [
  ts({
    tsconfig: 'tsconfig.build.json',
  }),
  commonjs({ extensions: ['.js', '.ts'] }),
]

export default [
  {
    input: './src/index.ts',
    output: [...unminifiedOutputs, ...minifiedOutputs],
    plugins: [...commonPlugins, resolve(), terser()],
  },
]
