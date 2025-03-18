import { colors } from "../../Constants/Colors.js";
import { gameData } from "../../Constants/gameData.js";
import { sightsData } from "../../Constants/sightsData.js";
import { App } from "./Game.js";
import { gainNode, audioContext } from "./../../Js/script.js"
import { audioDataArray } from "../../Constants/songsData.js";


let aux = 0


class Sights{
    constructor( location, currentAudios ){
        this.location = {name: location}
        this.element = document.querySelector(`.${this.location.name}`)

        this.currentAudios = currentAudios
        this.audioContext = audioContext
        this.gainNode = gainNode
        // this.audioContext = new (window.AudioContext || window.webkitAudioContext)() //rever propriedade do obj
        // this.gainNode = this.audioContext.createGain()

        this.initialControlsIndex = 1
        this.ctrFlag = false
        this.optFlag = false
        this.isPLaying = false
        this.ctrCurrentIdx = undefined
        this.optionsAmount = Object.keys(sightsData[this.location.name].samples).length

        this.choicesAmount = 5
        this.chosenAnimalsNameArr = []
        this.chosenContainerIdxArr = []

        this.handleOptionsNavigation = this.optionNavigation.bind(this)
        this.handleControlersNavigation = this.controlsNavigation.bind(this)
        this.handleControlersSelection =  this.controlersSelection.bind(this)
        this.handleKeyDown = (e) => {
            this.handleOptionsNavigation(e),this.handleControlersNavigation(e)
        }
        this.textToBeRead = document.getElementById('textToReader')
        this.start()

        document.title = `Mesa de som do ${capitalizeStr(this.location.name.split('_').join(' '))}`
        gameData.mainScene = capitalizeStr(this.location.name)
    } 

    start(){
        // console.clear()
        this.buildContainer() 
        this.setContainerElements() 

        gameData.isClickable =  true
        this.playAudio(sightsData[this.location.name].mainSampleName, sightsData[this.location.name].mainSampleVolume, true)
        
        // ATENÇÃO AQUI
        // if(gameData.isAccess).readText(sightsData[this.location.name].descri, null, true)
    }
    buildContainer(){
        const createAndSetMenuRows = (obj, father) => {

            let index = 0
            for(let sample in obj){
                let sgh_menu_row = this.createNewElement('span', 'sgh_menu_row')
                let sgh_menu_opt = this.createNewElement('li', 'sgh_menu_opt', `menuItem${index}`)
                let sgh_menu_opt_img = this.createNewElement('img', 'sgh_menu_opt_img', undefined, './../Assets/imgs/notasG4.gif')
                
                
                sgh_menu_opt.textContent = capitalizeStr(obj[sample].alt)
                sgh_menu_opt_img.setAttribute('alt', 'notas musicais')
                sgh_menu_opt_img.setAttribute('inert', '')
                
                sgh_menu_row.setAttribute('tabindex', index + 2)
                sgh_menu_row.setAttribute('index', index)
                sgh_menu_row.setAttribute('aria-dscribedby', `menuItem${index}`)
                sgh_menu_row.setAttribute('role', 'menuitem')
                sgh_menu_row.setAttribute('title', 'Clique para adicionar esse som na sua musica')
                index++
                
                sgh_menu_row.append(sgh_menu_opt, sgh_menu_opt_img)
                father.append(sgh_menu_row)
                                
                sgh_menu_opt.addEventListener('click', (e) => {
                    if(this.chosenAnimalsNameArr.length >= 5){
                        return
                        // haverá alguma função de popUp para informar que limite foi atingido
                    }
                })
            }
        }

        const sgh_bg = this.createNewElement('div', 'sgh_bg', 'sgh_bg')
        const preguica_left = this.createNewElement('img', 'preguica left', 'sgh_preg_r', './../Assets/imgs/preguica_pre.png')
        const preguica_right = this.createNewElement('img', 'preguica right', 'sgh_preg_l', './../Assets/imgs/preguica_pre.png')
       
        preguica_left.setAttribute('alt', 'Bicho preguiça ouvindo música')
        preguica_right.setAttribute('alt', 'Bicho preguiça ouvindo música')
        sgh_bg.append(preguica_left, preguica_right)
        this.element.appendChild(sgh_bg)

        const sgh_menu = this.createNewElement('div','sgh_menu container','sgh_menu')
        const setting_board_img = this.createNewElement('img','setting_board_img','setting_board_img', './../Assets/imgs/controlerG4.png')
        
        const sgh_menu_table = this.createNewElement('div','sgh_menu_list','sgh_menu_list')
       
        const setting_board_img_control = this.createNewElement('img','setting_board_img_control','setting_board_img_control', './../Assets/imgs/mesaG4.png')
        const setting_board_choices_control = this.createNewElement('div', 'sgh_choices_control', 'sgh_choices_control' )
        const choices_made_EL = this.createNewElement('span', 'sgh_choices_made', 'sgh_choices_made')
        const choices_amount_EL = this.createNewElement('span', 'sgh_choices_amount', 'sgh_choices_amount')

        const choicesMade = 0

        setting_board_img.setAttribute('alt', 'ilustração do menu')
        setting_board_img.setAttribute('tabindex', 1)
        setting_board_img.setAttribute('aria-label', 'Essa é sua mesa de som')
        setting_board_img_control.setAttribute('alt', 'Mixando audio')
        setting_board_choices_control.setAttribute('title', `Voce pode escolher ${this.choicesAmount - choicesMade} opções de um total de ${this.choicesAmount}`)

        const sgh_menu_body = this.createNewElement('ul','sgh_menu_body', 'sgh_menu_body' )
        const sgh_menu_body_wrapper = this.createNewElement('div','sgh_menu_body_wrapper')
        const sgh_menu_head = this.createNewElement('p', 'sgh_menu_head')
        const sgh_menu_head_wrapper = this.createNewElement('p', 'sgh_menu_head_wrapper')

        sgh_menu_head.textContent = `Escolha até ${this.choicesAmount} faixas para tocar`
        sgh_menu_head.setAttribute('tabindex', 1)

        sgh_menu_body_wrapper.appendChild(sgh_menu_body)
        sgh_menu_head_wrapper.appendChild(sgh_menu_head)
        sgh_menu_table.append(sgh_menu_head_wrapper, sgh_menu_body_wrapper)
        
        const samples = sightsData[this.location.name].samples
        
        createAndSetMenuRows(samples, sgh_menu_body)

        choices_made_EL.textContent = choicesMade
        choices_amount_EL.textContent = this.choicesAmount
        const bar = document.createTextNode('/')

        setting_board_choices_control.append(choices_made_EL, bar, choices_amount_EL)

        sgh_menu.append(setting_board_img, sgh_menu_table, setting_board_img_control, setting_board_choices_control)
        this.element.appendChild(sgh_menu)
        
        const sgh_sounds_board_wrapper = this.createNewElement('div','sgh_sounds_board_wrapper container',)
        const sgh_sounds_board = this.createNewElement('div','sgh_sounds_board')

        for(let i = 0; i < 20; i++){
            let sample_img_wrapper = this.createNewElement('div', 'sample_img_wrapper container')
        
            sgh_sounds_board.append(sample_img_wrapper)
        }
        
        const sgh_soundControl_wrapper = this.createNewElement('div', 'sgh_soundControl_wrapper container')
        const play_pause_btn = this.createNewElement('button', 'play_pause_btn', 'play_pause_btn')
        const play_pause_icon = this.createNewElement('i', 'fa-solid fa-play')
        const trash_btn = this.createNewElement('button', 'trash_btn', 'trash_btn')
        const trash_icon = this.createNewElement('i', 'fa-solid fa-trash')
        const home_btn = this.createNewElement('button', 'home_btn', 'home_btn')
        const home_icon = this.createNewElement('i', 'fa-solid fa-house')
        
        let initialControlsTabindex = this.optionsAmount + 2

        play_pause_btn.setAttribute('tabindex', initialControlsTabindex++)
        play_pause_btn.setAttribute('title', 'Clique para tocar a sua música')
        play_pause_btn.setAttribute('aria-label', 'tocar a sua musica')
        trash_btn.setAttribute('tabindex', initialControlsTabindex++)
        trash_btn.setAttribute('title', 'Clique para limpar escolhas feitas')
        trash_btn.setAttribute('aria-label', 'limpar escolhas feitas')
        home_btn.setAttribute('tabindex', initialControlsTabindex)
        home_btn.setAttribute('title', 'Clique para voltar para página inicial')
        home_btn.setAttribute('aria-label', 'voltar para página inicial')
        
        play_pause_btn.append(play_pause_icon)
        trash_btn.appendChild(trash_icon)
        home_btn.appendChild(home_icon)
        sgh_soundControl_wrapper.append(home_btn,play_pause_btn, trash_btn)
        sgh_sounds_board_wrapper.append(sgh_sounds_board, sgh_soundControl_wrapper)
        this.element.append(sgh_sounds_board_wrapper)
    }
    setContainerElements(){
        const background_URL = sightsData[this.location.name].bgUrl
        this.setBackground(background_URL)
        
        const sight = document 
        const play_pause_btn = sight.getElementById('play_pause_btn')
        const trash_btn = sight.getElementById('trash_btn')
        const home_btn = sight.getElementById('home_btn')
        const sgh_menu_row = sight.querySelectorAll('.sgh_menu_row')

        trash_btn.addEventListener('click', () => this.handleTrashToReset())
        play_pause_btn.addEventListener('click',(e) => this.handlePlayAndPauseBtn(e, this.chosenAnimalsNameArr))
        home_btn.addEventListener('click', (e) => this.callHomeScene(App))
        sight.addEventListener('keydown', this.handleKeyDown)
        sight.addEventListener('keyup', this.handleControlersSelection)
        if(sgh_menu_row){

            sgh_menu_row.forEach((row, i) => {
                row.addEventListener('focus', (e) => this.onTableElementFocus(e))
                row.addEventListener('click', (e) => this.chooseAnimal(e ,i))
            })
        }
        [play_pause_btn, trash_btn, home_btn].forEach(btn => {
            btn.addEventListener('focus', e => this.onControlsElementFocus )
        })
    }

    createNewElement(el, cl = '', id = '', src = ''){
        const element = document.createElement(el)

        if(cl) element.classList.add(...cl.split(' ')) 
        if(id)  element.setAttribute('id', id);
        if(src) element.setAttribute('src', src);

        return element
    }
    resetSampleBoard(){
        const activeSamples = document.querySelectorAll('.sample_img')
        if(!activeSamples) return

        activeSamples.forEach(sample => removeElementFromDOM(sample))
        
        function removeElementFromDOM(element){
            if(typeof element === 'string'){
                element = document.getElementById(element)
                
                if(!element){    
                    element = document.querySelector(element)
                } 
            }
            
            if(element && element.parentNode){
                element.parentNode.removeChild(element)
            } else {
                console.warn("Elemento não encontrado ou já foi removido do DOM.")
            }
        }
        this.chosenAnimalsNameArr = []
        this.chosenContainerIdxArr = []
        this.updateChoicesInterface()
    }
    playAudio(audioKey, volume = 1, loop = false){   
        let gainNode, src;

        if(audioKey in this.currentAudios){
            // Aqui, nos diz se o audio foi pausado ou é apenas um audio curto sendo tocado consecutivamente
            let pausedAt = this.currentAudios[audioKey].config.pausedAt || 0
            
            src = this.audioContext.createBufferSource() 
            gainNode = this.currentAudios[audioKey].config.gainNode
            
            const audioBuffer = gameAssets[audioKey] 
            src.buffer = audioBuffer 
            src.loop = loop

            let currentVolume = this.currentAudios[audioKey].config.volume || volume
            gainNode.gain.value = gameData.isMute ? 0 : currentVolume

            src.connect(gainNode)
            gainNode.connect(this.audioContext.destination)

            src.start(0, pausedAt)

            // Atualiza o estado do áudio dado a condição dele ser persistente (loop = true)
            if(this.currentAudios[audioKey].config.loop === true){
                this.currentAudios[audioKey] = {
                    config: {
                        startTime: 0,
                        gainNode: gainNode,
                        volume: currentVolume,
                        loop: loop
                    },
                    audio: src
                };
            }else if (this.currentAudios[audioKey].config.loop === false){
                this.currentAudios[audioKey] = {
                    config: {
                        startTime: 0,
                        gainNode: gainNode,
                        volume: currentVolume,
                    },
                    audio: src
                };
                setTimeout(() => {
                    delete this.currentAudios[audioKey]
                }, audioBuffer.duration * 1000)
            }
        } else {
            src = this.audioContext.createBufferSource()
            gainNode = this.audioContext.createGain()

            const audioBuffer = gameAssets[audioKey]
            src.buffer = audioBuffer
            src.loop = loop

            let audioData = sightsData[this.location.name]
            let audioVolume = audioData.mainSampleVolume || volume
            gainNode.gain.value = gameData.isMute ? 0 : audioVolume

            src.connect(gainNode)
            gainNode.connect(this.audioContext.destination)
            src.start(0, 0)

            if(loop === true){
                this.currentAudios[audioKey] = {
                    config: {
                        startTime: 0,
                        pausedAt: undefined,
                        gainNode: gainNode,
                        volume: audioVolume,
                        loop: loop
                    },
                    audio: src
                };
            }else{
                if(audioBuffer.duration < 3.5) return // não armazenar audios muito curtos

                this.currentAudios[audioKey] = {
                    config: {
                        startTime: 0,
                        pausedAt: undefined,
                        gainNode: gainNode,
                        volume: volume
                    },
                    audio: src
                };
                setTimeout(() => {
                    delete this.currentAudios[audioKey]
                }, audioBuffer.duration * 1000)
            }

            // Retorna o source e o gainNode para manipulação futura
            return { source: src, gainNode: gainNode };
        }
    }
    stopAllCurrentAudios(){
        for (let key in this.currentAudios){
            this.currentAudios[key].audio.stop()
            delete this.currentAudios[key]
        }
    }
    playAnimalSound(audioBuffer, animalSoundName, volume = 0.3, delay = 0, loop = true) {
        let src, gainNode;

        // Verifica se o áudio já está sendo reproduzido
        if (animalSoundName in this.currentAudios) {
            let pausedAt = this.currentAudios[animalSoundName].config.pausedAt || 0;
    
            src = this.audioContext.createBufferSource();
            // src = this.currentAudios[animalSoundName].audio
            gainNode = this.currentAudios[animalSoundName].config.gainNode;
    
            src.buffer = audioBuffer;
            src.loop = loop;
    
            // Ajusta o volume com base no mute e no volume passado como parâmetro
            let adjustedVolume = this.currentAudios[animalSoundName].config.adjustedVolume || volume;
            gainNode.gain.value = gameData.isMute ? 0 : adjustedVolume;
    
            src.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
    
            // Inicia a reprodução com o delay e o ponto de pausa
            src.start(delay, pausedAt);
    
            // Atualiza o estado do áudio
            this.currentAudios[animalSoundName] = {
                config: {
                    startTime: delay,
                    gainNode: gainNode,
                    volume: adjustedVolume
                },
                audio: src
            };
        } else {
            // Cria novos nós de áudio se o som não estiver sendo reproduzido
            src = this.audioContext.createBufferSource();
            gainNode = this.audioContext.createGain();
    
            src.buffer = audioBuffer;
            src.loop = loop;
    
            // Ajusta o volume com base no mute e no volume passado como parâmetro
            let adjustedVolume = gameData.isMute ? 0 : volume;
            gainNode.gain.value = adjustedVolume;
    
            src.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
    
            // Inicia a reprodução com o delay
            src.start(delay, 0);
    
            // Armazena o estado do áudio
            this.currentAudios[animalSoundName] = {
                config: {
                    startTime: delay,
                    pausedAt: undefined,
                    gainNode: gainNode,
                    volume: adjustedVolume
                },
                audio: src
            };
        }
    
        // Retorna o source e o gainNode para manipulação futura
        return { source: src, gainNode: gainNode };
    }
    stopAnimalSound(soundName){
        if(soundName in this.currentAudios){
            let pausedAt = this.currentAudios[soundName].audio.context.currentTime
            
            this.currentAudios[soundName].audio.stop()
            this.currentAudios[soundName].config.pausedAt = pausedAt
            this.isPLaying = false
        } else {
            throw new Error('It is not possible to stop an inexisted audio')
        }

    }
    resetContainerToNewScene(classStr){
        let classNm = classStr.split(' ').map(str => capitalize(str)).join('_')
        const mainC = document.getElementById('main')
        mainC.innerHTML = " "
        classNm += ' container'
        mainC.className = classNm
        
        new App(this, classNm)

        function capitalize(str) {
            if (!str) return "";
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
    disposeAudioContext(){
        if(this.audioContext){
            this.audioContext.close()
            this.audioContext = null
        }
    }
    setBackground(url) {
        this.element.style.backgroundImage = `url(${url})`
    }
    handlePlayAndPauseBtn(e, arry) {
            if (arry.length === 0){
                this.popUpMessage("Escolha pelo menos uma faixa para tocar!")
                return;
            } 

            const icon = play_pause_btn.children[0];
            const isBtnOnPlayingMode = icon.classList.contains('fa-play');
        
            icon.classList.toggle('fa-play', !isBtnOnPlayingMode);
            icon.classList.toggle('fa-pause', isBtnOnPlayingMode);
        
            play_pause_btn.style.color = isBtnOnPlayingMode ? colors.redDeep_main : colors.blue_main;
            play_pause_btn.style.borderColor = isBtnOnPlayingMode ? colors.redDeep_main : colors.blue_main;
        
            if (isBtnOnPlayingMode) {
                this.chosenAnimalsNameArr.forEach(obj => this.playAnimalSound(gameAssets[obj.slot], obj.slot, obj.volume, obj.delay, obj.loop));
                this.isPLaying = true
            } else {
                this.chosenAnimalsNameArr.forEach(obj => this.stopAnimalSound(obj.slot));
            }
    }
    handleTrashToReset(e) {
        if(this.isPLaying){
            this.handlePlayAndPauseBtn(e, this.chosenAnimalsNameArr)
            this.chosenAnimalsNameArr.forEach(obj => {
                this.stopAnimalSound(obj.slot)
            })
        }
        this.resetSampleBoard()
        this.resetSelectedOptions()
    }
    controlersSelection(e) {
        e.preventDefault( )
        const ctrWrapper = document.querySelector('.sgh_soundControl_wrapper')
        let key = e.key
        let isThereOptselected = document.querySelector('.rowOnFocus')
        let isChoicesFilled = this.chosenAnimalsNameArr.length >= 5
        switch(key){
            case 'Enter':
                e.preventDefault( )
                if(this.optFlag){
                    if(isThereOptselected && !isChoicesFilled){
                        isThereOptselected.click()
                    }
                    if(isChoicesFilled) {
                        this.popUpMessage("Numero maximo de escolhas atingido")
                    }
                } else if(this.ctrFlag){
                    e.preventDefault()

                    let activeElmIsIn;
                    ctrWrapper ? activeElmIsIn = ctrWrapper.contains(document.activeElement) : true
                    if(activeElmIsIn) document.activeElement.click()

                    aux++
                }
                break;
            
            case 'Backspace':
                this.handleTrashToReset()
                break;

            case 'Escape':
                this.callHomeScene(App)
                break
            default:
                break;
        }
    }
    resetCTRFlag()  {
        this.ctrFlag = false;
    }
    optionNavigation(e) {

        let key = e.key
        const optionOnFocus = document.querySelector('.rowOnFocus')
        const optionsAmount = document.querySelectorAll('.sgh_menu_opt').length

        const initialIndex = 0
        let lastIndex = optionsAmount - 1
        let lastOpt, lastOptIdx;

        if(key === 'ArrowDown' || key === 'ArrowUp'){
            this.resetCTRFlag()
            this.optFlag = true

            switch(key){
                case 'ArrowDown':
                
                e.preventDefault()
                
                if(optionOnFocus){
                        lastOptIdx = Number(optionOnFocus.getAttribute('index'))

                        let nextIdx = (lastOptIdx + 1 + optionsAmount) % optionsAmount

                        let nextOpt = document.querySelector(`.sgh_menu_row[index="${nextIdx}"]`)
                        if(nextOpt) nextOpt.focus()

                    } else {
                        
                        let firstOpt = document.querySelector(`.sgh_menu_row[index="${initialIndex}"]`)
                        if(firstOpt){
                            firstOpt.focus()
                        } else {
                            console.warn("Primeiro elemento NÃO ENCONTRADO !")
                        }
                    }
                break;

                case 'ArrowUp':

                    e.preventDefault()

                    if(optionOnFocus){
                        lastOptIdx = Number(optionOnFocus.getAttribute('index'))
                        let prevIdx = (lastOptIdx - 1 + optionsAmount) % optionsAmount

                        let prevOpt = document.querySelector(`.sgh_menu_row[index="${prevIdx}"]`)
                        if(prevOpt) prevOpt.focus()
                   
                    } else {
                        lastOpt = document.querySelector(`.sgh_menu_row[index="${lastIndex}"]`)
                        if(lastOpt) lastOpt.focus()
                    }
                break;
            }
        } 
    }
    controlsNavigation(e) {
        let key = e.key

        // evita erros na reprodução dos audios selecionados
        if(key === 'Enter'){
            e.preventDefault()
        }

        if(key !== 'ArrowRight' && key !== 'ArrowLeft') return
        if(key === 'ArrowRight' || key !== 'ArrowLeft') this.optFlag = false

        const controlsAmount = 3
        let nextIdx
        const soundControls_wrapper = document.querySelector('.sgh_soundControl_wrapper')
        
        if(!soundControls_wrapper){
            console.warn(`O elemento '.sgh_soundControl_wrapper' não foi encontrado`)
            return
        }
        
        if(!this.ctrFlag){
            soundControls_wrapper.children[this.initialControlsIndex].focus()
            this.ctrFlag = true
            this.ctrCurrentIdx = this.initialControlsIndex
            return
        }

        switch(key){
            case "ArrowRight":
                nextIdx = (this.ctrCurrentIdx + 1 + controlsAmount) % controlsAmount
                soundControls_wrapper.children[nextIdx].focus()
                this.ctrCurrentIdx = nextIdx
                break;
                
            case "ArrowLeft":

                document.activeElement.blur()

                nextIdx = (this.ctrCurrentIdx - 1 + controlsAmount) % controlsAmount
                soundControls_wrapper.children[nextIdx].focus()
                this.ctrCurrentIdx = nextIdx
                break;
        }
    }
    onTableElementFocus(e) {
        const rowOnFocus = document.querySelector('.rowOnFocus')
        let isArrayFilled  = this.chosenAnimalsNameArr.length >= 5

        if(rowOnFocus){
            rowOnFocus.classList.remove('rowOnFocus')
        } 
        e.target.classList.add('rowOnFocus')
        this.ctrFlag = false
        this.optFlag = true
    }
    onControlsElementFocus(e){
        this.ctrFlag = true
        this.optFlag = false
    }
    chooseAnimal(e){
        let isChoicesFilled = this.chosenAnimalsNameArr.length >= 5
        
        const samples = sightsData[this.location.name].samples
        const animalName = e.target.textContent.split(' ').map(str => str.toLocaleLowerCase()).join(' ');
        const animalObjArray = Object.values(samples)
        
        let animalObj = animalObjArray.find((obj) => obj.alt === animalName)

        if(this.chosenAnimalsNameArr.some(item => item.slot === animalObj.soundName)){
            this.removeSpecificAnimal(animalObj, e)
            return
        }
        
        if(isChoicesFilled){
            this.popUpMessage("O seu número máximo de escolhas foi atingido.", '#play_pause_btn', 4000)
            return
        }

        e.target.classList.add('selected')

        const samplesWrapper = document.querySelectorAll('.sample_img_wrapper')
        let {delay, volume, loop} = animalObj

        let img = this.createNewElement('img', 'sample_img', `${animalObj.objName}_sample`, animalObj.img_src)
        img.setAttribute('alt', animalObj.alt)
        let wrapperIdx = this.randomNumberExcluding(this.chosenContainerIdxArr)
        let slot = samplesWrapper[wrapperIdx]
        slot.innerHTML = ''
        slot.appendChild(img)
        this.chosenAnimalsNameArr.push({
            slot: animalObj.soundName,
            delay : delay,
            volume: volume,
            loop: loop,
            wrapperIdx: wrapperIdx
        })
        this.updateChoicesInterface()

        if(gameData.isAccess){
            this.textToBeRead.textContent = `O som;${animalName} foi adicionado a sua música como ${numeroParaOrdinal(this.chosenAnimalsNameArr.length)} som`
        }

        e.target.classList.add('rowOnFocus')
        function numeroParaOrdinal(numero) {
            const ordinais = {
                1: "primeiro",
                2: "segundo",
                3: "terceiro",
                4: "quarto",
                5: "quinto",
                6: "sexto",
                7: "sétimo",
                8: "oitavo",
                9: "nono",
                10: "décimo",
                11: "décimo primeiro",
                12: "décimo segundo",
                13: "décimo terceiro",
                14: "décimo quarto",
                15: "décimo quinto",
                16: "décimo sexto",
                17: "décimo sétimo",
                18: "décimo oitavo",
                19: "décimo nono",
                20: "vigésimo",
                30: "trigésimo",
                40: "quadragésimo",
                50: "quinquagésimo",
                60: "sexagésimo",
                70: "septuagésimo",
                80: "octogésimo",
                90: "nonagésimo",
                100: "centésimo"
            };
        
            if (ordinais[numero]) {
                return ordinais[numero];
            }
        
            if (numero > 20 && numero < 100) {
                let dezena = Math.floor(numero / 10) * 10;
                let unidade = numero % 10;
                return `${ordinais[dezena]} ${ordinais[unidade]}`;
            }
        
            return `${numero}º`; // Caso não esteja na lista
        }
    }
    removeSpecificAnimal(animalObj, clickEvent ){
        let chosenAnimalToRemove = document.querySelector(`#${animalObj.objName}_sample`)
        let animalName_idx = this.chosenAnimalsNameArr.findIndex(item => item.slot === animalObj.soundName)
        let animalWrapper_idx = this.chosenContainerIdxArr.findIndex(idx => idx == this.chosenAnimalsNameArr[animalName_idx].wrapperIdx)
        
        chosenAnimalToRemove.remove()
        if(animalName_idx !== -1){
            this.chosenAnimalsNameArr.splice(animalName_idx, 1)
        }
        if(animalWrapper_idx !== -1){
            this.chosenContainerIdxArr.splice(animalWrapper_idx, 1)
        }
        if(gameData.isAccess){
            this.textToBeRead.textContent = `O som;${animalObj.objName} foi removido da sua música. Restam ${this.choicesAmount - this.chosenAnimalsNameArr.length} escolhas disponíveis`
        }

        clickEvent.target.classList.remove('selected')
        this.updateChoicesInterface()

    }
    updateChoicesInterface(){
        const choicesMadeEl = document.querySelector('.sgh_choices_made')
        const sgh_choices_control = document.getElementById('sgh_choices_control')

        let choicesMadeAmount = this.chosenAnimalsNameArr.length
        if(choicesMadeEl && sgh_choices_control){
            choicesMadeEl.textContent = choicesMadeAmount
            choicesMadeEl.style.color = choicesMadeAmount >= 5 ? colors.red_negative : colors.white 
            sgh_choices_control.setAttribute('title', `Voce pode escolher ${this.choicesAmount - choicesMadeAmount} opções de um total de ${this.choicesAmount}`)
            sgh_choices_control.setAttribute('aria-label', `Voce pode escolher ${this.choicesAmount - choicesMadeAmount} opções de um total de ${this.choicesAmount}`)

        }
    }
    randomNumberExcluding(list) {
        let randomNumber
        do {
           randomNumber =  Math.floor(Math.random() * 20) + 1
        } while (randomNumber === 5 || randomNumber === 10 || list.includes(randomNumber - 1))
        
        list.push(randomNumber - 1)
        return randomNumber - 1
    }
    removeEventsRegistered(){
        const sight = document 
        const play_pause_btn = sight.getElementById('play_pause_btn')
        const trash_btn = sight.getElementById('trash_btn')
        const home_btn = sight.getElementById('home_btn')
        const sgh_menu_row = sight.querySelectorAll('.sgh_menu_row')

        trash_btn.removeEventListener('click', () => this.handleTrashToReset())
        play_pause_btn.removeEventListener('click',(e) => this.handlePlayAndPauseBtn(e, this.chosenAnimalsNameArr))
        home_btn.removeEventListener('click', (e) => this.callHomeScene(App))
        sight.removeEventListener('keydown', this.handleKeyDown)
        sight.removeEventListener('keyup', this.handleControlersSelection)
        if(sgh_menu_row){
            sgh_menu_row.forEach((row, i) => {
                row.removeEventListener('focus', (e) => this.onTableElementFocus(e ,i))
                row.removeEventListener('click', (e) => this.chooseAnimal(e ,i))
            })
        }
    }
    popUpMessage(message, nxtElem, delay = 2500, isVisible = true, isDurable = true, chaining = false){   // EXIBE MENSAGEM NO POPUP VISÍVEL
        const popUp = document.getElementById('popUpMessage')
        const popupText = document.querySelector('.popupText')
        const nextFocusElement = document.querySelector(nxtElem)

        let display = popUp.style.display
        
        console.log(gameData.isAccess)
        if(gameData.isAccess){
            isDurable = false
        }

        popUp?.classList.toggle('animated', !popUp.classList.contains('animated'))

        if(display != 'flex')   popUp.style.display = 'flex'
        
        //o torna visível na interface e nas ferramentas de accessbilidade
        popUp.removeAttribute('hidden') // por isso está fora do if 
        if(isVisible){
            popUp.style.opacity = 1
        }
        
        if(!chaining)
            popupText.textContent = ''

        popupText.textContent    = message
        
        console.log(gameData.isAccess)
        if(gameData.isAccess){
            popupText.setAttribute('tabindex', 1)
            popupText.focus()
        }
        
        if(!isDurable)
            setTimeout(() => {
                popUp.style.opacity = 0
                popUp.style.display = 'none'
                popupText.removeAttribute('tabindex')
            }, 5000)
        
        if(nxtElem && delay)
            setTimeout(() => nextFocusElement.focus(), delay + 100)
        
        
    }
    callHomeScene(homeScene){
        this.removeEventsRegistered()
        this.stopAllCurrentAudios()
        this.element.remove()

        new homeScene(true)
    }
    resetSelectedOptions(){
        const selectedOptions = document.querySelectorAll('.sgh_menu_row.selected')
        selectedOptions.forEach(option => {
            option.classList.remove('selected')
        })
    }
}

function capitalizeStr(str) {
    if(!str || typeof str !== 'string') return
    return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase()
}
export{
    Sights
}

    // playGameAudio(audioKey, volume = 1.0, loop = false, delay = 0){  
    //     let gainNode, src;

    //     // Verifica se o áudio já está sendo reproduzido
    //     if(audioKey in currentAudios){
    //         let pausedAt = currentAudios[audioKey].config.pausedAt || 0
            
    //         // src = this.audioContext.createBufferSource()
    //         src = currentAudios[audioKey].audio // BufferSource
    //         gainNode = currentAudios[audioKey].config.gainNode
            
    //         const audioBuffer = gameAssets[audioKey] 
    //         src.buffer = audioBuffer 
    //         src.loop = loop

    //         // Ajusta o volume com base no mute e no volume armazenado
    //         let currentVolume = currentAudios[audioKey].config.volume || volume
    //         gainNode.gain.value = gameData.isMute ? 0 : currentVolume

    //         src.connect(gainNode)
    //         gainNode.connect(this.audioContext.destination)

    //         // Inicia a reprodução com o delay e o ponto de pausa
    //         src.start(delay, pausedAt)

    //         // Atualiza o estado do áudio dado a condição dele ser persistente (loop = true)
    //         if(this.currentAudios.config.loop === true){
    //             //loop = true => audio persiste
    //             this.currentAudios[audioKey] = {
    //                 config: {
    //                     startTime: delay,
    //                     gainNode: gainNode,
    //                     volume: volume,
    //                     loop: loop
    //                 },
    //                 audio: src
    //             };
    //         }else if (this.currentAudios[audioKey].config.loop === false){
    //             this.currentAudios[audioKey] = {
    //                 config: {
    //                     startTime: delay,
    //                     gainNode: gainNode,
    //                     volume: volume,
    //                 },
    //                 audio: src
    //             };
    //             setInterval(() => {
    //                 delete this.currentAudios[audioKey]
    //             }, audioBuffer.duration * 1000)
    //         }

    //     } else {
    //         src = this.audioContext.createBufferSource()
    //         gainNode = this.audioContext.createGain()

    //         const audioBuffer = gameAssets[audioKey]
    //         src.buffer = audioBuffer
    //         src.loop = loop

    //         gainNode.gain.value = gameData.isMute ? 0 : volume

    //         src.connect(gainNode)
    //         gainNode.connect(this.audioContext.destination)

    //         src.start(delay, 0)
    //         if(loop === true){
    //             this.currentAudios[audioKey] = {
    //                 config: {
    //                     startTime: delay,
    //                     pausedAt: undefined,
    //                     gainNode: gainNode,
    //                     volume: volume,
    //                     loop: loop
    //                 },
    //                 audio: src
    //             };
    //         }else{
    //             this.currentAudios[audioKey] = {
    //                 config: {
    //                     startTime: delay,
    //                     pausedAt: undefined,
    //                     gainNode: gainNode,
    //                     volume: volume
    //                 },
    //                 audio: src
    //             };
    //             setInterval(() => {
    //                 delete this.currentAudios[audioKey]
    //             }, audioBuffer.duration * 1000)
    //         }

    //         // Retorna o source e o gainNode para manipulação futura
    //         return { source: src, gainNode: gainNode };
    //     }
    // }