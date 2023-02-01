import to from 'await-to-js'
import execa from 'execa'

export async function isCommandExist(testCommand: string) {
  const [err] = await to(execa(testCommand))
  return !!!err
}
