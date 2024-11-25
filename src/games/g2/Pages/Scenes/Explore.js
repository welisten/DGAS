import { gameData } from "../../Constants/gameData.js";

class Explore {
    constructor(game){
        this.game = game
        this.element = document.querySelector('#game_Container')
        
        document.title = 'Explorando as Palavras!'
        gameData.mainScene = 'Explore'

        this.game.resetContainerToNewScene('ex')
        this.start()
    }
    start(){
        this.buildContainer()
        this.game.playAudio(gameAssets['nature_ambience'], 1, true)
        this.setContainerElement()


    }

    buildContainer(){
        this.game.buildBg()

        //                              header
        const ex_header = this.game.createNewElement('div', 'ex-header')
        // substituir por this.getImage
        const bird1 = this.game.createNewElement('img', 'birds birds-left b-l', null, './../Assets/imgs/general/bird.png')
        const bird2 = this.game.createNewElement('img', 'birds birds-left b-s', null, './../Assets/imgs/general/bird.png')
        const bird3 = this.game.createNewElement('img', 'birds birds-right b-s', null, './../Assets/imgs/general/bird.png')
        const bird4 = this.game.createNewElement('img', 'birds birds-right b-l', null, './../Assets/imgs/general/bird.png')

        bird1.setAttribute('alt', 'passarinho')
        bird2.setAttribute('alt', 'passarinho')
        bird3.setAttribute('alt', 'passarinho')
        bird4.setAttribute('alt', 'passarinho')

        ex_header.append(bird1, bird2, bird3, bird4)

        //                              main
        const ex_main = this.game.createNewElement('div', 'ex-main container')
        
        const searchContainer = this.game.createNewElement('div', 'searchContainer container')
        
        const formEl  = this.game.createNewElement('form', 'exc-mn-search btn')
        const inputEl = this.game.createNewElement('input', 'exc-mn-searchBar', 'exc-searchBar')
        const formSubBtn  = this.game.createNewElement('button', 'exc-mn-searchBtn', 'exc-searchBtn')
        const i_search = this.game.createNewElement('i', 'fa-solid fa-magnifying-glass')

        inputEl.setAttribute('placeholder', 'digite uma palavra')
        formSubBtn.setAttribute('type', 'submite')
        
        formSubBtn.appendChild(i_search)
        formEl.append(inputEl, formSubBtn)

        searchContainer.appendChild(formEl)

        const wordSection = this.game.createNewElement('div', 'wordSection')
        const container_1 = this.game.createNewElement('div', 'container')

        const arvore_1 = this.getImage('tree1')
        const wordParagraf = this.game.createNewElement('p')
        const arvore_2 = this.getImage('tree2')

        arvore_1.setAttribute('alt', 'arvore')
        wordParagraf.setAttribute('id', 'userText' )
        wordParagraf.innerText = ' '
        arvore_2.setAttribute('alt', 'arvore')

        container_1.append(arvore_1, wordParagraf, arvore_2)
        wordSection.appendChild(container_1)

        searchContainer.appendChild(wordSection)
        
        const signContainer = this.game.createNewElement('div', 'signContainer container')
        const vwBtn = document.querySelector('[vw-access-button]')
        const access = document.querySelector('.access')

        signContainer.appendChild(access)
        vwBtn.click()
        
        if(!gameData.wereVLibrasActived){
            setTimeout(() => {
                this.setCloseBtn()
                this.setSubtitle()
            }, 10000);
            gameData.wereVLibrasActived = true

        } else {
            setTimeout(() => this.setCloseBtn(), 1000)
        }
        
        access.style.display = 'block'

        ex_main.append(searchContainer, signContainer)

        //                              footer
        const ex_footer = this.game.createNewElement('div', 'ex-footer')

        for(let i = 0; i < 9; i++){
            let img = this.getImage(`grass${i + 1}`)

            img.classList.add('ex-grass')
            img.setAttribute('alt', 'grama')

            ex_footer.appendChild(img)
        }

        const hand_s = this.getImage('hand_slin')
        hand_s.classList.add('ex-hand-slin')

        const char3 = this.getImage('char3')
        char3.classList.add('ex-char3')
        char3.setAttribute('alt', 'menina com braço mecânico')

        ex_footer.append(hand_s, char3)

        this.element.append(ex_header, ex_main, ex_footer)
    }
    
    setContainerElement(){
        const searchBtn =  document.getElementById('exc-searchBtn')
        const searchBar =  document.getElementById('exc-searchBar')
        const userTextEl = document.getElementById('userText')
        const vwBtn = document.querySelector('[vw-access-button]')
        
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault()
            if(searchBar.value){
                this.game.playAudio(gameAssets['btn_select'])
                userTextEl.innerText = searchBar.value
                searchBar.value = ''
                this.readWithAccessibility()
            }
            else {
                this.game.popUpMessage('Digite alguma palavra no campo de pesquisa')
            }
        })
    }
    setCloseBtn(){
        const closeBtn = document.querySelector('.vpw-header-btn-close')
        const access = document.querySelector('.access')
        console.log(closeBtn)
        if(!closeBtn){
            this.game.popUpMessage('O botão de fechar não foi encontrado !')
            console.error('O botão de fechar não foi encontrado !')
        }
        else {
            closeBtn.addEventListener('click', () => {
                access.style.display = 'none'
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
        const accessibleTextContainer = document.querySelector('#userText')
        
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
    Explore
}