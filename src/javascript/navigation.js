import { general_colors } from "../constants/colors.js"

function setNavigation(){
    const anySection = document.querySelector('#theProject')
    let navBtns = document.querySelectorAll('.navBtn')
    
    navBtns.forEach((navItem) => {
        navItem.addEventListener('click', () => {
            let sectionPosition = (navItem.getAttribute('sec_num') - 1)
            let sectionHeight = anySection.getBoundingClientRect().height
            let factor = sectionHeight * sectionPosition 
    
            window.scrollTo({
                top: factor,
                behavior: 'smooth'
            })
        })
    })

    const slider = document.querySelector('input#slider')
    slider.addEventListener('click', () => {
        let root = document.documentElement
        
        if(slider.checked){
            root.style.setProperty('--bg--', general_colors.bg_dark)
            root.style.setProperty('--h3-color', general_colors.h3_color_light)
        }else{
            root.style.setProperty('--bg--', general_colors.bg_light)  
            root.style.setProperty('--h3-color', general_colors.h3_color_dark)
        }
    })
}

export{
    setNavigation
}