const plataformData = {
    isDarkMode: JSON.parse(localStorage.getItem('isDarkMode')) ?? true,
    colorTheme: 1,
    isAccess: JSON.parse(localStorage.getItem('isAccess')) ?? false
}

export{
    plataformData
}