export function toTwoDecimals(s: string) {
  const index = s.indexOf('.');

  if (index !== -1) {
    return s.substring(0, index + 3);
  } else {
    return s;
  }
}

export function toDecimals(s: string, n: number) {
  const index = s.indexOf('.');

  if (index !== -1) {
    return s.substring(0, index + n + 1);
  } else {
    return s;
  }
}
