import { ESLint } from 'eslint'

export interface ConfigResolverInstance {
  data: {
    formatPackages: string[]
    commitPackages: string[]
    eslintOverrides: ESLint.ConfigData
  }
  commit: {
    packages: string[]
  }
}

export type ConfigResolverData = ConfigResolverInstance['data']

export class ConfigResolver {
  data: ConfigResolverInstance['data']

  constructor() {
    this.data = {
      formatPackages: [
        'eslint',
        'eslint-config-airbnb-base',
        'eslint-plugin-import'
      ],
      commitPackages: [
        '@commitlint/cli',
        '@commitlint/config-conventional',
        'commitizen',
        'cz-conventional-changelog',
        'husky',
        'lint-staged'
      ],
      eslintOverrides: {
        env: {
          es2021: true
        },
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
    }
  }

  use(
    handlerFn: (data: ConfigResolverData, ...params: any) => void,
    ...others: any
  ): this {
    handlerFn(this.data, ...others)
    return this
  }
}
