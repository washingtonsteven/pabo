const forEachArgs = (args: Array<any>, fn: Function) => {
  if (Array.isArray(args[0])) args = args[0]; // If an array was passed
  args.forEach((arg) => fn(arg));
};

export = forEachArgs;
