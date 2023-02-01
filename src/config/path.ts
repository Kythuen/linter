import path from 'path'
import userHome from 'user-home'

export const SETTING_DIRECTORY = path.join(userHome, '.ephemeras/.code-linter')
export const SETTING_FILE = path.join(SETTING_DIRECTORY, 'settings.json')
export const PROJECT_FILE = path.join(SETTING_DIRECTORY, 'projects.json')
