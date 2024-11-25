import { Preloader } from './Scenes/Preload.js';
import { getDeviceSice } from '../../g1/JavaScript/getDeviceSize.js';
import { colors } from './Consts/Colors.js';


const gameData = {
  isPreloadComplete: false,
  intro: undefined, 
  score: undefined,
  isMute: false,
  isDarkMode: true,
  isScreenReaderActive: false,
  isLibrasActive: false,
  lastAccText: '',
  isPaused: false,
  lastLevel: 1,
  class: 'Preload'
} 

window.gameData = gameData // RETIRAR DEPOIS // arquivo emoutro módulo é melhor

new Preloader()

const accessibleContainer = document.querySelector('.gameAccessibleContainer')
const mainContainers      = document.querySelectorAll('.mainContainer')

let containerWidth        = getDeviceSice()

mainContainers.forEach(container => {
  container.style.width = `${containerWidth}px`
  container.style.height = `${containerWidth}px`  
})

const popupBtn =  document.querySelector('.popup_btn')
popupBtn.addEventListener('click', ()=>{
  popupBtn.parentNode.style.opacity = 0
})

const btns =  document.querySelectorAll('.controlBtn') 
btns.forEach(btn => {         // handle hover buttons state
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    btn.classList.remove('hovered');
  });

  btn.addEventListener('mouseenter', () => {
    btn.classList.add('hovered');
  });

  btn.addEventListener('mouseleave', () => {
    btn.classList.remove('hovered');
  });
})

let auxText = ''
const readText = (text) => {
  let elem = document.querySelector('.textToReader')
 
  if(text === auxText) text += '.'
  auxText = text
  elem.textContent = text
}
const popUpMessage = (message, nxtElem, delay = 2500, isVisible = true, chaining = false) => {   // EXIBE MENSAGEM NO POPUP VISÍVEL
  const popUp = document.getElementById('popUp')
  const popupText = document.querySelector('.popupText')
  const nextFocusElement = document.querySelector(nxtElem)
  let display = popUp.style.display
  
  if(display != 'flex')   popUp.style.display = 'flex'
  if(isVisible)
      popUp.style.opacity = 1
  
  if(!chaining)
      popupText.textContent = ''

  popupText.setAttribute('tabindex', 1)
  popupText.textContent = message
  popupText.focus() 
  if(gameData.isLibrasActive)
    gameData.intro.gameAcessibleDisplay.readWithAccessibility(message)
  
  if(isVisible && delay){
      setTimeout(() => {
          popUp.style.opacity = 0
          popUp.style.display = 'none'
      }, delay)
  }
  
  if(nxtElem && gameData.isScreenReaderActive)
      setTimeout(() => nextFocusElement.focus(), delay + 100)
}

const btnsAndClss = []                                                          // para cada botão, suas respectivas classes                                                          
btns.forEach((elem, i) => btnsAndClss[i] = [elem, elem.className.split(' ')[1]])// armazena para cada botão de controle, uma arrey contendo o elemento e a 2° classe desse elemento(botão)

btnsAndClss.forEach( elemClassArr => {
  let auxContrl = ''
  elemClassArr[0].addEventListener('mouseover', (e) => {
    if(auxContrl === e.target) return
    if(gameData.isLibrasActive)
      gameData.intro.gameAcessibleDisplay.readWithAccessibility(`${e.target.title}`)

    setTimeout(() => auxContrl =  '', 1000)
  })
  switch(elemClassArr[1]){
    case 'mute_btn':
      elemClassArr[0].addEventListener('click', () => {
        gameData.isMute = !gameData.isMute
        if(gameData.isScreenReaderActive){
          let state = elemClassArr[0].classList.contains('active') ? 'ativado' : 'desativado' // o status de ativo ou desativo é referente ao som e não ao mudo
          readText(`O Som foi ${state} `)
        }
        elemClassArr[0].classList.toggle('active')
        
        const icon = elemClassArr[0].children[0]
        icon.classList.toggle('fa-volume-xmark')
        icon.classList.toggle('fa-volume-high')
      })
      break
      
    case 'libras_btn':  //libras btn
      const vwBtn = document.querySelector('[vw-access-button]')

      elemClassArr[0].addEventListener('click', (e) => {
        const vlInterface = document.querySelector('[vw]')
        
        if(!gameData.isScreenReaderActive)
        { 
          elemClassArr[0].classList.add('active')
          accessibleContainer.classList.add('active')

          if(!gameData.isLibrasActive)
          {
            gameData.isLibrasActive = true

            if(gameData.intro.isActive){ // COMPORTAMENTO DO LABEL E DO INPUT NO FORMULARIO DA INTRODUÇÃO
              gameData.intro.changeToAccessibility()
            }

            setTimeout(() =>{   // tempo que demora para a transição do container pai
              vlInterface.style.display = "block"
              vlInterface.style.opacity = "1"

              vwBtn.click();
                                              // PENSAR SOBRE ISSO
              setTimeout(() => {
                const closeVl = document.querySelector('.vpw-header-btn-close')
                if(closeVl)
                {
                  closeVl.addEventListener('click', () => {
                    vlInterface.style.display = "none !important"
                    vlInterface.style.opacity = "0"

                    gameData.isLibrasActive = false
                    elemClassArr[0].classList.remove('active')
                    accessibleContainer.classList.remove('active')

                    gameData.intro.changeToAccessibility() // toggle
                  
                    gameData.intro.gameDisplay.toggleDisplay()
                    gameData.intro.gameAcessibleDisplay.toggleDisplay()
                  })
                } 
                else 
                {
                  popUpMessage('O botão de fechar não foi carregado. Recarregue a pagina', null, 6000)
                }
              }, 8000)
            }, 1000)
            gameData.intro.gameDisplay.toggleDisplay()
            gameData.intro.gameAcessibleDisplay.toggleDisplay()
          }
          else
          {
            popUpMessage("Vlibras ja está ativado, Aperte no Botão de sair do Vlibras para fechar a ferramenta", null, null)
          }
        } 
        else 
        {
          popUpMessage("Infelizmente, não é possivel ativar 2 modos de acessibilidade ao mesmo tempo", null, 6000)
        }
      })
      break

    case 'screenReader_btn':
      const screenReader_btn = document.querySelector('.screenReader_btn')
      let auxEmpty = ''
      elemClassArr[0].addEventListener('click', () => {
        if(gameData.isLibrasActive){
          popUpMessage("Infelizmente, não é possivel ativar 2 modos de acessibilidade ao mesmo tempo", null, 6000)
          return
        }
        gameData.isScreenReaderActive = !gameData.isScreenReaderActive
        let status = gameData.isScreenReaderActive ? 'ativado' : 'desativado'
        
        readText(`O aprimoramento do leitor de tela foi ${status}.\n Para jogar no modo acessível para pessoas com deficiência visual recomendamos mantê-lo ativo.`)
        screenReader_btn.classList.toggle('active')
        handleOutline(auxEmpty)
        
        if(!gameData.isPaused && gameData.isScreenReaderActive && gameData.class == 'MemoryGame'){
          document.querySelector('#gameControls').style.display = 'none'
        }
      })
      handleOutline(auxEmpty)
      break

    case 'lightMode_btn':
      elemClassArr[0].addEventListener('click', () => {
        gameData.isDarkMode =  !gameData.isDarkMode
        
        elemClassArr[0].classList.toggle('active')
        elemClassArr[0].children[0].classList.toggle('fa-sun')
        elemClassArr[0].children[0].classList.toggle('fa-moon')

        gameData.intro.toggleLight()
        gameData.intro.gameDisplay.toggleLight()
        gameData.intro.gameAcessibleDisplay.toggleLight()
        if(gameData.score){
          gameData.score.toggleLight()
        } 
        
        if(!elemClassArr[0].classList.contains('active')){
          document.querySelector('body').style.backgroundColor = colors.body_color_light
          document.querySelector('#gameBoard').style.backgroundColor = colors.white
        }else{    
          document.querySelector('body').style.backgroundColor = colors.body_color_dark
          document.querySelector('#gameBoard').style.backgroundColor = colors.black
        }
        
        let lightingMode = elemClassArr[0].classList.contains('active') ? 'modo de iluminação escuro' : 'modo de iluminação claro'
        readText(`${lightingMode} ativado`)
      })
      break
      default:
        break
  }
});

function handleOutline(aux){
  if(gameData.isScreenReaderActive){
    document.addEventListener('focus', handlerFocus, true)
    document.addEventListener('blur', handleBlur, true)
  }else{
    document.addEventListener('focus', handleBlur, true)
  }

  function handlerFocus(event){
    aux = event.target.style.borderRadius

    event.target.style.outline = '5px solid #FFA500'
    event.target.style.outlineOffset = '5px'
    event.target.style.borderRadius = '0px'
  }

  function handleBlur(event){
    event.target.style.outline = 'none'
    event.target.style.outlineOffset = 'none'
    event.target.style.borderRadius = aux
  }
}
export{
  gameData
}
