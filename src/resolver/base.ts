import { ConfigResolverData } from '../util'

export function base(
  configData: ConfigResolverData,
  userConfigs: { environment: string }
) {
  configData.formatPackages = [
    'eslint',
    'eslint-config-airbnb-base',
    'eslint-plugin-import'
  ]
  configData.eslintOverrides = {
    env: { es2021: true },
    extends: ['airbnb-base'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'import/order': 0,
      'import/no-unresolved': 0,
      'import/extensions': 0,
      'func-names': ['warn', 'never'],
      'import/prefer-default-export': 0,
      'no-restricted-syntax': 0,
      'default-case': 0
    }
  }
  if (userConfigs.environment === 'web' && configData.eslintOverrides.env) {
    configData.eslintOverrides.env.browser = true
  }
  if (userConfigs.environment === 'node' && configData.eslintOverrides.env) {
    configData.eslintOverrides.env.node = true
  }
}
