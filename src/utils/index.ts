export function toTwoDecimals(s: string) {
  const index = s.indexOf('.');

  if (index !== -1) {
    return s.substr(0, index + 3);
  } else {
    return s;
  }
}
