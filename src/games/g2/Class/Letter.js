class Letter {
    constructor(codeNumber){
        if(codeNumber >= 65 && codeNumber <= 90){
            this.code = Number(codeNumber)  // [65 - 90] = [A - Z]
            this.name = String.fromCharCode(this.code)
            this.alt  = `letra ${this.name}`
            this.element = gameAssets[`${this.name}`]
        } else {

            throw new Error(`Código inválido. Deve estar entre 65 (A) e 90 (Z).`)
        }

    }
}

export{
    Letter
}