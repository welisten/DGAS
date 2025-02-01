import { colors } from "../../Constants/Colors.js";
import { gameData } from "../../Constants/gameData.js";
import { sightsData } from "../../Constants/sightsData.js";


class Sights{
    constructor(game, location ){
        this.game = game
        this.location = {name: location.split(' ')[0]}
        this.element = document.querySelector(`.${this.location.name}`)

        this.currentAudio = {config:{startTime: 0, pausedAt: 0}}
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)() //rever propriedade do obj
        this.gainNode = this.audioContext.createGain()

        this.chosenAnimalsArr = Array(0)

        this.start()
        
        const captalizeStr = (str) => {
            if(!str || typeof str !== 'string') return
            return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase()
        }

        document.title = this.captalizeStr(this.location.name.split('_').join(' '))
        gameData.mainScene = this.captalizeStr(this.location.main)
    }   
    start(){
        this.buildContainer() 
        this.setContainerElements() 

        gameData.isClickable =  true
        this.playAudio(gameAssets[sightsData[this.location.name].mainSampleName], .05, true)
        
        // ATENÇÃO AQUI
        if(gameData.isAccess) this.game.readText(sightsData[this.location.name].descri, null, true)
    }
    buildContainer(){
        this.element.style.backgroundImage = `url(${sightsData[this.location.name].bgUrl})`
        const createNewElement = (el, cl = undefined, id = undefined, src = undefined) => {
            const element = document.createElement(el)

            if(cl){
                let clss = cl.split(' ')
                for(let i = 0; i < clss.length; i++){
                    element.classList.add(clss[i])
                }
            } 
            if(id)  element.setAttribute('id', id);
            if(src) element.setAttribute('src', src);

            return element
        }
        const createMenuRows = (obj, father) => {

            const animalArray = Object.values(obj)
            
            for(let sample in obj){
                let sgh_menu_row = createNewElement('tr', 'sgh_menu_row')
                let sgh_menu_data = createNewElement('td', 'sgh_menu_data')
                let sgh_menu_opt = createNewElement('p', 'sgh_menu_opt')
                let sgh_menu_opt_img = createNewElement('img', 'sgh_menu_opt_img', undefined, obj[sample].img_src)
                

                sgh_menu_opt.textContent = this.captalizeStr(obj[sample].alt)
                sgh_menu_opt_img.setAttribute('alt', 'notas musicais')

                sgh_menu_data.append(sgh_menu_opt, sgh_menu_opt_img)
                sgh_menu_row.appendChild(sgh_menu_data)
                father.append(sgh_menu_row)


                sgh_menu_opt.addEventListener('click', (e) => {
                    if(this.chosenAnimalsArr.length >= 5 ){
                        return
                    }
                    const animalSoundName = e.target.textContent.split(' ').map(str => str.toLocaleLowerCase()).join(' ');
                    const samplesWrapper = document.querySelectorAll('.sample_img_wrapper')

                    let animalObj = animalArray.find((obj) => obj.alt === animalSoundName)
                    
                    let img = createNewElement('img', 'sample_img', undefined, animalObj.img_src)
                    img.setAttribute('alt', animalObj.alt)

                    let slot = samplesWrapper[randomNumberExcluding() - 1]
                    slot.innerHTML = ''
                    slot.appendChild(img)
                    this.chosenAnimalsArr.push({slot: slot})

                    console.log(this.chosenAnimalsArr)
                })

                function randomNumberExcluding() {
                    let randomNumber
                    do {
                       randomNumber =  Math.floor(Math.random() * 25) + 1
                    } while (randomNumber === 5 || randomNumber === 10)
                    return randomNumber
                }
            }
        }

        const sgh_bg = createNewElement('div', 'sgh_bg', 'sgh_bg')
        const preguica_left = createNewElement('img', 'preguica left', 'sgh_preg_r', './../Assets/imgs/preguica_pre.png')
        const preguica_right = createNewElement('img', 'preguica right', 'sgh_preg_l', './../Assets/imgs/preguica_pre.png')
       
        preguica_left.setAttribute('alt', 'Bicho preguiça ouvindo música')
        preguica_right.setAttribute('alt', 'Bicho preguiça ouvindo música')
        sgh_bg.append(preguica_left, preguica_right)
        this.element.appendChild(sgh_bg)

        const sgh_menu = createNewElement('div','sgh_menu container','sgh_menu')
        const setting_board_img = createNewElement('img','setting_board_img','setting_board_img', './../Assets/imgs/block_ex.png')
        const sgh_menu_table = createNewElement('table','sgh_menu_table','sgh_menu_table')
        const setting_board_img_control = createNewElement('img','setting_board_img_control','setting_board_img_control', './../Assets/imgs/block_ex.png')
        
        setting_board_img.setAttribute('alt', 'ilustração do menu')
        setting_board_img_control.setAttribute('alt', 'Mixando audio')

        const sgh_menu_body = createNewElement('tbody','sgh_menu_body')
        sgh_menu_table.appendChild(sgh_menu_body)
        
        let samples = sightsData[this.location.name].samples
        createMenuRows(samples, sgh_menu_body)
        
        sgh_menu.append(setting_board_img, sgh_menu_table, setting_board_img_control)
        this.element.appendChild(sgh_menu)
        
        const sgh_sounds_board_wrapper = createNewElement('div','sgh_sounds_board_wrapper container',)
        const sgh_sounds_board = createNewElement('div','sgh_sounds_board')

        for(let i = 0; i < 25; i++){
            let sample_img_wrapper = createNewElement('div', 'sample_img_wrapper container')
        
            sgh_sounds_board.append(sample_img_wrapper)
        }
        
        const sgh_soundControl_wrapper = createNewElement('div', 'sgh_soundControl_wrapper container')
        const play_pause_btn = createNewElement('button', 'play_pause_btn', 'play_pause_btn')
        const play_pause_icon = createNewElement('i', 'fa-solid fa-play')
        
        play_pause_btn.append(play_pause_icon)
        sgh_soundControl_wrapper.append(play_pause_btn)
        sgh_sounds_board_wrapper.append(sgh_sounds_board, sgh_soundControl_wrapper)
        this.element.append(sgh_sounds_board_wrapper)
        
        
        
        
        // const = createNewElement('','','')
    }
    setContainerElements(){
        const play_pause_btn = document.querySelector('#play_pause_btn')

        play_pause_btn.addEventListener('click', (e) => {
            const icon = play_pause_btn.children[0]
            let lastIconClass = icon.className.split(' ')[1]
            let nextIconClass = ''

            if(lastIconClass === 'fa-play'){
                nextIconClass = 'fa-pause'
                play_pause_btn.style.color = colors.redDeep_main
                play_pause_btn.style.borderColor = colors.redDeep_main
            }else {
                nextIconClass = 'fa-play'
                play_pause_btn.style.color = colors.blue_main
                play_pause_btn.style.borderColor = colors.blue_main

            }
            play_pause_btn.children[0].className = `fa-solid ${nextIconClass}`

            
            // function play
            // function pause

        })
    }
  playAudio(audioBuffer, volume = 1.0, loop = false){   
            const src = this.audioContext.createBufferSource()
            src.buffer = audioBuffer
            src.loop = loop
    
            let newVolume = gameData.isMute === true ? 0 : volume
            this.gainNode.gain.value = newVolume 
            src.connect(this.gainNode)
            this.gainNode.connect(this.audioContext.destination)
            if(loop !== true){
                src.start()
    
            } else {
                src.start(0, this.currentAudio.config.startTime)
                this.currentAudio.audio = src
            }
    }
    stopCurrentAudio(){
        if(this.currentAudio.audio) {
            this.currentAudio.config.startTime = this.audioContext.currentTime
            this.currentAudio.audio.stop()
            this.currentAudio.audio = null
        }
    }
    captalizeStr = (str) => {
        if(!str || typeof str !== 'string') return
        return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase()
    }
    // playAnimalSound(audioBuffer, animalSoundName){
    //     let src, gainNode;
        
    //     if( animalSoundName in this.game.currentAudio){
    //         let pausedAt = this.game.currentAudio[animalSoundName].config.pausedAt || 0

    //         src = this.game.audioContext.createBufferSource()
    //         gainNode = this.game.currentAudio[animalSoundName].config.gainNode
            
    //         src.buffer = audioBuffer
    //         src.loop = true
    
    //         let vl = gameData.isMute === true ? 0 : 1
    //         gainNode.gain.value = vl
            
    //         src.connect(gainNode)
    //         gainNode.connect(this.game.audioContext.destination)
            
    //         src.start(0, pausedAt)
    //         this.game.currentAudio[animalSoundName] = {config:{startTime: 0, pausedAt: undefined, gainNode: gainNode, volume: vl}}
    //         this.game.currentAudio[animalSoundName].audio = src
    //     } else {

    //         src = this.game.audioContext.createBufferSource()
    //         gainNode = this.game.audioContext.createGain()

    //         src.buffer = audioBuffer
    //         src.loop = true
    
    //         let vl = gameData.isMute === true ? 0 : 1
    //         gainNode.gain.value = vl
            
    //         src.connect(gainNode)
    //         gainNode.connect(this.game.audioContext.destination)
            
    //         src.start(0, 0)
    //         this.game.currentAudio[animalSoundName] = {config:{startTime: 0, pausedAt: undefined, gainNode: gainNode, volume: vl}}
    //         this.game.currentAudio[animalSoundName].audio = src

    //     }

    // // Retorna o gainNode caso queira manipular o volume desse áudio no futuro
    // return {source: src, gainNode: gainNode}
    // }

    // stopAnimalSound(soundName){
    //     if(soundName in this.game.currentAudio){
    //         let pausedAt = this.game.currentAudio[soundName].audio.context.currentTime
            
    //         this.game.currentAudio[soundName].audio.stop()
    //         this.game.currentAudio[soundName].config.pausedAt = pausedAt
    //     } else {
    //         throw new Error('It is not possible to stop an inexisted audio')
    //     }

    // }
}

export{
    Sights
}