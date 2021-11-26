const dataPasswordGenerated = document.querySelector(
    '[data-password-generated]'
);
const dataForm = document.querySelector('[data-form]');
const dataRange = document.querySelector('[data-range]');
const dataNumber = document.querySelector('[data-number]');

const includeUppercaseEl = document.getElementById('include-upercase');
const includeNumberEl = document.getElementById('include-number');
const includeSymbolsEl = document.getElementById('include-symbols');

//defining all characters from low to high
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 112);
const NUMBERS_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOLS_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));

//making value to work together
dataRange.addEventListener('change', chengedCharacterRange);
dataNumber.addEventListener('change', chengedCharacterRange);

function chengedCharacterRange(e) {
    const value = e.target.value;

    dataNumber.value = value;
    dataRange.value = value;
}

//submitting a form to generate a password

dataForm.addEventListener('submit', e => {
    e.preventDefault();

    const characterAmout = dataNumber.value;
    const includeUppercase = includeUppercaseEl.checked;
    const includeNumbers = includeNumberEl.checked;
    const includeSymbols = includeSymbolsEl.checked;

    const password = theGeneratedPassword(
        characterAmout,
        includeUppercase,
        includeNumbers,
        includeSymbols
    );

    dataPasswordGenerated.innerText = password;
});

//generate password from character codes
function theGeneratedPassword(
    characterAmout,
    includeUppercase,
    includeNumbers,
    includeSymbols
) {
    let charCodes = LOWERCASE_CHAR_CODES;
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBERS_CHAR_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODES);

    const passwordStored = [];
    for (let i = 0; i < characterAmout; i++) {
        const characterCode =
            charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordStored.push(String.fromCharCode(characterCode));
    }
    return passwordStored.join('');
}

//looping through low and high of charCodes
function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}
