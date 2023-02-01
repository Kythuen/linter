import execa from 'execa'
import { readJSONSync, writeJSONSync, writeFileSync } from 'fs-extra'
import { SETTING_FILE, PROJECT_FILE } from '../config/path'

export interface PresetItemDataType {
  name: string
  description: string
  configuration: {
    environment: 'web'
    typescript: true
    framework: 'vue'
    extension: 'js'
  }
}

export function getUserSetting(propName?: string) {
  const data = readJSONSync(SETTING_FILE)
  return propName ? data[propName] : data
}
export async function editUserSetting(propName: string, value: any) {
  const data = readJSONSync(SETTING_FILE)
  data[propName] = value
  writeJSONSync(SETTING_FILE, data)
  await execa('prettier', ['--write', SETTING_FILE])
}

export function getProjectSetting(propName?: string) {
  const data = readJSONSync(PROJECT_FILE)
  return propName ? data[propName] : data
}
export async function editProjectSetting(propName: string, value: any) {
  const data = readJSONSync(PROJECT_FILE)
  data[propName] = value
  writeJSONSync(PROJECT_FILE, data)
  await execa('prettier', ['--write', PROJECT_FILE])
}
