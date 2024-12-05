let gameidx = 0

let gameSectionBtns = document.querySelectorAll('.gameBtn')
let gsControls_prev = document.querySelector('.gs_controlBtn.left')
let gsControls_next = document.querySelector('.gs_controlBtn.right')


gsControls_next.addEventListener('click', e => {
    gameidx >= 4 ? gameidx = 0 : gameidx++
    gameSectionBtns.forEach((el, i) => {
        if(i === gameidx - 1 ){
            el.className = 'gameBtn left'
        }else if (i === gameidx){
            el.className = 'gameBtn active'
        } else if(i === gameidx + 1){
            el.className = 'gameBtn right'
        }else{
            if(gameidx === 0){
                 gameSectionBtns[4].className = 'gameBtn left'
            } else {
                el.className = 'gameBtn right reseted'
            }
        }
    })
})
gsControls_prev.addEventListener('click', e => {
    gameidx <= 0 ? gameidx = 4 : gameidx --
    console.log(gameidx)
    gameSectionBtns.forEach((el, i) => {
        if(i === gameidx - 1 ){
            el.className = 'gameBtn left'
        }else if (i === gameidx){
            el.className = 'gameBtn active'
            if(i === 4){
                gameSectionBtns[0].className = 'gameBtn right'
            }
        } else if(i === gameidx + 1){
            el.className = 'gameBtn right'
        }else{
            if(gameidx === 0){
                 gameSectionBtns[4].className = 'gameBtn left'
            } else {
                el.className = 'gameBtn left reseted'
            }
        }
    })
})

let cInputArr = document.querySelectorAll('.c_input')
let cTextAreaEl = document.querySelector('#contact_message')

cInputArr.forEach(i => {
    let relatedWrapper = document.querySelector(`div[${i.getAttribute('wrapper')}]`)
    let relatedLabel = document.querySelector(`label[for=${i.getAttribute('name')}]`)

    relatedWrapper.addEventListener('mouseout', (e) => {
        if(i.value){
            relatedLabel.style.top = '-2rem'
            relatedLabel.style.left = '-3%'
            relatedLabel.style.color = 'white'

            i.style.border = 'none'
        } else {
            let top = '50%', left = '1%'
            if(e.target.name === 'message'){
                top = '6%'
                left = '10px'
            }
            relatedLabel.style.top = top
            relatedLabel.style.left = left
            relatedLabel.style.color = 'var(--green-medium--)'
            relatedLabel.style.filter = 'none'
            i.style.outline = 'none'
            
        }
    })
    relatedWrapper.addEventListener('mouseover', (e) => {
        relatedLabel.style.top = '-40%'
        relatedLabel.style.left = '-3%'
        relatedLabel.style.color  = 'white'
        relatedLabel.style.filter = 'drop-shadow(1px 1px 1px black)'

        i.style.outline = '3px solid var(--green-border--)'
    })

    i.addEventListener('focus', (e) => {
        let top = ''
        top = e.target.name === 'message' ? '-6%' : '-40%'

        relatedLabel.style.top = top
        relatedLabel.style.left = '-3%'
        relatedLabel.style.color  = 'white'
        relatedLabel.style.filter = 'drop-shadow(1px 1px 1px black)'

        i.style.outline = '3px solid var(--green-border--)'
    })
    i.addEventListener('blur', (e) => {
        if(e.target.value){            
            relatedLabel.style.top = '-2rem'
            relatedLabel.style.left = '-3%'
            relatedLabel.style.color = 'white'

            i.style.color = `var(--green-medium--)`
            i.style.fontSize = `1.8rem`
        } else {
            let top = '50%', left = '1%'

            if(e.target.name === 'message'){
                top = '6%'
                left = '10px'
            }
            relatedLabel.style.top = top
            relatedLabel.style.left = left
            relatedLabel.style.color = 'var(--green-medium--)'
            relatedLabel.style.filter = 'none'
            
        }
    })

})

handleTextarea()

function handleTextarea(){
    let relatedLabel = document.querySelector('label[for=message]')

    cTextAreaEl.addEventListener('mouseenter', (e) => {
        relatedLabel.style.top = '-6%'
        relatedLabel.style.left = '-3%'
        relatedLabel.style.color  = 'white'
        relatedLabel.style.filter = 'drop-shadow(1px 1px 1px black)'

        cTextAreaEl.style.outline = '3px solid var(--green-border--)'
    })
    cTextAreaEl.addEventListener('mouseleave', (e) => {
        if(e.target.value){
            relatedLabel.style.top = '-2rem'
            relatedLabel.style.left = '-3%'
            relatedLabel.style.color = 'white'

            cTextAreaEl.style.border = 'none'
        } else {
            relatedLabel.style.top = '6%'
            relatedLabel.style.left = '10px'
            relatedLabel.style.color = 'var(--green-medium--)'
            relatedLabel.style.filter = 'none'
            cTextAreaEl.style.outline = 'none'
        }
    })
    cTextAreaEl.addEventListener('focus', (e) => {
        relatedLabel.style.top = '-6%'
        relatedLabel.style.left = '-3%'
        relatedLabel.style.color  = 'white'
        relatedLabel.style.filter = 'drop-shadow(1px 1px 1px black)'

        cTextAreaEl.style.outline = '3px solid var(--green-border--)'
    })
    cTextAreaEl.addEventListener('blur', (e) => {
        if(e.target.value){            
            relatedLabel.style.top = '-2rem'
            relatedLabel.style.left = '-3%'
            relatedLabel.style.color = 'white'

            cTextAreaEl.style.color = `var(--green-medium--)`
            cTextAreaEl.style.fontSize = `1.8rem`
        } else {
            relatedLabel.style.top = '6%'
            relatedLabel.style.left = '10px'
            relatedLabel.style.color = 'var(--green-medium--)'
            relatedLabel.style.filter = 'none'
            
        }
    })

}
