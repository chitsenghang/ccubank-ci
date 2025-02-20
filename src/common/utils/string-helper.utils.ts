export function convertToCapitalizeCase(value: string): string {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function snakeToCamelCase(snakeCaseString: string): string {
  return snakeCaseString.replace(/_([a-z])/g, (_, letter) =>
    letter.toUpperCase()
  );
}
