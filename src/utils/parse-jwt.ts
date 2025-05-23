export function parseJwt(token: string): Record<string, any> | null {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    console.error('Invalid token', e)
    return null
  }
}
