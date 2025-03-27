import { general_colors } from "../constants/colors.js"
import { plataformData } from "../constants/plataformData.js"

function setNavigationClick(){
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
}

function updatePlataformColors(){
    const slider = document.querySelector('input#slider')
    let root = document.documentElement
    
    let isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) ?? true
    plataformData.isDarkMode = isDarkMode
    slider.checked = isDarkMode

    if(slider.checked){
        root.style.setProperty('--bg--', general_colors.bg_dark)
        root.style.setProperty('--h3-color', general_colors.h3_color_light)
        root.style.setProperty('--btn-bg--', general_colors.btn_bg_dark)
        root.style.setProperty('--btn-cl--', general_colors.btn_cl_dark)
        root.style.setProperty('--btn-border--', general_colors.btn_border_dark)
        root.style.setProperty('--btn-shadow-1--', general_colors.btn_shadow_dark_1)
        root.style.setProperty('--btn-shadow-2--', general_colors.black)
        root.style.setProperty('--btn-h-s-1--', general_colors.btn_hover_shadow_dark_1_3)
        root.style.setProperty('--btn-h-s-2--', general_colors.black)
        root.style.setProperty('--btn-h-s-3--', general_colors.btn_hover_shadow_dark_1_3)
        root.style.setProperty('--btn-h-s-4--', general_colors.black)
        root.style.setProperty('--btn-a-s-1--', general_colors.btn_hover_shadow_dark_1_3)
        root.style.setProperty('--btn-a-s-2--', general_colors.black)
        root.style.setProperty('--btn-a-s-3--', general_colors.btn_hover_shadow_dark_1_3)
        root.style.setProperty('--btn-a-s-4--', general_colors.black)
        root.style.setProperty('--scrollbar-color--', general_colors.scrollbar_general_dark)
        root.style.setProperty('--main-scrollbar-color--', general_colors.white)

        plataformData.isDarkMode = true
        localStorage.setItem('isDarkMode', JSON.stringify(plataformData.isDarkMode))
    }else{
        root.style.setProperty('--bg--', general_colors.bg_light)  
        root.style.setProperty('--h3-color', general_colors.h3_color_dark)
        root.style.setProperty('--btn-bg--', general_colors.btn_bg_light)
        root.style.setProperty('--btn-cl--', general_colors.btn_cl_light)
        root.style.setProperty('--btn-border--', general_colors.btn_border_light)
        root.style.setProperty('--btn-shadow-1--', general_colors.btn_shadow_light_1)
        root.style.setProperty('--btn-shadow-2--', general_colors.white)
        root.style.setProperty('--btn-h-s-1--', general_colors.btn_hover_shadow_light_1)
        root.style.setProperty('--btn-h-s-2--', general_colors.white)
        root.style.setProperty('--btn-h-s-3--', general_colors.btn_hover_shadow_light_3)
        root.style.setProperty('--btn-h-s-4--', general_colors.white)
        root.style.setProperty('--btn-a-s-1--', general_colors.btn_hover_shadow_light_1)
        root.style.setProperty('--btn-a-s-2--', general_colors.white)
        root.style.setProperty('--btn-a-s-3--', general_colors.btn_hover_shadow_light_1)
        root.style.setProperty('--btn-a-s-4--', general_colors.white)
        root.style.setProperty('--scrollbar-color--', general_colors.scrollbar_general_light)
        root.style.setProperty('--main-scrollbar-color--', general_colors.scrollbar_main_light)

        plataformData.isDarkMode = false
        localStorage.setItem('isDarkMode', JSON.stringify(plataformData.isDarkMode))

    }

}


function setLightModeSlider(updateGameColor){
    const slider = document.querySelector('input#slider')
    const INITIAL_URL = 'localhost:9999'

    slider.addEventListener('click', () => {
        let root = document.documentElement
        let urlLastTerm = document.URL.split('/').filter(str => str !== '').pop()
        let isPlatformDoc = urlLastTerm === 'index.html' || urlLastTerm === INITIAL_URL
        console.log(`isPlatformDoc : ${isPlatformDoc}`)
        if(slider.checked){
            plataformData.isDarkMode = true
            localStorage.setItem('isDarkMode', JSON.stringify(plataformData.isDarkMode))
            if(isPlatformDoc){
                root.style.setProperty('--bg--', general_colors.bg_dark)
                root.style.setProperty('--h3-color', general_colors.h3_color_light)
                root.style.setProperty('--btn-bg--', general_colors.btn_bg_dark)
                root.style.setProperty('--btn-cl--', general_colors.btn_cl_dark)
                root.style.setProperty('--btn-border--', general_colors.btn_border_dark)
                root.style.setProperty('--btn-shadow-1--', general_colors.btn_shadow_dark_1)
                root.style.setProperty('--btn-shadow-2--', general_colors.black)
                root.style.setProperty('--btn-h-s-1--', general_colors.btn_hover_shadow_dark_1_3)
                root.style.setProperty('--btn-h-s-2--', general_colors.black)
                root.style.setProperty('--btn-h-s-3--', general_colors.btn_hover_shadow_dark_1_3)
                root.style.setProperty('--btn-h-s-4--', general_colors.black)
                root.style.setProperty('--btn-a-s-1--', general_colors.btn_hover_shadow_dark_1_3)
                root.style.setProperty('--btn-a-s-2--', general_colors.black)
                root.style.setProperty('--btn-a-s-3--', general_colors.btn_hover_shadow_dark_1_3)
                root.style.setProperty('--btn-a-s-4--', general_colors.black)
                root.style.setProperty('--scrollbar-color--', general_colors.scrollbar_general_dark)
                root.style.setProperty('--main-scrollbar-color--', general_colors.white)
                console.log('teste')
            }else {
                root.style.setProperty('--letter--', general_colors.letter_l)
                if(updateGameColor) updateGameColor()
            }
        }else{
            plataformData.isDarkMode = false
            localStorage.setItem('isDarkMode', JSON.stringify(plataformData.isDarkMode))

            if(isPlatformDoc) {
                root.style.setProperty('--bg--', general_colors.bg_light)  
                root.style.setProperty('--h3-color', general_colors.h3_color_dark)
                root.style.setProperty('--btn-bg--', general_colors.btn_bg_light)
                root.style.setProperty('--btn-cl--', general_colors.btn_cl_light)
                root.style.setProperty('--btn-border--', general_colors.btn_border_light)
                root.style.setProperty('--btn-shadow-1--', general_colors.btn_shadow_light_1)
                root.style.setProperty('--btn-shadow-2--', general_colors.white)
                root.style.setProperty('--btn-h-s-1--', general_colors.btn_hover_shadow_light_1)
                root.style.setProperty('--btn-h-s-2--', general_colors.white)
                root.style.setProperty('--btn-h-s-3--', general_colors.btn_hover_shadow_light_3)
                root.style.setProperty('--btn-h-s-4--', general_colors.white)
                root.style.setProperty('--btn-a-s-1--', general_colors.btn_hover_shadow_light_1)
                root.style.setProperty('--btn-a-s-2--', general_colors.white)
                root.style.setProperty('--btn-a-s-3--', general_colors.btn_hover_shadow_light_1)
                root.style.setProperty('--btn-a-s-4--', general_colors.white)
                root.style.setProperty('--scrollbar-color--', general_colors.scrollbar_general_light)
                root.style.setProperty('--main-scrollbar-color--', general_colors.scrollbar_main_light)
            } else {
                root.style.setProperty('--letter--', general_colors.letter_d)
                if(updateGameColor) updateGameColor()

            }
        }
        console.log(plataformData.isDarkMode)
    })
}

function setPlataformHeader(){
    setNavigationClick()
    setLightModeSlider()
}

export{
    setNavigationClick,
    setLightModeSlider,
    setPlataformHeader,
    updatePlataformColors

}