const english = Array.from("abcdefghijklmnopqrstuvwxyz ");
const custom  = Array.from("⊸𐊀⛛Z]Иᖚそ𞋸𐒄ᖘ–[⅄Yπꘜ𝄑⋈ᖗ⊣⧖ⵏ𝄩ᖙ⨀ "); // Your custom chars
let isEnglishToCustom = true;

function doTranslate() {
  const input = Array.from(
      document.getElementById('inputBox').value.toLowerCase()
  );

  const source = isEnglishToCustom ? english : custom;
  const target = isEnglishToCustom ? custom : english;

  const result = input.map(char => {
    const index = source.indexOf(char);
    return index !== -1 ? target[index] : char;
  }).join('');

  document.getElementById('outputBox').textContent = result;
}

function swapLanguages() {
  isEnglishToCustom = !isEnglishToCustom;
  document.getElementById('lang1').innerText = isEnglishToCustom ? "English" : "Custom";
  document.getElementById('lang2').innerText = isEnglishToCustom ? "Custom" : "English";
  doTranslate(); // Re-translate current text
}
function adjustFontSize(el) {
    let size = 24; // Starting font size
    el.style.fontSize = size + "px";

    // Loop: while text is taller than the box, shrink font
    while (el.scrollHeight > el.clientHeight && size > 10) {
        size--;
        el.style.fontSize = size + "px";
    }
}