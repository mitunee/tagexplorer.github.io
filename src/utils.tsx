export const isTouchDevice = () =>
  window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches

export const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  arr.length > 0 ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)] : []

export const assertUnreachable = (val: never): never => {
  throw new Error('TypeScript compiler will prevent this from ever being called.' + String(val))
}
