import remove from './remove'

export default async function clear() {
  remove(['format', 'commit'])
}
