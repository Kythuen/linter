import merge from 'deepmerge'
import { ConfigResolverData } from '../util'

export function vue(
  configData: ConfigResolverData,
  userConfigs: { framework: string }
) {
  const config = {
    env: {
      'vue/setup-compiler-macros': true
    },
    extends: ['plugin:vue/vue3-essential'],
    plugins: ['vue'],
    rules: {
      'vue/multi-word-component-names': 0,
      'vue/no-multiple-template-root': 0,
      'vue/no-v-model-argument': 0,
      'vue/no-reserved-component-names': 0
    }
  }

  if (userConfigs.framework === 'vue') {
    configData.eslintOverrides = merge(configData.eslintOverrides, config)
    configData.formatPackages.push('eslint-plugin-vue')
  }
}
