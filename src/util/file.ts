import path from 'node:path'
import execa from 'execa'
import { red } from 'kolorist'
import { format } from 'prettier'
import {
  existsSync,
  ensureFileSync,
  ensureDirSync,
  writeFileSync,
  copySync,
  removeSync
} from 'fs-extra'

export function rootExists(filePath: string) {
  return existsSync(path.resolve(process.cwd(), filePath))
}

export function pathExists(filePath: string) {
  return existsSync(filePath)
}

const PRETTIER_PARSER_MAP = {
  json: 'json',
  js: 'babel',
  ts: 'typescript',
  css: 'css',
  html: 'html',
  less: 'less',
  md: 'markdown',
  scss: 'scss',
  vue: 'vue',
  yaml: 'yaml'
}
export function formatCode(code: string, codeType = 'json') {
  return format(code, { semi: false, parser: PRETTIER_PARSER_MAP[codeType] })
}

export async function createFile(
  filePath: string,
  fileContent: any,
  silence = false
) {
  ensureFileSync(filePath)
  writeFileSync(filePath, formatCode(JSON.stringify(fileContent)))
  await execa('prettier', ['--write', filePath])
  if (!silence) {
    console.log(
      `📜 Create ${path.basename(filePath)} file at ${path.dirname(filePath)}`
    )
  }
}
export async function copyFile(sourcePath: string, targetPath: any) {
  await copySync(sourcePath, targetPath)
  console.log(
    `📜 Create ${path.basename(targetPath)} file at ${path.dirname(targetPath)}`
  )
}
export async function removeFile(filePath: string) {
  await removeSync(filePath)
  console.log(
    `${red('✖')} Remove ${path.basename(filePath)} file at ${path.dirname(
      filePath
    )}`
  )
}
export async function copyDirectory(sourcePath: string, targetPath: any) {
  ensureDirSync(targetPath)
  await copySync(sourcePath, targetPath)
  console.log(
    `📜 Create ${path.basename(targetPath)} directory at ${path.dirname(
      targetPath
    )}`
  )
}
export async function removeDirectory(filePath: string) {
  await removeSync(filePath)
  console.log(
    `${red('✖')} Remove ${path.basename(filePath)} directory at ${path.dirname(
      filePath
    )}`
  )
}

export { ensureDirSync } from 'fs-extra'
