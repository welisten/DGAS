import { Letter } from "./Letter.js";

class Sign {
    constructor(codeNumber){
        if(codeNumber >= 97 && codeNumber <= 122){
            this.code = Number(codeNumber)  // [97 - 122] = [a - z]
            this.name = String.fromCharCode(this.code)
            this.alt  = `Sinal de Libras ${this.name}`
            this.element = gameAssets[`${this.name}`]
        } else {
            throw new Error(`Código inválido. Deve estar entre 97 (a) e 122 (z).`)
        }
    }
}

export{
    Sign
}