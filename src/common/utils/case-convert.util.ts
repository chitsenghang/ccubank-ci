export function getLowerSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`)
    .toLowerCase()
    .replace(/^_/, ''); // Remove leading underscore if any
}
