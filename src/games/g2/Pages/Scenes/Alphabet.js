import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";
import { generalImgDtArr } from "../../Constants/ImagesData.js";
import { Letter } from "../../Class/Letter.js";
import { Sign } from "../../Class/Sign.js";

class Alphabet {
    constructor(game){
        this.game = game
        this.element = document.querySelector('#game_Container')
        
        this.game.resetContainerToNewScene('lt')
        document.title = 'Aprendendo o alfabeto'
        gameData.mainScene = 'Alphabet'
        
        this.lettersArr = []
        this.signsArr = []
        this.currentIndex = 0
        this.filter = 'todos'
        this.vogalsCharCode = [65, 69, 73, 79, 85]

        this.provisorySetContainer()
        this.start()
    }

    provisorySetContainer(){
        let ruleW , gContainerWidth, gcontainerHeight  ;

        this.element.classList.remove('inactive')
        
        ruleW = window.innerWidth > 2000 ? window.innerWidth * 0.40 : window.innerWidth > 1500 ? window.innerWidth * 0.65 : window.innerWidth * 0.55
        gContainerWidth  = Math.floor(ruleW)
        gcontainerHeight  = window.innerHeight * .7 

        this.element.style.width = `${gContainerWidth}px`
        this.element.style.height = `${gcontainerHeight}px`
    }

    start(){
        this.game.playAudio(gameAssets['nature_ambience'], 1, true)
        this.buildContainer()
        this.setContainerElements()
    }

    buildContainer(){
        this.generateLetterCards()
        this.generateSignCards()
                                    // BACKGROUND
        this.game.buildBg()
                                    // HEADER
        const lt_headerEl = this.game.createNewElement('div', "lt-header container")
        
        const searchContaiEl = this.game.createNewElement('form', 'lt-hd-search btn')
        const searchBarEl = this.game.createNewElement('input', 'lt-hd-searchBar')
        searchBarEl.setAttribute('type', 'text')
        searchBarEl.setAttribute('placeholder', 'digite uma letra')

        const searchBarBtn = this.game.createNewElement('button', 'lt-hd-searchBtn')
        searchBarBtn.setAttribute('type', 'submit')
        searchBarBtn.setAttribute('id', 'searchBtn')


        const iSearchEl = this.game.createNewElement('i', 'fa-solid fa-magnifying-glass')
        searchBarBtn.appendChild(iSearchEl)
        searchContaiEl.appendChild(searchBarEl)
        searchContaiEl.appendChild(searchBarBtn)
        
        const navContaiEl = this.game.createNewElement('div', 'lt-hd-nav container')
        const navFiltersContain = this.game.createNewElement('div', 'hd-nav-filters container')
        
        const filterContainer1 = this.game.createNewElement('div', 'ft-btn-container btn')
        const filterContainer2 = this.game.createNewElement('div', 'ft-btn-container btn')
        const filterContainer3 = this.game.createNewElement('div', 'ft-btn-container btn')

        const radio1 = this.game.createNewElement('input', 'ft-btn-rd', 'todos')
        radio1.setAttribute('type','radio')
        radio1.setAttribute('name','group')
        radio1.setAttribute('value','todos')
        radio1.setAttribute('checked','')

        
        const radio2 = this.game.createNewElement('input', 'ft-btn-rd', 'vogais')
        radio2.setAttribute('type','radio')
        radio2.setAttribute('name','group')
        radio2.setAttribute('value','vogais')

        const radio3 = this.game.createNewElement('input', 'ft-btn-rd', 'consoates')
        radio3.setAttribute('type','radio')
        radio3.setAttribute('name','group')
        radio3.setAttribute('value','consoantes')
        


        const label_rd1 = this.game.createNewElement('label', 'filterBtn')
        label_rd1.setAttribute('for', '')
        label_rd1.innerHTML = 'todos'
        
        const label_rd2 = this.game.createNewElement('label', 'filterBtn')
        label_rd2.setAttribute('for', '')
        label_rd2.innerHTML = 'vogais'
        
        const label_rd3 = this.game.createNewElement('label', 'filterBtn')
        label_rd3.setAttribute('for', '')
        label_rd3.innerHTML = 'consoantes'

        filterContainer1.append(radio1, label_rd1)
        filterContainer2.append(radio2, label_rd2)
        filterContainer3.append(radio3, label_rd3)

        navFiltersContain.append(filterContainer1, filterContainer2, filterContainer3)

        const char2 = this.getImage('char2')
        char2.setAttribute('src', './../Assets/imgs/general/char2.png')
        char2.setAttribute('alt', 'menina')
        char2.setAttribute('class', 'hd-nav-char2')

        let auxArr= [] 
        for(let i = 0; i < 4; i++){
            auxArr[i] = this.getImage(`grass${i+1}`)
            auxArr[i].setAttribute('src', './../Assets/imgs/general/grass.png')
            auxArr[i].setAttribute('alt', 'grama')
            auxArr[i].setAttribute('class', 'hd-nav-grass grass')
        }
        let [grass1, grass2, grass3, grass4] = auxArr
        
        navContaiEl.append(navFiltersContain, char2)
        navContaiEl.append(grass1, grass2, grass3, grass4)
        lt_headerEl.append(searchContaiEl, navContaiEl)

                                    // MAIN
        const lt_mainEl = this.game.createNewElement('div', "lt-main")
        const mainContainer = this.game.createNewElement('div', 'lt-mn-container container')
        const letterCard = this.game.createNewElement('div', 'lt-mn-letterCard lt-card')
        const letterImg = this.lettersArr[0].element
        
        letterImg.setAttribute('alt', this.lettersArr[this.currentIndex].alt) // atenção para template string ao refatorar essa parte
        letterImg.setAttribute('class', `lt-letter`) 

        const mn_iEqual = this.game.createNewElement('i', 'fa-solid fa-equals')
        const signCard = this.game.createNewElement('div', 'lt-mn-signCard lt-card')
        const signImg = this.signsArr[this.currentIndex].element
        
        signImg.setAttribute('alt', this.signsArr[this.currentIndex].alt) // atenção para template string ao refatorar essa parte
        signImg.setAttribute('class', `lt-sign`)
        
        letterCard.appendChild(letterImg)
        signCard.appendChild(signImg)
        mainContainer.append(letterCard, mn_iEqual, signCard)
        lt_mainEl.appendChild(mainContainer)

                                    // FOOTER
        const lt_footerEl = this.game.createNewElement('div', "lt-footer")
        const footerContainer = this.game.createNewElement('div', 'lt-ft-btns container')
        const prevBtn = this.game.createNewElement('button', 'prevBtn ft-btn btn', 'prevBtn')
        const nextBtn = this.game.createNewElement('button', 'nextBtn ft-btn btn', 'nextBtn')
        const playBtn = this.game.createNewElement('button', 'playBtn btn', 'playBtn')
        const iPrev = this.game.createNewElement('i', 'fa-solid fa-left-long')
        const iNext = this.game.createNewElement('i', 'fa-solid fa-right-long')
        const aYouTube = this.game.createNewElement('a')
        
        aYouTube.setAttribute('href', 'https://www.youtube.com/watch?v=EZxkymw426U&t=33s')
        aYouTube.setAttribute('target', '_blank')
        
        const iYouTube = this.game.createNewElement('i', 'fa-brands fa-youtube')

        aYouTube.appendChild(iYouTube)
        prevBtn.appendChild(iPrev)
        nextBtn.appendChild(iNext)
        playBtn.appendChild(aYouTube)
        footerContainer.append(prevBtn, nextBtn, playBtn)
        lt_footerEl.appendChild(footerContainer)
        
        this.element.append(lt_headerEl, lt_mainEl, lt_footerEl)
    }
    setContainerElements(){
        const prevBtn = document.querySelector('#prevBtn')
        const nextBtn = document.querySelector('#nextBtn')
        const searchBar =  document.querySelector('.lt-hd-searchBar')
        const searchBtn = document.querySelector('#searchBtn')
        const filterBtns = document.querySelectorAll('.ft-btn-rd')

        filterBtns.forEach(filter => {
            filter.addEventListener('click', () =>{
                
                filterByType(filter.value)
                this.game.playAudio(gameAssets['btn_select'])
            })
        })

        prevBtn.addEventListener('click', () => prevBtnCallback())

        nextBtn.addEventListener('click', () => nextBtnCallback())
        document.addEventListener('keydown', (e) => {
            if(gameData.mainScene !== 'Alphabet') return;
            switch(e.key){
                case 'ArrowLeft':
                    prevBtnCallback()
                    break;
                case 'ArrowRight':
                    nextBtnCallback()
                    break;
                default:
                    return
            }
        })

        searchBtn.addEventListener('click', (e) => {
            e.preventDefault()

            if(searchBar.value){

                handleSearchValue(searchBar.value)

            }else {
                this.game.popUpMessage('Você precisa digitar uma LETRA !')
            }
            this.game.playAudio(gameAssets['btn_select'])
            searchBar.value = ''
        })

        const handleSearchValue = ( value ) =>{
            if(!value){
                this.game.popUpMessage('Você precisa digitar uma LETRA !');
                return
            }

            let filterAll_Radio = document.querySelector('.ft-btn-rd#todos')
            filterAll_Radio.click()

            this.generateLetterCards()
            this.generateSignCards()

            let text = value[0].toLowerCase()
            let charCode = text.charCodeAt(0)
            let mappedCode;
            
            if(charCode < 97 || charCode > 122){
                this.game.popUpMessage('Digite uma LETRA válida !');
            } else {
                mappedCode = charCode - 97
                this.currentIndex = mappedCode
                this.updateMain()
            }
        }

        const filterByType = (value) => {
            this.filter = value
            this.currentIndex = 0

            switch(this.filter){
                case 'todos':
                    this.filter = 'todos'
                    break;
                case 'vogais':
                    this.filter = 'vogais'
                    break;
                case 'consoantes':
                    this.filter = 'consoantes'
                    break;
            }

            this.generateLetterCards()
            this.generateSignCards()
            this.updateMain()
        }

        const prevBtnCallback = () => {
            if(this.currentIndex > 0){
                this.currentIndex--
                this.updateMain()
                this.game.playAudio(gameAssets['btn_select'])
            }
        }

        const nextBtnCallback = () => {
            if(this.currentIndex < this.lettersArr.length - 1){
                this.currentIndex++
                this.updateMain()
                this.game.playAudio(gameAssets['btn_select'])
            }
            
        }
    }
    generateLetterCards(){
        try{
            switch(this.filter){
                case 'todos':
                    this.lettersArr.length = 0
                    for(let code = 65; code <= 90; code++){
                        this.lettersArr.push(new Letter(code))
                    }                    
                    break;

                case 'vogais':
                    this.lettersArr.length = 0
                    for(let i = 0; i < this.vogalsCharCode.length; i++){
                        this.lettersArr.push(new Letter(this.vogalsCharCode[i]))
                    }
                    break;

                case 'consoantes':
                    this.lettersArr.length = 0
                    for(let code = 65, i = 0; code <= 90; code++){
                        if(this.vogalsCharCode.includes(code)){
                            continue;  
                        } 
                        this.lettersArr.push(new Letter(code))
                    }                    
                    break;
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    updateMain(){

        const letterCard = document.querySelector('.lt-mn-letterCard')                
        const signCard = document.querySelector('.lt-mn-signCard')
        
        letterCard.innerHTML = ''
        signCard.innerHTML   = ''

        const letterImg = this.lettersArr[this.currentIndex].element
        const signImg = this.signsArr[this.currentIndex].element


        letterImg.setAttribute('alt', this.lettersArr[this.currentIndex].alt) // atenção para template string ao refatorar essa parte
        letterImg.setAttribute('class', `lt-letter`) 

        signImg.setAttribute('alt', this.signsArr[this.currentIndex].alt) // atenção para template string ao refatorar essa parte
        signImg.setAttribute('class', `lt-sign`)

        letterCard.appendChild(letterImg)
        signCard.appendChild(signImg)
    }
    generateSignCards(){
        try{
            switch(this.filter){
                case 'todos':
                    this.signsArr.length = 0
                    for(let code = 97; code <= 122; code++){
                        this.signsArr.push(new Sign(code))
                    }
                    break;
                case 'vogais':
                    this.signsArr.length = 0
                    for(let i = 0; i < this.vogalsCharCode.length; i++){
                        this.signsArr.push(new Sign(this.vogalsCharCode[i] + 32))
                    }
                    break;
                case 'consoantes':
                    this.signsArr.length = 0
                    for(let code = 97; code <= 122; code++){
                        if(this.vogalsCharCode.includes(code - 32)) continue;

                        this.signsArr.push(new Sign(code))
                    }
                    break;
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    getImage(key){
        return gameAssets[key]
    }
}

export{
    Alphabet
}
