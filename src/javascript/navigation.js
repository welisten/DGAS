const mainEl =  document.querySelector('#mainEl')
const navBarEl = document.querySelector('#navEl')
const anySection = document.querySelector('#theProject')


let navBtns = document.querySelectorAll('.navBtn')
navBtns.forEach(navItem => {
    navItem.addEventListener('click', (e) => {
        let sectionPosition = navItem.getAttribute('sec_num') - 1
        let sectionHeight = anySection.getBoundingClientRect().height
        let mainOffset = navBarEl.getBoundingClientRect().height 

        let factor = sectionHeight * sectionPosition 
        window.scrollTo({
            top: factor,
            behavior: 'smooth'
        })
    })
})

function setNavigation(){
    console.log(mainEl.getBoundingClientRect().height)
}

export{
    setNavigation
}