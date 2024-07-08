import typescript from "@rollup/plugin-typescript"
import nodeResolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import { getPath } from "./utils"

const plugins = {
  ts: typescript(),
  nr: nodeResolve(),
  tsr: terser(),
}

// bundle tasks
export default [
  // cli
  {
    input: {
      input: getPath("./lib/index-cli.ts"),
      plugins: [plugins.ts, plugins.nr, plugins.tsr],
    },
    output: [{}],
  },
  // lib
  {},
]
