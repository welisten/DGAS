import { testimonials } from "../constants/testimonials.js";

const testimonialsCards = document.querySelectorAll(".t_card")
const currentTestimonials = Array(testimonialsCards.length)

let testiAmount = testimonials.length
let changeInterval


function updateTestimonial(){
    clearInterval(changeInterval)

    testimonialsCards.forEach((card , idx) => {
        const { img, name, context, testi } = getTestimonialsElements(card)

        img.children[0].setAttribute('src', testimonials[idx].img_src)
        name.innerHTML = testimonials[idx].name
        context.innerHTML = testimonials[idx].desc
        testi.children[0].innerHTML = testimonials[idx].testimonial

        currentTestimonials[idx] = idx
    })
    changeInterval = setInterval(() => handleTestimonialsChange(), 60000)
}
const getTestimonialsElements = (card) => ({
    img:   card.querySelector('.t_img'),
    name:  card.querySelector('.t_name'),
    context:  card.querySelector('.t_context'),
    testi: card.querySelector('.testimonial_text')
})
const handleTestimonialsChange = () => {
    testimonialsCards.forEach((card, cardIdx) => {

        card.classList.add("chaging")

        // aguardar o termino da animação css
        setTimeout(() => {
            let { img, name, context, testi } = getTestimonialsElements(card)
            
            img.children[0].setAttribute('src', testimonials[nextIndex(currentTestimonials[cardIdx])].img_src)
            name.innerHTML = testimonials[nextIndex(currentTestimonials[cardIdx])].name
            context.innerHTML = testimonials[nextIndex(currentTestimonials[cardIdx])].desc
            testi.children[0].innerHTML = testimonials[nextIndex(currentTestimonials[cardIdx])].testimonial

            currentTestimonials[cardIdx] = nextIndex(currentTestimonials[cardIdx])
            card.classList.remove("chaging")
        } ,2000)

        
    })
}
const nextIndex = (i) => (i + 3) % testiAmount

export {
    updateTestimonial
}