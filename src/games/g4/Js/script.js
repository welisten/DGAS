// configurar os controles  aqui!
import { platformData } from "../../../constants/platformData.js"
import { gameData } from "../Constants/gameData.js"
import { colors } from "./../Constants/colors.js"
import { setLightModeSlider } from "../../../util/navigation.js"


const muteBtn = document.querySelector('#muteBtn')
const accessBtn = document.querySelector('#accessBtn')

const popUp = document.querySelector('#popUpMessage')
const popUpCloseBtn =  document.querySelector('#popUpBtn')
const infoBtn = document.querySelector('#infoBtn')
const infoCloseBtn = document.querySelector('#info-close')

const audioContext = new (window.AudioContext || window.webkitAudioContext)() //rever propriedade do obj
const gainNode = audioContext.createGain()
const currentAudios = {}

const info = document.querySelector('#info') //container com as informações   
const i_body = document.querySelectorAll('.i-body') // quadros de informação
const i_navBtns = document.querySelectorAll('.i-navBtn') // botões de navegação das informaçoes

const toggleVolume = () => {
    gameData.isMute = !gameData.isMute
    console.log(currentAudios)
    
    if(gameData.isMute){
      for(let key in currentAudios){
        currentAudios[key].config.gainNode.gain.value = 0
      }  
    } else {
        for(let key in currentAudios){
            let audioVolume = currentAudios[key].config.volume
            currentAudios[key].config.gainNode.gain.value = audioVolume
        }
    }
    
    muteBtn.children[0].classList.toggle('fa-volume-xmark')
    muteBtn.children[0].classList.toggle('fa-volume-high')

    console.log('Volume alternado')
}
const updateAccessibility = () =>{
    const rootStyle = document.documentElement.style

    const popUpContainer = document.querySelector('#popUpMessage')

    gameData.isAccess = !gameData.isAccess 

    if(gameData.isAccess){
        accessBtn.children[0].classList.toggle('fa-eye', gameData.isAccess)
        accessBtn.children[0].classList.toggle('fa-eye-slash', !gameData.isAccess)
        rootStyle.setProperty('--yellow-focus--', colors.yellowFocus)
        
        const popUpBtn = document.querySelector('#popUpBtn')
        if(popUpBtn) popUpBtn.remove();
        
    } else {
        rootStyle.setProperty('--yellow-focus--', colors.transparent)
        accessBtn.children[0].classList.toggle('fa-eye-slash', !gameData.isAccess)
        accessBtn.children[0].classList.toggle('fa-eye', gameData.isAccess)

       
        let popUpBtn  = document.querySelector('#popUpBtn')
        if(!popUpBtn){
            popUpBtn= document.createElement('button')
            const btnIcon = document.createElement('i')
    
            popUpBtn.className = 'popup_btn'
            popUpBtn.id = 'popUpBtn'
            popUpBtn.setAttribute('title', 'Clique para fechar o alerta')
            popUpBtn.setAttribute('aria-label', 'Fechar alerta');
            btnIcon.className = 'fa-solid fa-xmark'
            
            popUpBtn.append(btnIcon)
            popUpContainer.append(popUpBtn)
            popUpBtn.addEventListener('click', handleClosePopUp)
        }
    }
    console.log('Acessibilidade alternada')
}
const activeGameInformationBoard = () => {
    let titleText, body_iGame, body_iProposal;
    
    if(info.classList.contains("active")){
        return
    }
    titleText = document.querySelector('.t-text')
    body_iGame = document.querySelector('.body-g')
    body_iProposal = document.querySelector('.body-p')
    
    if(gameData.mainScene === 'Game' ){
        body_iProposal.classList.add('active')
        body_iGame.classList.remove('active')
        
        const introBoard = document.querySelector('#hm_initialMessage')
        const samplesBoard = document.querySelector('.hm_sampleTable')

        if(introBoard)  introBoard.setAttribute('inert', '')
        if(samplesBoard) samplesBoard.setAttribute('inert', '')

    } else {
        body_iProposal.classList.remove('active')
        body_iGame.classList.add('active') 
    }
    info.classList.toggle('active')
    info.setAttribute('aria-expanded', true)
    
    if(gameData.isAccess) titleText.focus();
}
const closeInformationBoard = () => {
    const infoContainer = document.querySelector('#info') //container com as informações   

    if(!infoContainer.classList.contains('active')){
        console.log("Abra as informaçoes antes") // ??
        return
    }

    const introBoard = document.querySelector('#hm_initialMessage')
    const samplesBoard = document.querySelector('.hm_sampleTable')
    const hm_initialFocus = document.querySelector('[hm-initialFocus]')

    if(introBoard)  introBoard.removeAttribute('inert')
    if(samplesBoard) samplesBoard.removeAttribute('inert')
    if(gameData.isAccess){
        document.querySelector("#textToReader").textContent = "Instruções fechadas"
        if(hm_initialFocus) setTimeout(() => hm_initialFocus.focus(), 50)
    }
    
    const info = document.querySelector('#info')
    info.classList.toggle('active')
    info.setAttribute('aria-expanded', false)
}
const toggleInfoSections = () => {
    if(!info.classList.contains('active')){
        return
    }
    let infoTheme = document.querySelectorAll('.i-b0')

    i_body.forEach(container => container.classList.toggle('active'))
    if(gameData.isAccess){
        infoTheme.forEach( theme => {
            if(theme.style.display !== 'none') theme.focus()
        })
    }
}
const handleClosePopUp = () => {
    popUp.style.display = 'none'
    popUp.style.opacity = 0
    console.log('dentro')
    popUp.classList.toggle('animated', !popUp.classList.contains('animated'))
    popUp.setAttribute('hidden', '')
        
}

setIcons()
setLightModeSlider()
muteBtn?.addEventListener('click', toggleVolume)
accessBtn?.addEventListener('click', updateAccessibility)
infoBtn.addEventListener('click', activeGameInformationBoard)
infoCloseBtn.addEventListener('click', closeInformationBoard)
i_navBtns.forEach(btn => {
    btn.addEventListener('click', toggleInfoSections)
})
document.addEventListener('keydown', (e) => {
    if(!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    
    e.preventDefault()
    toggleInfoSections();
})
popUpCloseBtn?.addEventListener('click', handleClosePopUp)


function setIcons(){
    muteBtn.children[0].classList.toggle('fa-volume-xmark', gameData.isMute);
    muteBtn.children[0].classList.toggle('fa-volume-high', !gameData.isMute);

    // lightBtn.children[0].classList.toggle('fa-moon', !gameData.isDarkMode);
    // lightBtn.children[0].classList.toggle('fa-sun', gameData.isDarkMode);


    accessBtn.children[0].classList.toggle('fa-eye-slash', !gameData.isAccess)
    accessBtn.children[0].classList.toggle('fa-eye', gameData.isAccess)
}

function updateGameData(){
    gameData.isAccess = platformData.isAccess
    gameData.isDarkMode = platformData.isDarkMode
    
    const rootStyle = document.documentElement.style
    
    rootStyle.setProperty('--yellow-focus--', gameData.isAccess ? colors.yellowFocus : colors.transparent)
    rootStyle.setProperty('--bg--', gameData.isDarkMode ? colors.bg_dark : colors.bg_light)

    const accessBtn = document.querySelector('#accessBtn')
    accessBtn.children[0].className = gameData.isAccess ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'

}

export{
    gainNode,
    audioContext,
    currentAudios,
    updateGameData
}