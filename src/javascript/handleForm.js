import { popUpPlataformMessage } from "./handlePopUp.js"

const formSubmit = document.querySelector('#formSub')
const form = document.querySelector('#contactForm')
const popUp  = document.querySelector('#mainPopUp')

let urlOrigin = window.location.origin

function handleForm(){
    formSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        popUp.classList.remove('active')

        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        const {name, cell, email, subject, message} = data
        
        try{
            validateInputs({name, cell, email, subject, message}) 
        } catch(e){
            popUpPlataformMessage(e)
            console.log(e)
            return
        }

        fetch(`${urlOrigin}/send-email`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        })
            .then(resp => {
                if(!resp.ok){
                    throw new Error(`ERRO HTTP: ${resp.status} - ${resp.statusText}`)
                }
                return resp.text()
            })
            .then(message => {
                resetInput(form)
                popUpPlataformMessage(message)
            })
            .catch(erro => {
                console.error('ERRO AO ENVIAR O EMAIL: ', erro)
                popUpPlataformMessage('Erro ao enviar o email. Tente mais tarde')
            })
    })
}

const resetInput = (form) => {
    const inputs = form.querySelectorAll('input, textarea')
    inputs.forEach(input => {
        input.value = ''
    })
}

const validateName = (name) => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/
    console.log(name)
    return nameRegex.test(name) && name.trim().length >= 3
}
const validatePhone = (cell) => {
    const phoneRegex = /^\(?\d{2}\)?\s?9\d{4}\-?\d{4}$/
    return phoneRegex.test(cell)
}
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    return emailRegex.test(email)
}
const validateSubject = (subject) => {
    if(typeof subject !== 'string') return false
    
    const subjectRegex = /^[a-zA-Z0-9\s]+$/    
    return subjectRegex.test(subject) && subject.trim().length >= 3
}
const validateMessage = (message) => {
    const messageRegex = /^.{1,500}$/

    return messageRegex.test(message)
}

function validateInputs({name, cell, email, subject, message}){
    let erro = ''
    if (!validateName(name)) {
        erro += '<br><br>Nome inválido! O nome deve ter pelo menos 2 caracteres.'
    }
    if (!validatePhone(cell)) {
        erro += '<br><br>Telefone inválido! O número de celular deve ter 11 dígitos e seguir o formato correto.'
    }
    if (!validateEmail(email)) {
        erro += '<br><br>Email inválido! Verifique o formato do e-mail.'
    }
    if (!validateSubject(subject)) {
        erro += '<br><br>Assunto inválido! O assunto deve ter pelo menos 5 caracteres.'
    }
    if (!validateMessage(message)) {
        erro += '<br><br>Mensagem inválida! A mensagem deve ter pelo menos 10 caracteres.'
    }
    if(erro.trim().length > 0){
        throw new Error(erro);
    }

    return true; // Se todas as validações passarem, retorna verdadeiro
}

export{
    handleForm
}