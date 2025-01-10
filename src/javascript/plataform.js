import { palett } from "../constants/colors.js"
import { setPlataformHeader } from "./navigation.js"
import { setTheProjectTextScroll, setPhotoScroll, setMainScroll, setFooter } from "./scroll.js"
import { setGalery, setPhotoScreen } from "./galery.js"
import { updateTestimonial } from "./automateTestimonials.js"
import { handleForm } from "./handleForm.js"

setGalery()
setPlataformHeader()
setTheProjectTextScroll()
setPhotoScroll()
setPhotoScreen()
updateTestimonial()
setMainScroll()
handleForm()
setFooter()

let gameidx = 0

const gameSectionBtns = document.querySelectorAll('.gameBtn')
const gmControls_prev = document.querySelector('#gm_controlBtnPrev')
const gmControls_next = document.querySelector('#gm_controlBtnNext')

const teamContainers  = document.querySelectorAll('.team_container') 
const ttControls_prev = document.querySelector('#tt_controlBtn_prev')
const ttControls_next = document.querySelector('#tt_controlBtn_next')

const root = document.documentElement
let ph_bg, t_bg

ph_bg = document.getElementById('photos_bg')
t_bg = document.getElementById('testimonials_bg')

gmControls_next.addEventListener('click', e => {
    gameidx >= 4 ? gameidx = 0 : gameidx++

    root.style.setProperty('--main-light--', palett[`light_${gameidx + 1}`])
    root.style.setProperty('--main-dark--', palett[`dark_${gameidx + 1}`])
    root.style.setProperty('--main-deep--', palett[`deep_${gameidx + 1}`])
    root.style.setProperty('--main-soft-light', palett[`soft_light_${gameidx + 1}`])
    root.style.setProperty('--main-soft-light-t5', palett[`soft_light_t5_${gameidx + 1}`])
    root.style.setProperty('--main-p-bg', palett[`p_bg_${gameidx + 1}`])
    root.style.setProperty('--main-g-bg', palett[`g_bg_${gameidx + 1}`])

    root.style.setProperty('--main-t-shadow1', palett[`t_shadow1_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow2', palett[`t_shadow2_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow3', palett[`t_shadow3_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow4', palett[`t_shadow4_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow5', palett[`t_shadow5_${gameidx + 1}`])
    
    root.style.setProperty('--main-t-shadow5', palett[`t_shadow5_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow5', palett[`t_shadow5_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow5', palett[`t_shadow5_${gameidx + 1}`])
    
    root.style.setProperty('--main-tm-deep', palett[`tm_deep_${gameidx + 1}`])
    
    root.style.setProperty('--s1--', palett[`s1_${gameidx + 1}`])
    root.style.setProperty('--s2--', palett[`s2_${gameidx + 1}`])
    root.style.setProperty('--s3--', palett[`s3_${gameidx + 1}`])
    
    ph_bg.setAttribute('src', `../assets/backgrounds/balls_${gameidx + 1}.png`)
    t_bg.setAttribute('src', `../assets/backgrounds/balls_${gameidx + 1}.png`)



    gameSectionBtns.forEach((el, i) => {
        if(i === gameidx - 1 ){
            el.className = 'gameBtn left'
        }else if (i === gameidx){
            el.className = 'gameBtn active'
        } else if(i === gameidx + 1){
            el.className = 'gameBtn right'
        }else{
            if(gameidx === 0){
                 gameSectionBtns[4].className = 'gameBtn left'
            } else {
                el.className = 'gameBtn right reseted'
            }
        }
    })
})
gmControls_prev.addEventListener('click', e => {
    gameidx <= 0 ? gameidx = 4 : gameidx--
    root.style.setProperty('--main-light--', palett[`light_${gameidx + 1}`])
    root.style.setProperty('--main-dark--', palett[`dark_${gameidx + 1}`])
    root.style.setProperty('--main-deep--', palett[`deep_${gameidx + 1}`])
    root.style.setProperty('--main-soft-light', palett[`soft_light_${gameidx + 1}`])
    root.style.setProperty('--main-soft-light-t5', palett[`soft_light_t5_${gameidx + 1}`])
    root.style.setProperty('--main-p-bg', palett[`p_bg_${gameidx + 1}`])
    root.style.setProperty('--main-g-bg', palett[`g_bg_${gameidx + 1}`])

    root.style.setProperty('--main-t-shadow1', palett[`t_shadow1_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow2', palett[`t_shadow2_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow3', palett[`t_shadow3_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow4', palett[`t_shadow4_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow5', palett[`t_shadow5_${gameidx + 1}`])
    
    root.style.setProperty('--main-t-shadow5', palett[`t_shadow5_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow5', palett[`t_shadow5_${gameidx + 1}`])
    root.style.setProperty('--main-t-shadow5', palett[`t_shadow5_${gameidx + 1}`])
    
    root.style.setProperty('--main-tm-deep', palett[`tm_deep_${gameidx + 1}`])
    
    root.style.setProperty('--s1--', palett[`s1_${gameidx + 1}`])
    root.style.setProperty('--s2--', palett[`s2_${gameidx + 1}`])
    root.style.setProperty('--s3--', palett[`s3_${gameidx + 1}`])


    gameSectionBtns.forEach((el, i) => {
        if(i === gameidx - 1 ){
            el.className = 'gameBtn left'
        }else if (i === gameidx){
            el.className = 'gameBtn active'
            if(i === 4){
                gameSectionBtns[0].className = 'gameBtn right'
            }
        } else if(i === gameidx + 1){
            el.className = 'gameBtn right'
        }else{
            if(gameidx === 0){
                 gameSectionBtns[4].className = 'gameBtn left'
            } else {
                el.className = 'gameBtn left reseted'
            }
        }
    })
})

ttControls_prev.addEventListener('click', () => teamContainers.forEach(c => c.classList.toggle('active')))
ttControls_next.addEventListener('click', () => teamContainers.forEach(c => c.classList.toggle('active')))

// contact inputs e label JS
let cInputArr = document.querySelectorAll('.c_input')
let cTextAreaEl = document.querySelector('#contact_message')

cInputArr.forEach(i => {
    let relatedWrapper = document.querySelector(`div[${i.getAttribute('wrapper')}]`)
    let relatedLabel = document.querySelector(`label[for=${i.getAttribute('name')}]`)

    relatedWrapper.addEventListener('mouseout', (e) => {
        if(i.value){
            relatedLabel.style.top = '-2rem'
            relatedLabel.style.left = '-3%'
            relatedLabel.style.color = 'var(--letter--)'

            i.style.border = 'none'
        } else {
            let top = '50%', left = '1%'
            if(e.target.name === 'message'){
                top = '6%'
                left = '10px'
            }
            relatedLabel.style.top = top
            relatedLabel.style.left = left
            relatedLabel.style.color = 'var(--main-dark--)'
            relatedLabel.style.filter = 'none'
            i.style.outline = 'none'
            
        }
    })
    relatedWrapper.addEventListener('mouseover', (e) => {
        relatedLabel.style.top = '-40%'
        relatedLabel.style.left = '-3%'
        relatedLabel.style.color  = 'var(--letter--)'
        relatedLabel.style.filter = 'drop-shadow(1px 1px 1px var(--shadow--))'

        i.style.outline = '3px solid var(--main-light--)'
    })

    i.addEventListener('focus', (e) => {
        let top = ''
        top = e.target.name === 'message' ? '-6%' : '-40%'

        relatedLabel.style.top = top
        relatedLabel.style.left = '-3%'
        relatedLabel.style.color  = 'var(--letter--)'
        relatedLabel.style.filter = 'drop-shadow(1px 1px 1px var(--shadow--))'

        i.style.outline = '3px solid var(--main-light--)'
    })
    i.addEventListener('blur', (e) => {
        if(e.target.value){            
            relatedLabel.style.top = '-2rem'
            relatedLabel.style.left = '-3%'
            relatedLabel.style.color = 'var(--letter--)'

            i.style.color = `var(--main-dark--)`
            i.style.fontSize = `1.8rem`
        } else {
            let top = '50%', left = '1%'

            if(e.target.name === 'message'){
                top = '6%'
                left = '10px'
            }
            relatedLabel.style.top = top
            relatedLabel.style.left = left
            relatedLabel.style.color = 'var(--main-dark--)'
            relatedLabel.style.filter = 'none'
            
        }
    })

})

handleCtTextarea()
function handleCtTextarea(){
    let relatedLabel = document.querySelector('label[for=message]')

    cTextAreaEl.addEventListener('mouseenter', (e) => {
        relatedLabel.style.top = '-6%'
        relatedLabel.style.left = '-3%'
        relatedLabel.style.color  = 'var(--letter--)'
        relatedLabel.style.filter = 'drop-shadow(1px 1px 1px var(--shadow--))'

        cTextAreaEl.style.outline = '3px solid var(--main-light--)'
    })
    cTextAreaEl.addEventListener('mouseleave', (e) => {
        if(e.target.value){
            relatedLabel.style.top = '-2rem'
            relatedLabel.style.left = '-3%'
            relatedLabel.style.color = 'var(--letter--)'

            cTextAreaEl.style.border = 'none'
        } else {
            relatedLabel.style.top = '6%'
            relatedLabel.style.left = '10px'
            relatedLabel.style.color = 'var(--main-dark--)'
            relatedLabel.style.filter = 'none'
            cTextAreaEl.style.outline = 'none'
        }
    })
    cTextAreaEl.addEventListener('focus', (e) => {
        relatedLabel.style.top = '-6%'
        relatedLabel.style.left = '-3%'
        relatedLabel.style.color  = 'var(--letter--)'
        relatedLabel.style.filter = 'drop-shadow(1px 1px 1px var(--shadow--))'

        cTextAreaEl.style.outline = '3px solid var(--main-light--)'
    })
    cTextAreaEl.addEventListener('blur', (e) => {
        if(e.target.value){            
            relatedLabel.style.top = '-2rem'
            relatedLabel.style.left = '-3%'
            relatedLabel.style.color = 'var(--letter--)'

            cTextAreaEl.style.color = `var(--main-dark--)`
            cTextAreaEl.style.fontSize = `1.8rem`
        } else {
            relatedLabel.style.top = '6%'
            relatedLabel.style.left = '10px'
            relatedLabel.style.color = 'var(--main-dark--)'
            relatedLabel.style.filter = 'none'
            
        }
    })

}

window.onerror = function(message, source, lineno, colno, error){
    const erroMessage = `
    message: ${message}
    fonte: ${source}
    linha: ${lineno}
    coluna: ${colno}
    erro: ${error}
    `
    console.log(erroMessage)
}

