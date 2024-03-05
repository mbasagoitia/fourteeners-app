function camelCaseToWords(words) {
    let separatedWords = words.replace(/([a-z])([A-Z])/g, '$1 $2');
    return capitalize(separatedWords);
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export {
    camelCaseToWords,
    capitalize
}