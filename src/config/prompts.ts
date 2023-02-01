import { reset, gray } from 'kolorist'
import { getUserSetting, isCommandExist } from '../util'
import type { PromptObject, Choice, Answers } from 'prompts'
import type { PresetItemDataType } from '../util'

export async function getProjectInfoPrompts(): Promise<PromptObject[]> {
  const preset = getUserSetting('preset')
  const presetChoices: Choice[] = []
  if (preset) {
    preset.forEach((item: PresetItemDataType) => {
      presetChoices.push({
        title:
          item.name + gray(item.description ? `  ${item.description}` : ''),
        value: item.name
      })
    })
  }
  return [
    {
      name: 'preset',
      type: presetChoices.length ? 'select' : null,
      message: reset('Select a preset template:'),
      initial: 0,
      choices: [
        {
          title: 'Manual select',
          value: ''
        },
        ...presetChoices
      ]
    },
    {
      name: 'environment',
      type: (_: any, values: Answers<any>) => (values.preset ? null : 'select'),
      message: reset('Where does your code run?'),
      initial: 0,
      choices: [
        { title: 'Browser', value: 'web' },
        { title: 'Node', value: 'node' }
      ]
    },
    {
      name: 'typescript',
      type: (_: any, values: Answers<any>) =>
        values.preset ? null : 'confirm',
      message: reset('Does your code use TypeScript?'),
      initial: true
    },
    {
      name: 'framework',
      type: (_: any, values: Answers<any>) => (values.preset ? null : 'select'),
      message: reset('Which framework does your code use?'),
      initial: 0,
      choices: [
        { title: 'Vue', value: 'vue' },
        { title: 'None', value: 'none' }
      ]
    },
    {
      name: 'style',
      type: (_: any, values: Answers<any>) => (values.preset ? null : 'select'),
      message: reset('Choose a style guide do you want?'),
      initial: 0,
      choices: [
        {
          title: 'Airbnb: https://github.com/airbnb/javascript',
          value: 'airbnb'
        },
        {
          title: 'Standard: https://github.com/standard/standard',
          value: 'standard'
        },
        {
          title: 'Google: https://github.com/google/eslint-config-google',
          value: 'google'
        },
        {
          title: 'XO: https://github.com/xojs/eslint-config-xo',
          value: 'xojs'
        }
      ]
    }
  ]
}
export const PROMPTS_REMOVE_FORMAT: PromptObject[] = [
  {
    name: 'remove',
    type: (_: any, values: Answers<any>) => (values.preset ? null : 'confirm'),
    message: reset('Are you sure to remove code format lint from your code?'),
    initial: false
  }
]

export const PROMPTS_ADD_COMMIT: PromptObject[] = [
  {
    name: 'commit',
    type: (_: any, values: Answers<any>) => (values.preset ? null : 'confirm'),
    message: reset(
      'Are you sure to add standardized commit confiuration for your code?'
    ),
    initial: true
  }
]
export const PROMPTS_REMOVE_COMMIT: PromptObject[] = [
  {
    name: 'remove',
    type: (_: any, values: Answers<any>) => (values.preset ? null : 'confirm'),
    message: reset('Are you sure to remove commit lint from your code?'),
    initial: false
  }
]
export const PROMPTS_SAVE_PRESET: PromptObject[] = [
  {
    name: 'save',
    type: (_: any, values: Answers<any>) => (values.preset ? null : 'confirm'),
    message: reset('Save as a preset template?'),
    initial: false
  },
  {
    name: 'name',
    type: (_: any, values: Answers<any>) => (values.save ? 'text' : null),
    message: reset('Enter the name of this preset template:'),
    initial: '',
    validate: (value: string) =>
      !value ? `Enter the name of the preset template` : true
  },
  {
    name: 'description',
    type: (_: any, values: Answers<any>) => (values.save ? 'text' : null),
    message: reset('Enter the description of this preset template:'),
    initial: '',
    validate: (value: string) =>
      !value ? `Enter the description of the preset template` : true
  }
]

export async function getInstallInfoPrompts(): Promise<PromptObject[]> {
  const packageManagerChoice: Choice[] = []
  const alternative = ['npm', 'yarn', 'pnpm']
  alternative.forEach(async (item: string) => {
    const exist = await isCommandExist(`${item} -v`)
    if (exist) {
      packageManagerChoice.push({
        title: item,
        value: item
      })
    }
  })
  return new Promise(resolve => {
    resolve([
      {
        name: 'install',
        type: 'confirm',
        message: reset('Would you like to install them now?'),
        initial: true
      },
      {
        name: 'packageManager',
        type: (_: any, values: Answers<any>) =>
          values.install ? 'select' : null,
        message: reset('Choose a package manager:'),
        choices: packageManagerChoice
      }
    ])
  })
}
