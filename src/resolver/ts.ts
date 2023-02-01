import merge from 'deepmerge'
import { ConfigResolverData } from '../util'

export function ts(
  configData: ConfigResolverData,
  userConfigs: { typescript: boolean }
) {
  const config = {
    parserOptions: {
      parser: '@typescript-eslint/parser'
    },
    plugins: ['@typescript-eslint']
  }

  if (userConfigs.typescript) {
    configData.eslintOverrides = merge(configData.eslintOverrides, config)
    configData.formatPackages = configData.formatPackages.concat([
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'typescript'
    ])
  }
}
