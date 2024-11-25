import { colors } from "../Consts/Colors.js"
class GameAcessibleDisplay{
    constructor(father){
        this.father = father
        this.element = document.querySelector('.gameAccessibleContainer')
        this.librasBtn = document.querySelector('.libras_btn')
        this.lightModeBtn = document.querySelector('.lightMode_btn')
    }
    setAcessibleDisplay(){
        this.lightModeBtn.style.display
    }
    toggleDisplay(){
        const dHInfo =  document.querySelector('#info')
        const DBar = document.querySelector('#gameDisplay_bar')
        const Dbody = document.querySelector('#gameDisplay_body')
        const GDisplay = document.querySelector('#gameDisplay')

        if(this.librasBtn.classList.contains('active')){
                this.element.style.display = 'block'
                setTimeout(() => {
                  this.element.style.height = '73%'
                  this.element.style.width  = '100%'
                  this.element.style.opacity  = 1
                  dHInfo.appendChild(DBar)
                }, 20)
        }else{
            this.element.style.color = 'transparent'
            this.element.style.height = '0%'
            this.element.style.width  = '0%'
            this.element.style.opacity  = 0
            setTimeout(()=>{
                GDisplay.insertBefore(DBar, Dbody)
                this.element.style.display = 'none'
            }, 1000)
        }   
    }
    toggleLight(){
        if(this.lightModeBtn.classList.contains('active')){
            this.element.style.background = colors.transparent_a10
            this.element.style.border = `1px solid ${colors.blue_baby}`
        }else{
            this.element.style.background = colors.white
            this.element.style.border = `3px solid ${colors.blue_baby}`
        }
    }
    updateAccessibleContainer(){

    }
    resetAccessibleContainer(){

    }
    readWithAccessibility(text){
        if(!text || typeof text !== 'string') return
        const accessibleTextContainer = document.querySelector('.accessible_text')
        const mouseOverEvent = new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: false,
            view: window
        })
        const mouseOutEvent = new MouseEvent('mouseout', {
            bubbles: true,
            cancelable: false,
            view: window
        })
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: false,
            view: window
        })

        accessibleTextContainer.innerHTML = text
        accessibleTextContainer.dispatchEvent(mouseOverEvent)
        setTimeout(() => accessibleTextContainer.dispatchEvent(clickEvent), 200)
        accessibleTextContainer.dispatchEvent(mouseOutEvent)


        setTimeout(() => accessibleTextContainer.innerHTML = '', 300)
    }
}
export {
    GameAcessibleDisplay
}