import './../style/footerPages.css'
import './../style/mediaQuery.css'

import {setMainScroll} from './scroll.js'
import {setLightModeSlider, updatePlataformColors} from './navigation.js'

window.addEventListener('DOMContentLoaded', (e) =>{
    updatePlataformColors()
    setMainScroll()
    setLightModeSlider()
})