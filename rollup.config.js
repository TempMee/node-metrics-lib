import resolve from '@rollup/plugin-node-resolve'
import ts from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

import pkg from './package.json' assert { type: 'json' }

const minifiedOutputs = [
  {
    file: pkg.exports['.'].import,
    format: 'esm',
    exports: 'named',
  },
  {
    file: pkg.exports['.'].require,
    format: 'cjs',
    exports: 'named',
  },
]

const unminifiedOutputs = minifiedOutputs.map(({ file, ...rest }) => ({
  ...rest,
  file: file.replace('.min.', '.'),
}))

const commonPlugins = [
  peerDepsExternal(),
  json(),
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
