const tp_textAreaDiv = document.querySelector('.tp_textArea')/*container */
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
    
    activeBar()
    tp_scrollThumb.style.top = `${thumbTop}%`
    
}

const activeBar = () => {
    if(tp_scrollThumb.classList.contains('active'))
        return;
        
    console.log('Não esta ativo, estamos entrando')
    tp_scrollThumb.classList.add('active')
    setTimeout(() => tp_scrollThumb.classList.remove('active'), 750)

}

export{
    setTheProjectTextScroll
}

