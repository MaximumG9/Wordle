function applySavedTheme(){
  const themeLink = document.getElementById("theme-style")
  if (!themeLink) return;
  const savedTheme = localStorage.getItem(`theme`) || `light`

  themeLink.href = savedTheme === `light` ? `menu-style.css` : savedTheme + `-menu-style.css` 
}

applySavedTheme()