import path from 'path'
import execa from 'execa'
import { PROMPTS_REMOVE_FORMAT, PROMPTS_REMOVE_COMMIT } from '../config/prompts'
import * as TEXT from '../config/text'
import {
  answerPrompts,
  getProjectSetting,
  rootExists,
  getPackageManager,
  removeFile,
  removeDirectory
} from '../util'

async function removeFormat() {
  const answer = await answerPrompts(PROMPTS_REMOVE_FORMAT)
  if (answer.remove) {
    console.log(TEXT.PROCESS_START_REMOVE)
    const projectSetting = getProjectSetting(process.cwd())

    removeFile(path.join(process.cwd(), '.eslintrc'))
    removeFile(path.join(process.cwd(), '.prettierrc'))
    removeFile(path.join(process.cwd(), '.editorconfig'))
    removeDirectory(path.join(process.cwd(), '.vscode'))
    console.log()

    if (rootExists('node_modules')) {
      const packageManager = getPackageManager()
      await execa(
        packageManager,
        packageManager === 'npm'
          ? ['uninstall', '--save-dev', ...projectSetting.formatPackages]
          : ['remove', '-D', ...projectSetting.formatPackages],
        {
          encoding: 'utf8',
          stdio: 'inherit'
        }
      )
    }
    console.log(TEXT.SUCCESS_REMOVEED)
  }
}
async function removeCommit() {
  console.log()
  const answer = await answerPrompts(PROMPTS_REMOVE_COMMIT)
  if (answer.remove) {
    console.log(TEXT.PROCESS_START_REMOVE)
    const projectSetting = getProjectSetting(process.cwd())

    removeFile(path.join(process.cwd(), '.commitlintrc'))
    removeFile(path.join(process.cwd(), '.lintstagedrc'))
    removeFile(path.join(process.cwd(), '.gitignore'))
    removeDirectory(path.join(process.cwd(), '.husky'))
    console.log()

    if (rootExists('node_modules')) {
      const packageManager = getPackageManager()
      await execa(
        packageManager,
        packageManager === 'npm'
          ? ['uninstall', '--save-dev', ...projectSetting.commitPackages]
          : ['remove', '-D', ...projectSetting.commitPackages],
        {
          encoding: 'utf8',
          stdio: 'inherit'
        }
      )
    }
    console.log(TEXT.SUCCESS_REMOVEED)
  }
}

export default async function remove(features: string[] | string) {
  console.log(TEXT.TIP_WELCOME)
  if (features.indexOf('format') > -1) {
    await removeFormat()
  }
  if (features.indexOf('commit') > -1) {
    await removeCommit()
  }
}
