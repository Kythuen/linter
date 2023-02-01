import { retro, vice } from 'gradient-string'
import { bold, red } from 'kolorist'

export const TIP_WELCOME = bold(retro('\n🚀 Welcome to Code Linter\n'))
export const TIP_PROMPTS_START = bold(
  '💬 Please Answer questions about your project: '
)
export const TIP_PROMPTS_DEPENDENCIES = bold(
  `\n💬 The config that you've selected requires the following dependencies:`
)

export const ERROR_NOT_PROJECT = `${red(
  '✖'
)} Current directory is not a npm project, please check directory path`
export const ERROR_GET_SETTING = `${red('✖')} Can not resolve the config file: `
export const ERROR_EDIT_SETTING = `${red('✖')} Can not edit the config file: `
export const ERROR_NOT_GIT = `${red(
  '✖'
)} Detected that you haven't install Git, please install Git first: https://git-scm.com/`

export const SUCCESS_SAVE_PRESET = bold(
  '\n✔️  Successfully save preset template.\n'
)
export const SUCCESS_ADD_FORMAT = bold(
  '✔️  Successfully add code format configuration.'
)
export const SUCCESS_ADD_COMMIT = bold(
  '✔️  Successfully add standardization code commit configuration.'
)
export const SUCCESS_INSTALLED = bold(
  vice('\n🎉 Code lint successfully install into your project.\n')
)
export const SUCCESS_REMOVEED = bold(
  vice('\n🎉 Code lint has removed from your project.\n')
)

export const PROCESS_START_INSTALL = bold('\n⚡ Install dependencies...\n')
export const PROCESS_START_REMOVE = bold(
  '\n🧹 Remove code lint configuration...'
)

export const CANCEL_OPERATION = red('✖') + ' Operation cancelled'
export const CANCEL_ADD_COMMIT = red('✖') + ' Operation cancelled'
