let score = Number.parseFloat(localStorage.getItem("score"));
let multiplier = Number.parseFloat(localStorage.getItem("multiplier"))

// let theme = localStorage.getItem("theme")

// if(theme != null) {
//     updateTheme();
// }


if(Number.isNaN(score)) {
    score = 0;
}

if(Number.isNaN(multiplier)) {
    multiplier = 1;
}

function changeTheme(newTheme){
    const themeLink = document.getElementById("theme-style");
    if (!themeLink) return;

    localStorage.setItem("theme", newTheme);
    
    themeLink.href = newTheme === `light` ? `shop-style.css` : newTheme + `-shop-style.css`;
}
function buyTheme(theme,price) {
    const savedTheme = localStorage.getItem(`theme`) || `light`
    if(theme == savedTheme) {
        document.getElementById("error-text").innerText = "You are already using that theme"
        return;
    }
    if(score >= price) {
        changeTheme(theme);
        score -= price;
        updateScore();
    } else {
        document.getElementById("error-text").innerText = "That item is too expensive"
    }
}

function buyMultiplier(price) {
    if(score >= price) {
        score -= price;
        updateScore();
        multiplier += 0.1;
        updateMultiplier()
    }
}

function updateMultiplier() {
    localStorage.setItem("multiplier",multiplier.toPrecision());
}

function applySavedTheme(){
    const themeLink = document.getElementById("theme-style")
    if (!themeLink) return;
    const savedTheme = localStorage.getItem(`theme`) || `light`

    themeLink.href = savedTheme === `light` ? `shop-style.css` : savedTheme + `-shop-style.css` 
}

function updateScore() {
    localStorage.setItem("score",score.toPrecision());
    document.getElementById("score").textContent = "Score: " + score;
}
function backToMenu(){
    window.location.href = "menu.html";
  }

applySavedTheme()
updateScore()
