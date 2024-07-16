export function capitalizeFirstLetter(input: string): string {
  let lowerCaseInput = input.toLowerCase()
  let words = lowerCaseInput.split(' ');
  
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
  }
  let capitalizedInput = words.join(' ');

  capitalizedInput = capitalizedInput.replace(/\b(\w(?:\.\w)+)/g, (match) => match.toUpperCase());

  return capitalizedInput;
}

