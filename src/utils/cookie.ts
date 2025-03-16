import { get, set, remove } from 'cookie'
import type { CookieSerializeOptions } from 'cookie'

export function getCookie(name: string, options: CookieSerializeOptions = {}) {
  const cookies = get(document.cookie)
  return cookies[name]
}

export function setCookie(
  name: string,
  value: string,
  options: CookieSerializeOptions = {}
) {
  const cookie = set(name, value, {
    path: '/',
    ...options,
  })
  document.cookie = cookie
}

export function removeCookie(name: string, options: CookieSerializeOptions = {}) {
  const cookie = remove(name, {
    path: '/',
    ...options,
  })
  document.cookie = cookie
}
