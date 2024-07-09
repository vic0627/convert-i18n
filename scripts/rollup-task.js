import typescript from "@rollup/plugin-typescript"
import nodeResolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import alias from "@rollup/plugin-alias"
import nodePolyfills from "rollup-plugin-polyfill-node"
import { getPath } from "./utils"

const plugins = {
  pf: nodePolyfills(),
  als: alias({
    entries: [
      {
        find: "@/",
        replacement: getPath("lib"),
      },
    ],
  }),
  cjs: commonjs(),
  ts: typescript(),
  bl: babel({ babelHelpers: "bundled" }),
  nr: nodeResolve(),
  tsr: terser(),
}

// bundle tasks
export default [
  // cli
  {
    taskName: "cli",
    input: {
      input: getPath("./lib/index-cli.ts"),
      plugins: Object.values({ ...plugins, pf: null }).filter((x) => x),
      treeshake: true,
    },
    output: [
      {
        file: getPath("dist/bin/convert-i18n.cjs"),
        format: "cjs",
        intro: "#!/usr/bin/env node\n'use strict';",
        strict: false,
      },
    ],
  },
  // lib
  {
    taskName: "lib",
    input: {
      input: getPath("./lib/index.ts"),
      plugins: [plugins.pf, plugins.cjs, plugins.ts, plugins.bl, plugins.nr],
      treeshake: true,
    },
    output: [
      {
        file: getPath("./dist/convert-i18n.js"),
        format: "iife",
        name: "convertI18n",
      },
      {
        file: getPath("./dist/convert-i18n.mjs"),
        format: "es",
        name: "convertI18n",
      },
      {
        file: getPath("./dist/convert-i18n.js"),
        format: "iife",
        name: "convertI18n",
      },
      {
        file: getPath("./dist/convert-i18n.js"),
        format: "iife",
        name: "convertI18n",
      },
    ],
  },
]
