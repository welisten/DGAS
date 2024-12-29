
const popUp  = document.querySelector('#mainPopUp')
const btnClose = document.querySelector('#pp_closeBtn')
const popMessage  = document.querySelector('#popUpMessage') 

function popUpPlataformMessage(message){
    if(!popUp.classList.contains('active'))
        popUp.classList.add('active');

    if(message){
        popMessage.innerHTML = message
    } else {
        return
    }
}

btnClose.addEventListener('click', (e)=> {
    if(!popUp.classList.contains('active')) return

    popUp.classList.remove('active');   
})

export{
    popUpPlataformMessage
}