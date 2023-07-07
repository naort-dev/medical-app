import { StyleProp } from "react-native"


export function mergeStylesFn<T>(styles: (Partial<T> | undefined)[]) {
  const filteredStyles: Partial<T>[] = styles.filter(s => s !== undefined) as Partial<T>[]
  return function<Key extends keyof T>(key: Key): StyleProp<T[Key]> {
    return filteredStyles.map(s => s[key])
  }
}

export default function mergeStyle<T extends object>(base: T, overrides: (Partial<T> | undefined)[]): T {
  return new Proxy<T>(base, {
    get(target: T, name: string, receiever: any) {
      if (name in target) {
        const key = name as keyof T
        const targetValue = target[key]
        const o = overrides.map(s => s && s[key]).filter(s => s !== undefined)
        return o.length ? [target[key], ...o] : target[key]
      }
    }
  })
}