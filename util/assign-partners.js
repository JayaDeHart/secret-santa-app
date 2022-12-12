function shuffle(array) {
  let copy = JSON.parse(JSON.stringify(array));
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shift(old) {
  const shifted = [];
  for (let x = 0; x < old.length; x++) {
    if (x === old.length - 1) {
      shifted[0] = old[x];
    } else {
      shifted[x + 1] = old[x];
    }
  }
  return shifted;
}

export default function assignPartners(members) {
  const old = shuffle(members);
  const shifted = shift(old);
  old.map((member, index) => {
    return Object.assign(member, { santa: shifted[index].name });
  });
  console.log(old);
  return old;
}
