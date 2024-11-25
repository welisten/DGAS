const sightData = {
    cotia:{
        animals:[
            {
                key: 'quero-quero', 
                nome: 'Quero-Quero', 
                descri: ' O quero-quero é uma ave que gosta de andar pelos campos, sempre atenta. Ele é conhecido por ser um excelente guardião, avisando todos quando percebe algum perigo se aproximando. Seu som é bem agudo e forte, como se estivesse dando um alerta. Ele tem penas acinzentadas e pretas, e você pode vê-lo correndo pela grama com suas longas pernas.', 
                sound: 'quero-quero-sound',
                alt: 'Quero quero e seu filhote'
            },
            {
                key: 'cavalo', 
                nome: 'Cavalo', 
                descri: 'O cavalo é um animal grande e forte, com pernas longas e uma crina que balança quando ele corre. Ele adora galopar, e o som dos seus cascos no chão é inconfundível. Os cavalos são muito inteligentes e conseguem entender os humanos muito bem, sendo amigos inseparáveis em muitas tarefas, como puxar carroças ou correr livremente pelos campos.', 
                sound: 'cavalo-sound',
                alt: 'Um Cavalo escuro a saltar'
            },
            {
                key: 'o-galo-e-a-galinha', 
                nome: 'O Galo e a Galinha', 
                descri: 'O galo e a galinha são os reis do galinheiro. O galo gosta de cantar de manhã, avisando que o dia já começou. Ele tem uma crista vermelha na cabeça e penas coloridas. A galinha, por sua vez, é mais calma e gosta de ciscar o chão em busca de comida. Ela também é a responsável por chocar os ovos e cuidar dos pintinhos.', 
                sound: 'o-galo-e-a-galinha-sound',
                alt: 'Um galo e um grupo de galinhas'
            },
            {
                key: 'cachorro', 
                nome: 'Cachorro', 
                descri: 'O cachorro é o melhor amigo do homem. Ele é leal, brincalhão e adora correr, brincar e proteger sua família. Quando ele late, pode estar chamando atenção, querendo brincar ou avisando sobre algo. Eles são de várias raças e tamanhos, mas todos têm uma coisa em comum; são companheiros para qualquer aventura.', 
                sound: 'cachorro-sound',
                alt: 'Grupo de cachorros vira-lata'
            },
            {
                key: 'cutia', 
                nome: 'Cutia', 
                descri: 'A cutia é um roedor que vive nas florestas e gosta de se alimentar de frutas e sementes. Ela é rápida e está sempre em alerta, correndo rapidamente para se esconder ao menor sinal de perigo. Apesar de ser pequena, ela é muito ágil e se move com muita rapidez entre as plantas.', 
                sound: 'cutia-sound',
                alt: 'Uma cutia pequena'
            },
            {
                key: 'a-vaca-e-o-boi', 
                nome: 'A Vaca e o Boi', 
                descri: 'A vaca e o boi são animais grandes e fortes que vivem em fazendas. A vaca é conhecida por nos dar leite, enquanto o boi ajuda no trabalho pesado do campo. Eles são tranquilos, pastando calmamente pela grama. Seu som é baixo, poderoso e você pode ouvir à distância.', 
                sound: 'a-vaca-e-o-boi-sound',
                alt: 'Uma vaca deitada e umboi ao seu lado'
            }
        ],
        coordinates:[{x:79 ,y:12}, {x:19 ,y:24}, {x:38 ,y:31}, {x:80 ,y:45}, {x:56 ,y:41}, {x:20 ,y:51}], 
        background: 'cotiaBG.jpg',
        descri: 'Cotia é um bairro tranquilo em Guapimirim, cercado por muito verde e com poucas casas. Ele está localizado em uma área onde é possível ver as montanhas que cercam toda a cidade, criando uma vista muito bonita de qualquer lugar. Essas montanhas fazem parte da Serra dos Órgãos e estão cobertas pela mata atlântica, cheia de árvores, plantas e animais. No bairro de Cotia, o ar é fresco, e o clima é calmo, com muito espaço para brincar e explorar a natureza. As árvores grandes formam sombras refrescantes, e os jardins bem cuidados dão vida ao lugar, com flores e plantas coloridas por todo lado. Passarinhos cantam alegremente e podem ser ouvidos de longe, criando um ambiente cheio de sons da natureza. Cotia é um lugar perfeito para quem gosta de estar ao ar livre e apreciar a natureza de perto. Mesmo sendo um bairro pequeno e com poucas casas, ele é cheio de vida e tranquilidade, ideal para quem quer se conectar com o verde das árvores e com as montanhas que o cercam.'
    },
    apa:{
        animals:[
            {
                key: 'macaco-muriqui', 
                nome: 'Macaco Muriqui', 
                descri: 'O muriqui é um macaco grandão e muito calmo, considerado o maior macaco das Américas! Ele adora ficar nas árvores e usar seu rabo como uma mão extra para se segurar. O som do muriqui é forte, como se estivesse chamando os outros da sua família. Eles vivem em grupos, e passam muito tempo juntos, comendo folhas e frutas nas copas das árvores.', 
                sound: 'muriqui-sound',
                alt: 'Um macaco muriqui carregando seu filhote nas costas'
            },
            {
                key: 'perereca-verde', 
                nome: 'Perereca Verde', 
                descri: `A perereca verde é um bichinho bem pequeno, com uma cor verde viva que ajuda ela a se esconder entre as folhas e galhos das árvores.
                Ela tem olhos grandes e patas que parecem ventosas, o que ajuda a grudar nas folhas e escalar até os lugares mais altos. As pererecas verdes geralmente ficam acordadas à noite, saltando de galho em galho, e é quando podemos escutar os sons que elas fazem.
                `, 
                sound: 'perereca-verde-sound',
                alt: 'Uma pereca verde'
            },
            {
                key: 'sabiá-laranjeira', 
                nome: 'Sabiá Laranjeira', 
                descri: `A sabiá-laranjeira é um passarinho muito especial! Ela tem penas clarinhas na barriga e mais escuras nas costas, o que a ajuda a se camuflar entre as árvores. Seu canto é cheio de alegria, com notas que parecem uma melodia, e costuma ecoar bem cedo, ao amanhecer, e também no final da tarde.
                Esse pássaro gosta de viver em árvores, jardins e até quintais, onde se alimenta de frutinhas e pequenos insetos. Quando a sabiá-laranjeira come frutas e leva as sementes para longe, ela ajuda a plantar novas árvores e a cuidar da natureza.`, 
                sound: 'sabia-laranjeira-sound',
                alt: 'Um sabiá laranjeira'
            },
            {
                key: 'boto-cinza', 
                nome: 'Boto Cinza', 
                descri: 'O boto-cinza é como um golfinho, mas vive nos rios! Ele é muito inteligente e adora nadar rápido e fazer acrobacias na água. O som que ele faz parece um assobio e uns cliques bem rápidos, como se estivesse contando segredos para os outros botos enquanto mergulha. Eles são brincalhões e às vezes saltam para fora da água.', 
                sound: 'boto-cinza-sound',
                alt: 'Um Boto cinza aparecendo na superficie'
            },
            {
                key: 'mico-estrela', 
                nome: 'Mico Estrela', 
                descri: `O mico-estrela é um macaquinho pequeno e muito ágil, com pelos que parecem formar tufos em volta das orelhas! Ele gosta de pular de galho em galho nas árvores, e vive em bandos com outros micos. Esses macaquinhos são muito curiosos e adoram explorar o que está ao seu redor, especialmente frutas, flores e insetos, que fazem parte de sua alimentação.
                Além disso, o mico-estrela faz sons como gritos fininhos, que ele usa para se comunicar com os outros da turma. Esses sons ajudam o bando a se manter unido enquanto exploram a floresta!`,
                alt: 'Um Mico estrela em um tronco'
            },
            {
                key: 'onça-parda', 
                nome: 'Onça Parda', 
                descri: `A onça-parda é um animal grande e muito forte, com um corpo musculoso que a ajuda a saltar e correr com agilidade. Ela é conhecida por ser uma excelente caçadora e, apesar de ser um pouco parecida com os gatos, ela vive na natureza e prefere lugares como florestas e montanhas.
                Essa onça é bem silenciosa quando se movimenta, o que a ajuda a surpreender suas presas. Ela raramente faz barulho, mas, quando precisa, emite sons graves para se comunicar. A onça-parda é um animal solitário e gosta de explorar grandes territórios para encontrar alimento e abrigo.`, 
                sound: 'onca-parda-sound',
                alt: 'Uma Onça parda a observar'
            }
        ],
        coordinates:[{x:24,y:20}, {x:36 ,y:60}, {x:40 ,y:40}, {x:57 ,y:25}, {x:73 ,y:60}, {x:75 ,y:10}], 
        background: 'apaBG.jpg',
        descri: `A APA de Guapimirim é uma área especial de proteção no Rio de Janeiro, que faz parte de um ecossistema maior chamado Baía de Guanabara. Esse lugar é muito importante porque protege um tipo de floresta chamado manguezal, que cresce onde a água do mar se mistura com a água doce dos rios. Os manguezais são essenciais, pois são lar de muitos animais e ajudam a filtrar a água e proteger a costa de enchentes e erosões. Graças à proteção da APA, muitos desses animais puderam se recuperar e crescer em número.

        Na APA cientistas estudam as plantas e animais para entender como cuidar melhor desse ambiente. As pessoas também podem aprender sobre a natureza ao fazer passeios de barco e caminhadas nas trilhas, sempre tomando cuidado para não poluir nem prejudicar os habitates. É um exemplo de como é importante proteger a natureza para mantê-la cheia de vida!`
    },
    concordia:{
        animals: [
            {
                key: 'ben-te-vi', 
                nome: 'Ben-te-ví', 
                descri: 'O bem-te-vi é um passarinho muito conhecido pelo seu canto, que parece dizer "bem-te-vi"! Ele tem penas amarelas na barriga e um chapéu preto na cabeça. O som que ele faz é alto, claro e alegre, e você pode ouvi-lo de longe, especialmente quando ele está no alto de uma árvore ou voando. É como se ele estivesse sempre dizendo "oi" para todo mundo ao redor.', 
                sound: 'bentevi-sound',
                alt: 'Um Ben-te-ví'
            }, 
            {   
                key: 'coruja-do-mato', 
                nome: 'Coruja do mato', 
                descri: 'A coruja-do-mato é um pássaro noturno, o que quer dizer que ela adora ficar acordada de noite, enquanto a maioria dos outros animais está dormindo. Ela tem olhos grandes que ajudam a enxergar no escuro. Quando ela "canta" é como se estivesse chamando alguém na floresta de noite, bem baixinho e misterioso.', 
                sound: 'coruja-do-mato-sound',
                alt: 'Uma Coruja'
            }, 
            {
                key: 'rã-assobiadora', 
                nome: 'Rã Assobiadora', 
                descri: 'Essa rã tem um nome engraçado, porque ela faz um som parecido com um assobio! Você sabia que, à noite, perto de um lago ou um rio, dá pra ouvir muitas rãs e sapos ? Mas essa rã é especial, porque seu som é bem fininho e suave, como um assobio de alguém te chamando de longe.', 
                sound: 'ra-assobiadora-sound',
                alt: 'Uma Rã assobiadora'
            }, 
            {
                key: 'tucano-de-bico-preto', 
                nome: 'Tucano de bico preto', 
                descri: `O tucano-de-bico-preto é uma ave muito curiosa e com um bico bem grande. Seu bico, além de leve, ajuda o tucano a alcançar frutas que estão longe nos galhos das árvores. Ele gosta de se alimentar de frutas, insetos e até alguns pequenos animais.
                Esse tucano emite sons bem característicos, que parecem pequenas "conversas" para avisar outros tucanos. Com seu visual único e hábitos curiosos, o tucano-de-bico-preto é um verdadeiro explorador da floresta!`, 
                sound: 'tucano-de-bico-preto-sound',
                alt: 'Um Tucano de pico preto com uma semente no bico.'
            }, 
            {
                key: 'quati', 
                nome: 'Quati', 
                descri: `O quati é um animal curioso e sociável que vive em grupos. Ele tem um corpo alongado, patas curtas e um focinho comprido, que usa para farejar a comida.
                Esse animal se alimenta de frutas, insetos e pequenos animais, sendo habilidoso em subir em árvores. Ativo durante o dia, o quati faz barulhos para se comunicar e se esconde rapidamente quando se sente ameaçado. É um verdadeiro explorador da natureza!`, 
                sound: 'quati-sound',
                alt: 'Um quati'
            }, 
            {
                key: 'pica-pau-bufador', 
                nome: 'Pica Pau Bufador', 
                descri: `O pica-pau-bufador é uma ave fascinante com um corpo robusto e um bico forte, perfeito para fazer buracos nas árvores. Ele tem penas que parecem uma pintura, com desenhos bem legais que o ajudam a se camuflar entre as folhas e troncos.
                O pica-pau-bufador se alimenta de insetos e larvas que encontra nas árvores, usando seu bico para cavar e descobrir o que está escondido. Ele é um verdadeiro artista na floresta!`,
                sound: 'pica-pau-bufador-sound',
                alt: 'Um pica pau em cima de um galho.'
            } 
        ],
        coordinates:[{x:14,y:15}, {x:13 ,y:64}, {x:29 ,y:78}, {x:55 ,y:55}, {x:72 ,y:86}, {x:74 ,y:20}], 
        background: 'concordiaBG.jpg',
        descri: "A Cachoeira da Concórdia é uma das cachoeiras mais bonitas de Guapimirim. Ela fica dentro da Serra dos Órgãos, uma área de montanhas com muita vegetação e rios. A cachoeira é especial porque tem quedas d'água que formam piscinas naturais, onde as pessoas podem tomar banho em águas limpas e refrescantes. Essa cachoeira está cercada por mata atlântica, uma floresta cheia de plantas e animais típicos de lá. Ao longo do caminho até a cachoeira, é possível ver muitas árvores grandes, flores coloridas e ouvir os sons de pássaros. Alguns animais que vivem por lá, podem até ser avistados pelos visitantes. A água da Cachoeira da Concórdia é cristalina, e as pedras ao redor das quedas d’água criam um cenário perfeito para quem gosta de natureza. Como está em uma área protegida, as pessoas que visitam são incentivadas a respeitar o ambiente, não deixando lixo e evitando poluir a água. Isso ajuda a manter a beleza natural do lugar. Além de ser um ótimo ponto de lazer, a cachoeira também é importante para o equilíbrio ambiental da região."
    }
}

export{
    sightData
}