import { photosData } from "../constants/photos.js"

const galeryEl = document.querySelector('#galery')
const photoScreen = document.querySelector('#photoScreen')
const p_BG = document.querySelector('#photos_bg')
const p_scrollBar = document.querySelector('.ph_scrollbar')

const AllPolaroidsImg = galeryEl.querySelectorAll('.polaroid_img')
const AllPolaroidsDesc = galeryEl.querySelectorAll('.photo_desc')

const p_ps_photo = document.querySelector('#p_ps_photo')
const p_closeBtn = document.querySelector('#p_ps_closeBtn')

const prevBtn = photoScreen.querySelector('.left')
const nextBtn = photoScreen.querySelector('.right')

function setGalery(){
    if (!photosData || photosData.length === 0) {
        console.error("No photos data available");
        return
    }
    
    AllPolaroidsImg.forEach((polaPhoto, i) => {
        updateGalery(polaPhoto, i)
        handlePolaroidClick(polaPhoto, i)
    })
}

const updateGalery = (polaPhoto, idx) => {
    polaPhoto.setAttribute('src', photosData[idx].src)
    polaPhoto.setAttribute('alt', photosData[idx].desc)
    AllPolaroidsDesc[idx].innerHTML = `${photosData[idx].desc}<br><br>${photosData[idx].date}`
}
const handlePolaroidClick = (elem, idx) => {    
    elem.addEventListener('click', () => {
        updatePhotoScreen(p_ps_photo, idx)

        galeryEl.classList.remove('active')
        photoScreen.classList.add('active')
        p_BG.classList.add('active')
        p_scrollBar.style.visibility = 'hidden'
    }) 
}
const updatePhotoScreen = (childImg, idx) => {
    
    if(!childImg){
        return
    }

    let imgAmount = photosData.length
    
    updateButtonOpacity(idx, imgAmount)

    childImg.setAttribute('src', photosData[idx].src)
    childImg.setAttribute('alt',photosData[idx].desc)
    childImg.setAttribute('index', idx)
}

function setPhotoScreen() {
    setCloseBtn()
    setControlsBtns()
}

const setCloseBtn = () => {
    p_closeBtn.addEventListener('click', (e) => {
        galeryEl.classList.add('active')
        photoScreen.classList.remove('active')
        p_BG.classList.remove('active')
        p_scrollBar.style.visibility = 'visible'

        nextBtn.style.opacity = '1'
        prevBtn.style.opacity = '1'
    })

}
const setControlsBtns = () => {
    prevBtn.addEventListener('click', (e) => {
        let imgIdx = parseInt(p_ps_photo.getAttribute('index'), 10)
        
        if(imgIdx <= 0) return;
        
        p_ps_photo.setAttribute('src', photosData[imgIdx - 1].src)
        p_ps_photo.setAttribute('alt', photosData[imgIdx - 1].desc)
        p_ps_photo.setAttribute('index', imgIdx - 1)

        updateButtonOpacity(imgIdx - 1, parseInt(photosData.length))
    })

    nextBtn.addEventListener('click', (e) => {
        let nextIdx = parseInt(p_ps_photo.getAttribute('index'), 10) + 1
        let imgAmount = parseInt(photosData.length)

        if(nextIdx >= imgAmount ) return;
        
        p_ps_photo.setAttribute('src', photosData[nextIdx].src)
        p_ps_photo.setAttribute('alt', photosData[nextIdx].desc)
        p_ps_photo.setAttribute('index', nextIdx)
        
        updateButtonOpacity(nextIdx, imgAmount)
    })
}

const updateButtonOpacity = (idx, ttl) => {
    prevBtn.style.opacity = idx <= 0 ? '0' : '1'
    nextBtn.style.opacity = idx >= ttl - 1 ? '0' : '1'
}


export{
    setGalery,
    setPhotoScreen
}