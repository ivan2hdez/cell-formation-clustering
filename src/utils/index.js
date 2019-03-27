const charCode = 'a'.charCodeAt(0);

// Gets an alphabet letter by index (A=0)
function getLetter(index) {
  const b = [index];
  let sp = 0;
  let out = '';
  let div;

  while(sp < b.length) {
    if (b[sp] > 25) {
      div = Math.floor(b[sp] / 26);
      b[sp + 1] = div - 1;
      b[sp] %= 26;
    }
    sp++;
  }

  for (let i = 0; i < b.length; i++) {
    out = String.fromCharCode(charCode + b[i]) + out;
  }

  return out.toUpperCase();
};

// Base similarity on number of common parts.
function similarity(x, y) {
  let score = 0;
  x.parts.forEach((tx) => {
    y.parts.forEach((ty) => {
      if (tx === ty)
        score++;
    });
  });
  return score;
}

export { getLetter, similarity };
