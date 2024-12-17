let score = Number.parseFloat(localStorage.getItem("score"));
let multiplier = Number.parseFloat(localStorage.getItem("multiplier"))
let theme = localStorage.getItem("theme")

if(theme != null) {
    updateTheme();
}


if(Number.isNaN(score)) {
    score = 0;
}

if(Number.isNaN(multiplier)) {
    score = 1;
}

function updateScore() {
    document.getElementById("score").textContent = "Score: " + score;
}

function updateTheme() {
    let newStyleSheetRef = theme + "-" + document.getElementById("stylesheet").getAttribute("href");
    document.getElementById("stylesheet").setAttribute("href",newStyleSheetRef);
}

document.getElementById("buy-mutliplier").addEventListener((event) => {
    if(score > 5) {
        score -= 5;
        multiplier += 1.1;
    }
});