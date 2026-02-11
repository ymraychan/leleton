const english = Array.from("abcdefghijklmnopqrstuvwxyz");
let isEnglishToCustom = true;

// Create lookup maps once
const encryptMap = {};
const decryptMap = {};


function doTranslate() {
    const text = document.getElementById("inputBox").value;
    const key = Number(document.getElementById("key").value) || 0;
    const action = getSelectedAction();

    let result = "";

    for (let i = 0; i < text.length; i++) {
        const originalChar = text[i];
        const lowerChar = originalChar.toLowerCase();
        const index = english.indexOf(lowerChar);

        // keep spaces / punctuation unchanged
        if (index === -1) {
            result += originalChar;
            continue;
        }

        let shiftedIndex;
        if (action === "encrypt") {
            shiftedIndex = (index + key) % 26;
        } else {
            shiftedIndex = (index - key + 26) % 26;
        }

        let newChar = english[shiftedIndex];

        // restore uppercase if needed
        if (originalChar === originalChar.toUpperCase()) {
            newChar = newChar.toUpperCase();
        }

        result += newChar;
    }

    document.getElementById("outputBox").textContent = result;
}



function getSelectedAction() {
    const selected = document.querySelector('input[name="temp"]:checked');
    return selected ? selected.value : null;
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
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text successfully copied!');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
document.getElementById("copyTranslated").addEventListener("click", function () {
  copyToClipboard(document.getElementById("outputBox").textContent)
});
document.getElementById("copyOriginal").addEventListener("click", function () {
  copyToClipboard(document.getElementById("inputBox").value)
});