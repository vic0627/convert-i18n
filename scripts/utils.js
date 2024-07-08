import { resolve } from "fs"

export const root = process.cwd()

export const getPath = (...paths) => resolve(root, ...paths)
