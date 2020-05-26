const pick = (arr: Array<any>): any =>
  arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;

export = pick;
