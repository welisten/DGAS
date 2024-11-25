// Aqui serão colocadas as variaveis que armazenarm as chaves identificadoras das animações
//  necessárias à Classe Phaser.Animations.AnimationManager usadas no Jogo


const userCharacter_animationsKey = {
    walk_up:{
        key: 'walk up',
        config:{
            repeat: -1
        }
    },
    walk_down:{
        key: 'walk down'
    },
    walk_left:{
        key: 'walk left'
    },
    walk_right:{
        key: 'walk right'
    }
}

const lifeBart_animationsKey = {
    heart_full:{
        key: 'heart full'
    },
    heart_half:{
        key: 'heart half full'
    }, 
    heart_empty:{
        key: 'heart empty'
    }
}

const DeerKey =  "deer-stag"

export {
    userCharacter_animationsKey,
    lifeBart_animationsKey,
    DeerKey
}