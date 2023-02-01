import path from 'node:path'
import prompts from 'prompts'
import execa from 'execa'
import * as TEXT from '../config/text'
import {
  answerPrompts,
  ConfigResolver,
  getUserSetting,
  editUserSetting,
  editProjectSetting,
  isCommandExist,
  rootExists,
  createFile,
  copyFile,
  copyDirectory
} from '../util'
import {
  getProjectInfoPrompts,
  getInstallInfoPrompts,
  PROMPTS_SAVE_PRESET,
  PROMPTS_ADD_COMMIT
} from '../config/prompts'
import { base, ts, vue } from '../resolver'

let formatSetting: any = {}
let commitSetting: any = {}
async function addFormat(resolver: ConfigResolver) {
  const PROMPTS_PROJECT_INFO = await getProjectInfoPrompts()
  formatSetting = await answerPrompts(PROMPTS_PROJECT_INFO)

  if (formatSetting.preset) {
    formatSetting = getUserSetting('preset').find(
      (item: any) => item.name === formatSetting.preset
    )
  }

  resolver.use(base, formatSetting)
  resolver.use(ts, formatSetting)
  resolver.use(vue, formatSetting)
  const resolverConfigData = resolver.data

  console.log()
  await createFile(
    path.join(process.cwd(), '.eslintrc'),
    resolverConfigData.eslintOverrides
  )
  await copyFile(
    path.resolve(__dirname, '../../.prettierrc'),
    path.join(process.cwd(), `.prettierrc`)
  )
  await copyFile(
    path.resolve(__dirname, '../../.editorconfig'),
    path.join(process.cwd(), `.editorconfig`)
  )
  await copyDirectory(
    path.resolve(__dirname, '../../.vscode'),
    path.join(process.cwd(), `.vscode`)
  )
  console.log(`${TEXT.SUCCESS_ADD_FORMAT}`)
}

async function addCommit(resolver: any) {
  if (formatSetting.name) {
    commitSetting = { commit: formatSetting.commit }
  } else {
    commitSetting = await prompts(PROMPTS_ADD_COMMIT)
  }
  if (!commitSetting.commit) {
    console.log(`${TEXT.CANCEL_ADD_COMMIT}`)
    process.exit(0)
  }
  if (!isCommandExist('git')) {
    console.log(TEXT.ERROR_NOT_GIT)
    process.exit(0)
  }
  if (!rootExists('.git')) {
    await execa('git', ['init'], {
      encoding: 'utf8',
      stdio: 'inherit'
    })
  }
  console.log()
  await copyFile(
    path.resolve(__dirname, '../../.commitlintrc'),
    path.join(process.cwd(), `.commitlintrc`)
  )
  await copyFile(
    path.resolve(__dirname, '../../.lintstagedrc'),
    path.join(process.cwd(), `.lintstagedrc`)
  )
  await copyFile(
    path.resolve(__dirname, '../../.gitignore'),
    path.join(process.cwd(), `.gitignore`)
  )
  await copyDirectory(
    path.resolve(__dirname, '../../.husky'),
    path.join(process.cwd(), `.husky`)
  )
  console.log(`${TEXT.SUCCESS_ADD_COMMIT}`)
}

export default async function add(features: string[] | string) {
  console.log(TEXT.TIP_WELCOME)
  console.log(TEXT.TIP_PROMPTS_START)

  const resolver = new ConfigResolver()
  if (features.indexOf('format') > -1) {
    await addFormat(resolver)
  }
  if (features.indexOf('commit') > -1) {
    await addCommit(resolver)
  }

  const resolverConfigData = resolver.data

  if (!formatSetting.name && Array.isArray(features)) {
    const saveSetting = await answerPrompts(PROMPTS_SAVE_PRESET)
    if (saveSetting.save) {
      const preset = getUserSetting('preset') ?? {}
      editUserSetting('preset', [
        ...preset,
        {
          name: saveSetting.name,
          description: saveSetting.description,
          environment: formatSetting.environment,
          typescript: formatSetting.typescript,
          framework: formatSetting.framework,
          style: formatSetting.style,
          extension: formatSetting.extension,
          formatDependencies: resolverConfigData.formatPackages,
          commitDependencies: resolverConfigData.commitPackages,
          commit: commitSetting.commit
        }
      ])
      console.log(TEXT.SUCCESS_SAVE_PRESET)
    }
  }

  const PROMPTS_INSTALL = await getInstallInfoPrompts()
  const packages = resolverConfigData.formatPackages
    .concat(resolverConfigData.commitPackages)
    .sort()
  console.log(TEXT.TIP_PROMPTS_DEPENDENCIES)
  console.log(`  ${packages.join('\n  ')}\n`)
  const installSetting = await prompts(PROMPTS_INSTALL)
  if (installSetting.install) {
    console.log(TEXT.PROCESS_START_INSTALL)
    await execa(
      installSetting.packageManager,
      installSetting.packageManager === 'npm'
        ? ['install', '--save-dev', ...packages]
        : ['add', '-D', ...packages],
      {
        encoding: 'utf8',
        stdio: 'inherit'
      }
    )
  }

  editProjectSetting(process.cwd(), {
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    environment: formatSetting.environment,
    typescript: formatSetting.typescript,
    framework: formatSetting.framework,
    extension: formatSetting.extension,
    formatPackages: resolverConfigData.formatPackages,
    commitPackages: resolverConfigData.commitPackages
  })

  console.log(TEXT.SUCCESS_INSTALLED)
}
