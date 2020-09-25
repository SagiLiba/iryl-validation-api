
export const minimumLength = (minLength) => ({ function: (min => text => text.length > min)(minLength), error: "Minimum of "+minLength+" characters" });

export const textOnly = { function: text => /^[A-Za-z]+$/.test(text), error: "Only text is allowed" };

export const numbersOnly = { function: text => /^[0-9]+$/.test(text), error: "Only numbers are allowed" };
