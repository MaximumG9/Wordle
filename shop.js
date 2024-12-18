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
    score = 1;
}
function changeTheme(){
    const themeLink = document.getElementById("theme-style");
    if (!themeLink) return;
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    
    themeLink.href = newTheme === `light` ? `shop-style.css` : `dark-shop-style.css`;
}
function applySavedTheme(){
    const themeLink = document.getElementById("theme-style")
    if (!themeLink) return;
    const savedTheme = localStorage.getItem(`theme`) || `light`

    themeLink.href = savedTheme === `light` ? `shop-style.css` : `dark-shop-style.css` 
}

function updateScore() {
    document.getElementById("score").textContent = "Score: " + score;
}
function backToMenu(){
    window.location.href = "menu.html";
  }

applySavedTheme()
// function updateTheme() {
//     let newStyleSheetRef = theme + "-" + document.getElementById("stylesheet").getAttribute("href");
//     document.getElementById("stylesheet").setAttribute("href",newStyleSheetRef);
// }

// document.getElementById("buy-mutliplier").addEventListener((event) => {
//     if(score > 5) {
//         score -= 5;
//         multiplier += 1.1;
//     }
// });
