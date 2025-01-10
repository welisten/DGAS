const tp_scrollContent = document.querySelector('.tp_scrollContent')
const tp_scrollbar = document.querySelector('.tp_scrollBar')
const tp_scrollThumb = document.querySelector('.tp_scrollThumb')

// AO REFATORAR:
// EVITAR:
//     - DRY (dont repeat yourself)
//     - Acoplamento Rígido
//     - Acessibilidade A11y
//     - Adicionar debounce para scroll
//     - Otimizar eventos de "mousemove" e "touchemove"
// FAZER:
//     - perceber eventos iguais, como chamadas diferentes, e alterar para um evento com uma chamada que lide com tds as situações
//     - Debounce
//     - A Função setMainScroll precisa ser ajustada para que sejá mais acertiva, escalavel, e mais modularizada.

function setTheProjectTextScroll(){
    handleScrollbar()
    tp_scrollContent.addEventListener('scroll', (e) => {
        syncScrollThumb(e)
    })
}

const handleScrollbar = () => {
    // AO REFATORAR:
    // EVITAR O DRY (Don't Repeat Yourself):
    const scrollDataControl = {
        isDragging: false,
        startY: undefined,
        startThumbTop: undefined
    }

    tp_scrollThumb.addEventListener('mousedown', (e) => {
        scrollDataControl.isDragging = true
        scrollDataControl.startY = e.clientY
        scrollDataControl.startThumbTop = tp_scrollThumb.offsetTop

        e.target.classList.toggle('active')

        e.preventDefault()
    })
    document.addEventListener('mousemove', (e) => {
        if(!scrollDataControl.isDragging)
            return;

        let offsetY = e.clientY - scrollDataControl.startY
        let newTop = scrollDataControl.startThumbTop + offsetY
        let roof = tp_scrollbar.offsetHeight - tp_scrollThumb.offsetHeight

        newTop = Math.max(0, Math.min(newTop, roof))
        tp_scrollThumb.style.top = `${newTop}px`

        let new_content_top = (newTop / tp_scrollbar.offsetHeight)
        let content_height = tp_scrollContent.scrollHeight - tp_scrollContent.offsetHeight

        tp_scrollContent.scrollTo({
            top: new_content_top * content_height,
        })
    })
    document.addEventListener('mouseup', () => {
        scrollDataControl.isDragging = false
        tp_scrollThumb.classList.toggle('active')

    })

    tp_scrollThumb.addEventListener('touchstart', (e) => {
        scrollDataControl.isDragging = true
        scrollDataControl.startY = e.touches[0].clientY
        scrollDataControl.startThumbTop = tp_scrollThumb.offsetTop

        e.preventDefault()
    })
    document.addEventListener('touchmove', (e) => {
        if(!scrollDataControl.isDragging)
            return;

        let offsetY = e.touches[0].clientY - scrollDataControl.startY
        let newTop = scrollDataControl.startThumbTop + offsetY
        let roof = tp_scrollbar.offsetHeight - tp_scrollThumb.offsetHeight

        newTop = Math.max(0, Math.min(newTop, roof))
        tp_scrollThumb.style.top = `${newTop}px`

        let new_content_top = (newTop / tp_scrollbar.offsetHeight)
        let content_height = tp_scrollContent.scrollHeight - tp_scrollContent.offsetHeight

        tp_scrollContent.scrollTo({
            top: new_content_top * content_height,
        })
    })
    document.addEventListener('touchend', () => {
        scrollDataControl.isDragging = false
    })
}
const syncScrollThumb = (e) => {
    let content_height, scrollTop

    scrollTop = e.target.scrollTop
    content_height = tp_scrollContent.scrollHeight

    const thumbTop = (scrollTop / (content_height - e.target.clientHeight)) * 100
    
    activeBar(tp_scrollThumb)
    tp_scrollThumb.style.top = `${thumbTop}%`
    
}
const activeBar = (Thumb) => {
    if(Thumb.classList.contains('active'))
        return;
        
    Thumb.classList.add('active')
    setTimeout(() => Thumb.classList.remove('active'), 750)

}

const ph_scrollContent = document.querySelector('#galery')
const ph_scroll_bar = document.querySelector('.ph_scrollBar')
const ph_scrollThumb = document.querySelector('.ph_scrollbarThumb')

function setPhotoScroll(){
    handlePhScrollElm()

    ph_scrollContent.addEventListener('scroll', (e) => {
        syncPhContentScroll(e)
    })
}

const handlePhScrollElm = () => {
    const ph_scrollData = {
        isDragging: false,
        startX: 0,
        startThumbLeft: 0
    }

    ph_scrollThumb.addEventListener('mousedown', (e) => {
        ph_scrollData.isDragging = true
        ph_scrollData.startX = e.clientX
        ph_scrollData.startThumbLeft = e.target.offsetLeft

        e.preventDefault()
    })
    document.addEventListener('mousemove', (e) => {
        if(!ph_scrollData.isDragging)
            return;
        
        let offsetX, newLeft, roof

        offsetX = e.clientX - ph_scrollData.startX
        newLeft = ph_scrollData.startThumbLeft + offsetX
        roof = ph_scroll_bar.offsetWidth - ph_scrollThumb.offsetWidth

        newLeft = Math.max(0, Math.min(newLeft, roof))
        ph_scrollThumb.style.left = `${newLeft}px`

        let new_content_left = (newLeft / ph_scroll_bar.offsetWidth)
        let contentWidth = ph_scrollContent.scrollWidth - ph_scrollContent.offsetWidth
        
        ph_scrollThumb.classList.add('active')
        ph_scrollContent.scrollTo({
            left: new_content_left * contentWidth
        })
    })
    document.addEventListener('mouseup', (e) => {
        ph_scrollData.isDragging = false;
        ph_scrollThumb.classList.remove('active')

    })
}
const syncPhContentScroll = (e) => {
    let content_width, scrollLeft

    scrollLeft = e.target.scrollLeft
    content_width = ph_scrollContent.scrollWidth
    const thumbLeft = (scrollLeft / (content_width - e.target.clientWidth)) * 100
    
    activeBar(ph_scrollThumb)
    ph_scrollThumb.style.left = `${thumbLeft}%`
}

// const main_scrollContent = document.querySelector('#mainEl')
// const main_scroll_bar = document.querySelector('.main_scrollBar')
// const main_scrollThumb = document.querySelector('.main_scrollThumb')
// const footer = document.querySelector('#footerEl')

function setMainScroll(){
    // vamos declarar novas variaveis aqui pois.. essa função será chamada para toda pagina.
    let content, bar, thumb;

    content = document.querySelector('#mainEl')
    bar = document.querySelector('.main_scrollBar')
    thumb = document.querySelector('.main_scrollThumb')

    handleMainScrollEl(thumb, bar, content)

    window.addEventListener('scroll', (e) => {
        let content, thumb;
        content = document.querySelector('#mainEl')
        thumb = document.querySelector('.main_scrollThumb')

        syncMainElScroll(e, content, thumb)
    })
}

const handleMainScrollEl = (thumb, bar, content) => {
    const mainScrollDataControl = {
        isDragging: false,
        startY: undefined,
        startThumbTop: undefined
    }
    const onMouseUp = () => {
        mainScrollDataControl.isDragging = false
        thumb.classList.remove('active')
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }
    const onMouseMove = (e) => {
        if(!mainScrollDataControl.isDragging)
            return;

        let offsetY = e.clientY - mainScrollDataControl.startY
        let newTop = mainScrollDataControl.startThumbTop + offsetY
        let roof = bar.offsetHeight - thumb.offsetHeight
        
        newTop = Math.max(0, Math.min(newTop, roof))
        console.log(roof)
        thumb.style.top = `${newTop}px`

        let headerHeight = document.querySelector('header').clientHeight
        let footerHeight = document.querySelector('footer').clientHeight

        let headerAndFooterHeightPercentual = (headerHeight + footerHeight)/ window.innerHeight
        let mainHeightPercentual = 1.0 - headerAndFooterHeightPercentual

        let new_content_top = (newTop / bar.offsetHeight)
        let main_screen_height = mainHeightPercentual * window.innerHeight
        let content_height = (content.scrollHeight) - main_screen_height
        
        let top = new_content_top * content_height
        window.scrollTo({
            top: top
        })
    }

    thumb.addEventListener('mousedown', (e) => {
        mainScrollDataControl.isDragging = true
        mainScrollDataControl.startY = e.clientY
        mainScrollDataControl.startThumbTop = thumb.offsetTop
        e.target.classList.add('active')

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
        
        e.preventDefault()
    })
}
const syncMainElScroll = (e, content, thumb) => {
    let content_height, windowScrollY;
    let headerAndFooterHeightPercentual, mainHeightPercentual;
    
    windowScrollY = window.scrollY
    content_height =content.scrollHeight

    let headerHeight = document.querySelector('header').clientHeight
    let footerHeight = document.querySelector('footer').clientHeight

    headerAndFooterHeightPercentual = (headerHeight + footerHeight) / window.innerHeight
    mainHeightPercentual = 1.0 - headerAndFooterHeightPercentual

    let PADDING = 250
    const thumbTop = (windowScrollY / ((content_height + PADDING) - (mainHeightPercentual * window.innerHeight))) * 100
    
    activeBar(thumb)
    thumb.style.top = `${thumbTop}%`

}

function setFooter(){
    const footerRulesEl = document.querySelector('.f_r_top')
    if (!footerRulesEl) {
        console.warn("Elemento '.f_r_top' não encontrado.");
    }
    let isFooterShown = false
    
    const setScroll = () => {
        // HANDLE FOOTER SCHEME
        let screenHeight = document.documentElement.clientHeight
        let currentScrollHeight = screenHeight + window.scrollY
        let totalHeight = document.documentElement.scrollHeight
        const STOP_POINT_RATE = 0.2
        let stopPoint = totalHeight - (screenHeight * STOP_POINT_RATE)
        
        if(currentScrollHeight >= stopPoint && !isFooterShown){
            footerRulesEl.classList.add('active')
            isFooterShown = true
        } else if(currentScrollHeight < stopPoint && isFooterShown){
            footerRulesEl.classList.remove('active')
            isFooterShown = false
        }
    }
    document.addEventListener('scroll', setScroll)
}

export{
    setTheProjectTextScroll,
    setPhotoScroll,
    setMainScroll,
    setFooter,
    syncMainElScroll
}

