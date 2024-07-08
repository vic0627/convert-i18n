import xlsx from "xlsx"
import fs from "fs"

const buffer = fs.readFileSync("./inputs/zh.json", "utf8")
const json = JSON.parse(buffer)

const workbook = xlsx.readFile("./inputs/translate.xlsx")
const sheet = workbook.Sheets["sdk"]

const startRow = 2
const endRow = 362
const colA = "A"
const colF = "G"

const jsonFromSheet = {}

const sheetData = [{ A: "prop", B: "zh" }]

for (let row = startRow; row <= endRow; row++) {
  const prop = getSheetValue(colA, row)
  const value = getSheetValue(colF, row)

  if (!prop) continue

  const propChain = prop.split(".")
  insertJson(propChain, value)
}

checkJson()
// printJson();
// printXlsx();
printMissing()

function getSheetValue(col, row) {
  return sheet[`${col}${row}`]?.v ?? null
}

function insertJson(propChain, value) {
  let ptr = jsonFromSheet
  while (propChain.length) {
    const prop = propChain.shift()
    if (!propChain.length) {
      ptr[prop] = value
      break
    }
    if (!ptr[prop]) ptr[prop] = {}
    ptr = ptr[prop]
  }
}

function checkJson(template = json, target = jsonFromSheet, props = "") {
  const keys = Object.keys(template)
  for (const k of keys) {
    const value = template[k]
    const property = props ? `${props}.${k}` : k
    console.log(property)
    if (typeof value !== "string") {
      target[k] ??= {}
      checkJson(value, target[k], property)
    } else {
      target[k] ??= null
      if (!target[k] && value) sheetData.push({ A: property, B: value })
    }
  }
}

function printJson() {
  const data = JSON.stringify(jsonFromSheet)
  fs.writeFileSync("./output/fr.json", data, "utf8")
}

function printMissing() {
  let output = ""
  sheetData.forEach(({ A, B }, i) => {
    if (!i) return
    output += `1. \`${A}\`：${B}\n`
  })
  fs.writeFileSync("./output/missing-col.txt", output, "utf8")
}

function printXlsx() {
  const workbook = xlsx.utils.book_new()
  const worksheetData = [["Column A", "Column B"]] // 添加標題行
  sheetData.forEach((row) => {
    worksheetData.push([row.A, row.B])
  })
  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData)
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1")
  xlsx.writeFile(workbook, "./output/missing_prop.xlsx")
}
