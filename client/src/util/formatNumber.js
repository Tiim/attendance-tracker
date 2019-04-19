export function zeroPad(nr, size) {
  var s = String(nr);
  while (s.length < (size || 2)) {
    s = '0' + s;
  }
  return s;
}

export function hideZero(nr) {
  if (nr == 0) {
    return '';
  } else {
    return nr;
  }
}
