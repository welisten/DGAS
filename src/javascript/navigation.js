import { general_colors, palett } from "../constants/colors.js"

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
        }
    })
}

export{
    setNavigation
}