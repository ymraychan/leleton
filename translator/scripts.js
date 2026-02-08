const english = Array.from("abcdefghijklmnopqrstuvwxyz ");
const custom  = [
  "⊸","𐊀","⛛","Z","]","И","ᖚ","そ","𞋸","𐒄","ᖘ","–","[","⅄","Y","π","ꘜ","𝄑","⋈","ᖗ","⊣","⧖","ⵏ","𝄩","ᖙ","⨀"," "
];
let isEnglishToCustom = true;

// Create lookup maps once
const encryptMap = {};
const decryptMap = {};
english.forEach((char, i) => {
  encryptMap[char] = custom[i];
  decryptMap[custom[i]] = char;
});

function doTranslate() {
    const input = Array.from(
        document.getElementById('inputBox').value
    );

    const result = input.map(char => {
        return isEnglishToCustom 
               ? encryptMap[char.toLowerCase()] ?? char  // Encrypt
               : decryptMap[char] ?? char;               // Decrypt
    }).join('');

    document.getElementById('outputBox').textContent = result;
}

function swapLanguages() {
  isEnglishToCustom = !isEnglishToCustom;
  document.getElementById('lang1').innerText = isEnglishToCustom ? "English" : "Yoylese";
  document.getElementById('lang2').innerText = isEnglishToCustom ? "Yoylese" : "English";
  doTranslate(); // Re-translate current text
}

function adjustFontSize(el) {
    let size = 24; // Starting font size
    el.style.fontSize = size + "px";

    // Shrink font while text overflows
    while (el.scrollHeight > el.clientHeight && size > 10) {
        size--;
        el.style.fontSize = size + "px";
    }
}
