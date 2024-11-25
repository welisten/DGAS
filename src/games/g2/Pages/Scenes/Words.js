import { gameData } from "../../Constants/gameData.js";
import { vocabulary } from "../../Constants/vocabulary.js";
import { vocabularyImgDtArr } from "../../Constants/ImagesData.js";
import { colors } from "../../Constants/Colors.js";

class Words {
    constructor(game){
        this.game = game
        this.element = document.querySelector('#game_Container')
        this.cards = []
        this.cardIdx = 0


        document.title = 'Aprendendo Palavras!'
        gameData.mainScene = 'Words'


        this.game.resetContainerToNewScene('wd')
        this.start()
    }
    start(){
        this.generateCards()
        this.buildContainer()
        this.game.playAudio(gameAssets['nature_ambience'], 1, true)
        this.setContainerElement()
    }
    generateCards(){
        generateArray(this.cards, vocabulary.length, 1)


        function generateArray(arr, amount, step){
            for(let i = 0; i < amount; i += step){
                arr[i] = i
            }

            arr.sort(() => Math.random() - .5)
        }
    }

    buildContainer(){
        this.game.buildBg()

                                // main container
        const wd_bg = this.game.createNewElement('div', 'bg wd')
        const mainContainer = this.game.createNewElement('div', 'wd_main container')
        
        const wd_main_cardContainer = this.game.createNewElement('div', 'wd_main_cardContainer container')
        
        const imgCardContainer = this.game.createNewElement('div', 'imgCard card container')
        const img = this.getImage(vocabularyImgDtArr[this.cards[this.cardIdx]].name)
        
        img.setAttribute('alt', vocabularyImgDtArr[this.cards[this.cardIdx]].alt)

        const vLibrasCardContainer =this.game.createNewElement('div', 'vLibrasCard card')
        const access = document.querySelector('.access')
        const vwBtn = document.querySelector('[vw-access-button]')

        const pTitle = this.game.createNewElement('p', 'p_title')
        pTitle.setAttribute('id', 'pTitle')
        const p_imgDescri = this.game.createNewElement('p', 'p_imgDescri')
        let imgTitle;
        
        vLibrasCardContainer.appendChild(access)
        wd_main_cardContainer.append(imgCardContainer, vLibrasCardContainer)
        mainContainer.appendChild(wd_main_cardContainer)
        this.element.append(wd_bg, mainContainer)

        vwBtn.click()
        if(!gameData.wereVLibrasActived) {
            gameData.isClickable = false
            setTimeout(() => {
                imgCardContainer.appendChild(img)

                pTitle.innerHTML = vocabulary[this.cards[this.cardIdx]].palavra

                p_imgDescri.innerHTML = `${vocabulary[this.cards[this.cardIdx]].descricao}`
                imgTitle.appendChild(pTitle)

                this.setCloseBtn()
                this.setSubtitle()
                gameData.isClickable = true

                pTitle.click()
            }, 8000);
            gameData.wereVLibrasActived = true

        } else{
            this.setCloseBtn()

            pTitle.innerHTML = vocabulary[this.cards[this.cardIdx]].palavra
            p_imgDescri.innerHTML = `${vocabulary[this.cards[this.cardIdx]].descricao}`
            imgTitle = this.game.createNewElement('div', 'imgTitle container');
            imgTitle.appendChild(pTitle)

            vLibrasCardContainer.appendChild(access)
            imgCardContainer.appendChild(img)
            wd_main_cardContainer.append(imgCardContainer, vLibrasCardContainer)
            mainContainer.appendChild(wd_main_cardContainer)
            this.element.append(wd_bg, mainContainer)
        }

        access.style.display = 'block'

        const wd_main_middleBar = this.game.createNewElement('div', 'wd_main_middleBar container')
        const prevBtn = this.game.createNewElement('button', 'prevBtn wd_btn btn', 'prevBtn' )
        const iprev = this.game.createNewElement('i', 'fa-solid fa-arrow-left' )
        if(!imgTitle) imgTitle = this.game.createNewElement('div', 'imgTitle container');
        const nextBtn = this.game.createNewElement('button', 'nextBtn wd_btn btn', 'nextBtn' )
        const inext = this.game.createNewElement('i', 'fa-solid fa-arrow-right' )

        prevBtn.appendChild(iprev)
        nextBtn.appendChild(inext)
        wd_main_middleBar.append(prevBtn, imgTitle, nextBtn)
        mainContainer.appendChild(wd_main_middleBar)

                                // footer container

        const footerContainer = this.game.createNewElement('div', 'wd_footer container')
        const imgDescription = this.game.createNewElement('div', 'imgDescription container')
        
        imgDescription.appendChild(p_imgDescri)
        footerContainer.appendChild(imgDescription)

        for(let i = 0; i < 11; i++){
            let img = this.getImage(`grass${i + 1}`)

            img.classList.add('wd-grass')
            img.setAttribute('alt', 'grama')

            footerContainer.appendChild(img)
        }

        this.element.append(wd_bg, mainContainer, footerContainer)
    }
    
    setContainerElement(){
        const prevBtn = document.querySelector('#prevBtn')
        const nextBtn = document.querySelector('#nextBtn')


        prevBtn.addEventListener('click', (e) => {
            if(!gameData.isClickable) return
            if(this.cardIdx <= 0 ) return;
            this.game.playAudio(gameAssets[gameAssets['btn_select']])
            
            this.cardIdx--

            this.updateCards()
            this.readWithAccessibility()
        })
        nextBtn.addEventListener('click', () => {
            if(!gameData.isClickable) return
            if(this.cardIdx >= vocabulary.length - 1) return;
            this.game.playAudio(gameAssets['btn_select'])
            this.cardIdx++
            this.updateCards()
            this.readWithAccessibility()        
        })
        document.addEventListener('keydown', (e) => {
            if(gameData.mainScene !== 'Words' || gameData.isClickable == false) return
            switch(e.key){
                case 'ArrowLeft':
                    if(this.cardIdx <= 0) return
                    this.cardIdx--
                    this.updateCards()
                    break
                
                case 'ArrowRight':
                    if(this.cardIdx >= vocabulary.length - 1) return
                    this.cardIdx++
                    this.updateCards()
                    break
                
                case 'Enter':
                    console.log('ArrowLeft')
                    this.readWithAccessibility()
                    break
                
                default:
                    return;
                
            }
        })
        this.game.setBtns(document.querySelector('.wd_main_middleBar'))

    }
    readWithAccessibility(){
        const accessibleTextContainer = document.querySelector('#pTitle')
        
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

        accessibleTextContainer.dispatchEvent(mouseOverEvent)
        setTimeout(() => accessibleTextContainer.dispatchEvent(clickEvent), 200)
        accessibleTextContainer.dispatchEvent(mouseOutEvent)
    }
    updateCards(){
        gameData.isClickable = false // essa ação visa controle na callback do evento de keydown

        let imgCard = document.querySelector('.imgCard')
        let imgTitle = document.querySelector('.p_title')
        let imgDescription = document.querySelector('.p_imgDescri')
        
        imgCard.innerHTML =  ''

        let img = this.getImage(vocabularyImgDtArr[this.cards[this.cardIdx]].name)
        imgCard.appendChild(img)
        img.setAttribute('alt', vocabularyImgDtArr[this.cards[this.cardIdx]].alt)
        imgTitle.innerHTML = vocabulary[this.cards[this.cardIdx]].palavra
        imgDescription.innerHTML = `${vocabulary[this.cards[this.cardIdx]].descricao}`
        
        gameData.isClickable = true
    }
    setCloseBtn(){
        const closeBtn = document.querySelector('.vpw-header-btn-close')
        const card = document.querySelector('.vLibrasCard')
        const access = document.querySelector('.access')

        console.log(access)
        if(!closeBtn){
            this.game.popUpMessage('O botão de fechar não foi encontrado !')
            console.error('O botão de fechar não foi encontrado !')
        }
        else {
            closeBtn.addEventListener('click', () => {
                access.style.display = 'none!important;'
                card.style.display = 'none'
            } )
        }
    }
    setSubtitle(){
        const subtitleBtn = document.querySelector('.vpw-controls-subtitles')
        if(!subtitleBtn){
            this.game.popUpMessage('Botão subtitle não encontrado.')
        } else {
            subtitleBtn.click()
        }
    }
    readWithAccessibility(){
        const accessibleTextContainer = document.querySelector('#pTitle')
        
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

        accessibleTextContainer.dispatchEvent(mouseOverEvent)
        setTimeout(() => accessibleTextContainer.dispatchEvent(clickEvent), 200)
        accessibleTextContainer.dispatchEvent(mouseOutEvent)
    }
    
    getImage(key){
        return gameAssets[key]
    }
    
}

export{
    Words
}