// configurar os controles  aqui!

import { gameData } from "../Constants/gameData.js"
import { colors } from "../Constants/Colors.js"

const muteBtn = document.querySelector('#muteBtn')
// const lightBtn = document.querySelector('#lightBtn')
const accessBtn = document.querySelector('#accessBtn')

const popUp = document.querySelector('#popUpMessage')
const popUpCloseBtn =  document.querySelector('#popUpBtn')
const infoBtn = document.querySelector('#infoBtn')
const infoCloseBtn = document.querySelector('#info-close')

const audioContext = new (window.AudioContext || window.webkitAudioContext)() //rever propriedade do obj
const gainNode = audioContext.createGain()
const currentAudio = {config:{startTime: 0, pausedAt: 0}}

const info = document.querySelector('#info') //container com as informações   
const i_body = document.querySelectorAll('.i-body') // quadros de informação
const i_navBtns = document.querySelectorAll('.i-navBtn') // botões de navegação das informaçoes




// const toggleLightMode = () => {
//     document.body.style.background =  gameData.isDarkMode ? colors.bg_light : colors.bg_dark

//     lightBtn.children[0].classList.toggle('fa-sun')
//     lightBtn.children[0].classList.toggle('fa-moon')

//     gameData.isDarkMode = ! gameData.isDarkMode

//     console.log('Iluminação alternada')
// }
const toggleVolume = () => {
    let originalVolume = gainNode.gain.value
    gameData.isMute = !gameData.isMute

    gainNode.gain.value = gameData.isMute ? 0 : 1
    // if(gameData.isMute){
    //     originalVolume = gainNode.gain.value
    //     gainNode.gain.value = 0 
    // } else {
    //     gainNode.gain.value = originalVolume
    // }
        
    muteBtn.children[0].classList.toggle('fa-volume-xmark')
    muteBtn.children[0].classList.toggle('fa-volume-high')

    console.log('Volume alternado')
}
const toggleAccessibility = () =>{
    const rootStyle = document.documentElement.style
    const styleSheet = document.styleSheets[0]

    gameData.isAccess = !gameData.isAccess 

    if(gameData.isAccess){
        accessBtn.children[0].classList.toggle('fa-eye', gameData.isAccess)
        rootStyle.setProperty('--yellow-focus--', colors.yellowFocus)

    } else {
        rootStyle.setProperty('--yellow-focus--', colors.transparent)
        accessBtn.children[0].classList.toggle('fa-eye-slash', !gameData.isAccess)
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

    let choiceReq = document.querySelector('.hm-b-title')
    if(gameData.isAccess){
        document.querySelector("#textToReader").textContent = "Instruções fechadas"
        if(choiceReq) setTimeout(() => choiceReq.focus(), 50)
    }
    
    const info = document.querySelector('#info')
    const introBoard = document.querySelector('#hm_initialMessage')
    const samplesBoard = document.querySelector('.hm_sampleTable')
    
    info.classList.toggle('active')
    info.setAttribute('aria-expanded', false)

    if(introBoard)  introBoard.removeAttribute('inert')
    if(samplesBoard) samplesBoard.removeAttribute('inert')
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
    popUp.setAttribute('hidden')
        
}

setIcons()

muteBtn?.addEventListener('click', toggleVolume)
// lightBtn?.addEventListener('click', toggleLightMode)
accessBtn?.addEventListener('click', toggleAccessibility)
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

export{
    gainNode,
    audioContext,
}