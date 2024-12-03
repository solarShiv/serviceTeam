const convertToUpperCase = async(input) => {
    // Check if input is a string and contains alphabetic characters
    if (typeof input === "string" && /[a-zA-Z]/.test(input)) {
        return input.toUpperCase();
    }
    // Return input unchanged if it's only numbers or non-string
    return input;
}
module.exports = convertToUpperCase;