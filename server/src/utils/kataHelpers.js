function parseInputs(args, inputSeparator = ",", typeSeparator = ":") {
    const inputs = [];

    const splitInputs = args.split(inputSeparator);

   splitInputs.forEach(inputItem => {
       const [input, type] = inputItem.split(typeSeparator);

       switch(type) {
            case "string": {
                inputs.push(input);
                break;
            }
            case "number": {
                inputs.push(Number(input));
                break;
            }
            case "boolean": {
                inputs.push(input === 'true');
                break;
            }
            case "array": {
                inputs.push(parseInputs(input, "'", "#"));
                break;
            }
       }
   });

   return inputs;
}

module.exports = {
    parseInputs
};
