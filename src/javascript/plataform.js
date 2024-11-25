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
