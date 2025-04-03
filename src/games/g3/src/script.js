import { Preloader } from './Scenes/Preload.js';
import { getDeviceSize } from './js/getDeviceSize.js';
import { colors } from './Consts/Colors.js';
import { gameData } from './Consts/gameData.js';
import { loadEnviromentVariables } from './Consts/Values.js';

window.gameData = gameData // RETIRAR DEPOIS arquivo em outro módulo é melhor

loadEnviromentVariables()
  .then(() => new Preloader())


setLightModeSlider(updateGame3Colors)
updateDarkModeSwitch()

const accessibleContainer = document.querySelector('.gameAccessibleContainer')
const mainContainers      = document.querySelectorAll('.mainContainer')

let [containerWidth, containerHeight] = getDeviceSize()

mainContainers.forEach(container => {
  container.style.width = `${containerHeight}px`
  container.style.height = `${containerHeight}px`  
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

const btnsAndClss = []  //matriz bidimencional de botões e classes                                                          
btns.forEach((elem, i) => btnsAndClss[i] = [elem, elem.className.split(' ')[1]])// armazena para cada botão, o referido botão e suas respectivas 2°classes
btnsAndClss.forEach( elemClassArr => { // configura os botões baseado em suas classes
  let auxContrl = ''

  // adiciona acessibilidade em libras no evento de "mouseover" aos botões armazenados no array "btnsAndClss"
  elemClassArr[0].addEventListener('mouseover', (e) => {
    if(auxContrl === e.target) return
    if(gameData.isLibrasActive){
      gameData.intro.gameAcessibleDisplay.readWithAccessibility(`${e.target.title}`)
      auxContrl = e.target
    }
    setTimeout(() => auxContrl =  '', 1000)
  })

  // configura o comportamento do botão mediante sua classe
  switch(elemClassArr[1]){
    
    case 'mute_btn':
      elemClassArr[0].addEventListener('click', () => {
        gameData.isMute = !gameData.isMute

        if(gameData.isScreenReaderActive){
          let soundState = elemClassArr[0].classList.contains('active') ? 'ativado' : 'desativado'
          readText(`O Som foi ${soundState} `)
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
function updateDarkModeSwitch() {
  const inputSlider = document.querySelector('input#slider')
  gameData.isDarkMode ? inputSlider.setAttribute('checked', '') : inputSlider.removeAttribute('checked')
}
function setLightModeSlider(updateGameColor){
  const slider = document.querySelector('input#slider')

  slider.addEventListener('click', () => {
      let root = document.documentElement

      if(slider.checked){
        gameData.isDarkMode = true
        localStorage.setItem('isDarkMode', JSON.stringify(gameData.isDarkMode))
        
        root.style.setProperty('--letter--', colors.letter_l)
        if(updateGameColor) updateGameColor()
      }else{
        gameData.isDarkMode = false
        localStorage.setItem('isDarkMode', JSON.stringify(gameData.isDarkMode))
        
        root.style.setProperty('--letter--', colors.letter_d)
        if(updateGameColor) updateGameColor()
      }
  })
}
function updateGame3Colors(){

  const rootStyle = document.documentElement.style

  if(gameData.isDarkMode){
    rootStyle.setProperty("--bg--", colors.body_color_dark )
    rootStyle.setProperty("--form-bg--", colors.transparent_a23 )
    rootStyle.setProperty("--form-boxShadow--", `0 0 .5em ${colors.blue_serius_ac7}`)
    rootStyle.setProperty("--form-border", `1px solid ${colors.formBorder_dark}`)
    rootStyle.setProperty("--formContainer-bg--", colors.black)
    rootStyle.setProperty("--gameDisplay-bg--", colors.black_a87)
    rootStyle.setProperty("--gameDisplay-border", `1px solid ${colors.blue_baby}`)
    rootStyle.setProperty("--line-borderBottom", `1px solid ${colors.white_ice_a9f}` )
    rootStyle.setProperty("--gameDisplayHeader-fontWeight", '200')
    rootStyle.setProperty("--gameDisplayHeader-color", colors.body_color_light)
    rootStyle.setProperty("--clock-border", `2px solid ${colors.white_a56}`)
    rootStyle.setProperty("--clock-bg", colors.body_color_dark)
    rootStyle.setProperty("--clock-color", colors.white_ice_a9f)
    rootStyle.setProperty("--headerBar-color", colors.white_ice);
    rootStyle.setProperty("--accessContainer-bg", colors.transparent_a10);
    rootStyle.setProperty("--accessContainer-border", `1px solid ${colors.blue_baby}`);
    rootStyle.setProperty("--scoreBody-bg", colors.black);
    rootStyle.setProperty('--score-bg', colors.score_bg_dark)
    rootStyle.setProperty('--gameBoard-bg', colors.black)
    rootStyle.setProperty('--scoreInfo-color', colors.white)
    rootStyle.setProperty('--scoreBody-border', `1px solid ${colors.white_a56}`)
  } else {
    rootStyle.setProperty("--bg--", colors.body_color_light )
    rootStyle.setProperty("--form-bg--", colors.blue_baby )
    rootStyle.setProperty("--form-boxShadow--", 'none')
    rootStyle.setProperty("--form-border", `2px solid ${colors.blue_dark_theme}`)
    rootStyle.setProperty("--formContainer-bg--", colors.white)
    rootStyle.setProperty("--gameDisplay-bg--", colors.white)
    rootStyle.setProperty("--gameDisplay-border", `3px solid ${colors.blue_baby}`)
    rootStyle.setProperty("--line-borderBottom", `1px solid ${colors.blue_dark_theme}` )
    rootStyle.setProperty("--gameDisplayHeader-fontWeight", '400')
    rootStyle.setProperty("--gameDisplayHeader-color", colors.header_light_color)
    rootStyle.setProperty("--clock-border", `2px solid ${colors.blue_dark_theme}`)
    rootStyle.setProperty("--clock-bg", colors.blue_baby)
    rootStyle.setProperty("--clock-color", colors.header_light_color)
    rootStyle.setProperty("--headerBar-color", colors.header_light_color);
    rootStyle.setProperty("--accessContainer-bg", colors.white);
    rootStyle.setProperty("--accessContainer-border", `3px solid ${colors.blue_baby}`);
    rootStyle.setProperty("--scoreBody-bg", colors.light_blue_9c);
    rootStyle.setProperty('--score-bg', colors.white)
    rootStyle.setProperty('--gameBoard-bg', colors.white)
    rootStyle.setProperty('--scoreInfo-color', colors.scoreinfo_light)
    rootStyle.setProperty('--scoreBody-border', `1px solid ${colors.blue_baby_a80}`)
  }
}

export{
  gameData,
  updateGame3Colors
}
