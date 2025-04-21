import { Transform } from 'class-transformer';

export function getLowerSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`)
    .toLowerCase()
    .replace(/^_/, ''); // Remove leading underscore if any
}

export const toBoolean = (value: unknown): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }

  return !!value;
};

export const ToNumberArray = () =>
  Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((v): number => Number(v.trim()));
    }

    return value;
  });
