import { rootExists } from './file'

export function getPackageManager() {
  if (rootExists('package-lock.json')) {
    return 'npm'
  } else if (rootExists('yarn.lock')) {
    return 'yarn'
  }
  return 'pnpm'
}
