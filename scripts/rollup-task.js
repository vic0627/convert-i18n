import typescript from "@rollup/plugin-typescript"
import nodeResolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"

const plugins = {
  ts: typescript(),
  nr: nodeResolve(),
  tsr: terser(),
}

// bundle tasks
export default [
  // cli
  {},
  // lib
  {},
]
