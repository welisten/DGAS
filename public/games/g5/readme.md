# aqui serão relatadas as atividades semanais:

( 1 )-------------------------------------------(      AJUSTES      )-----------------------------------------------------
-----------------------------------------------     (ANDAMENTO)     ------------------------------------------------------

      1 - Limpeza de codigo
      OK    - eliminar var usar apenas let e const
      OK    - deixar os nomes dos dados e funções todas em ingles
      OK    - verificar a conformidade entre a ATIVIDADE e o NOME DAS FUNÇÕES que as executas
      OK    - verificar a conformidade entre Os DADO e os NOME DAS VARIAVEIS que os carregam
      OK    - excluir dados e lógicas irrelevantes
      OK    - verificar formatação do código
      OK    - eliminar console.logs DESNECESSÁRIOS
->          - elencar casos de testes para as funções verificadas
      OK    - compartimentalizar as constantes que demandam tal ação

OK   2 - Implementar uma logica para a definição da escala do mapa Level1

( 2 )------------------------------------(      AJUSTES DE OTIMIZAÇÃO     )-----------------------------------------------
-----------------------------------------------     (CONCLUIDO)     ------------------------------------------------------

OK    1 - Tentar substitur as varias interaçoes sobre o array de objetos por apenas uma interação onde todos os outros arr
             já são definidos
OK    2 - Fazer os imports apenas das contantes necessárias
        OK    - PRELOAD
        OK    - TITLE
        OK    - MAPA MAIN
        OK    - lEVEL 1 
        OK    - MAIN
OK      3 - Estudar as circunstâncias e possibilidades de substituir as variaveis das classe das Cenas do jogo por        variaveis de escopo mais  abstratos

( 3 )------------------------------------(      ATIVIDADES DA SPRIT      )------------------------------------------------
-----------------------------------------------     (ANDAMENTO)     ------------------------------------------------------
      1 -  OK        Salvar variaveis no localStorage para serem capturadas quando o jogo abrir.
                        - Quais ?
                  FINAL       - Nome do jogador (colocar em locais do texto da time line para aumentar a interação com o usuário )
                  OK          - Ultimo ponto passado pelo jogador
                  OK          - Ultima fase jogada pelo jogador
                  OK          - Vida do jogador
                        
                        - Aonde ?
                  FINAL       - Nome            -> Entre o título e o Mapa main
                  OK          - Ultimo ponto    -> Toda vez que um novo ponto entrar em sobreposição com player
                  Ok          - Ultima fase     -> Toda vez que uma fase for terminada
                  OK          - Vida            -> Quando a vida for alterada

      2 - OK      Ajustar personagem ao mudar movimentação(a sprite deve ser posta no local do current_point)
                  OK    - Quando ?
                              - Quando alternado de default para accessible 
                  OK    - Como ?
                              - Atualizando a posição(X,Y) do personagem para os respectivos valores (PlayerState. point_x e point_y) 

      3 -          Logica para Desenvolvedor e Explorar
            OK     Explorar
                        -   Ao se entrar nas areas de exploração a movimentação deve ser setada altomaticamente para default
                              OQUE OCORRERIA SE O BOTÃO DE ALTERNANCIA DE MOVIMENTAÇÃO FOR APERTADO ?
                              COMO A MOVIMENTAÇÃO IRA SE COMPORTAR IMEDIATAMENTE AO SAIR ?
            OK     Desenvolvedor
                        -   Exibir imagem feita no canvas com informações sobre o desenvolvedor e o processo de desenvolvimento
                              - Lembrar que essa comunicação é direcionada ao público alvo (Crianças de 4 - 8 anos)


      4 -  OK      Fase L1 -> à definir

      5 -  OK        Movimentação acesível para fases -> à definir

--------------------------------------------------------------------------------------------------------------------------

PROXIMAS ATIVIDADES:
      - IMPLEMENTAR TIMELINE DO LEVEL 1.
      - IMPLEMENTAR NA UI DO LEVEL1 CONTROLE PARA PAUSAR.
      - REFATORAR TITLE.
      - IMPLEMENTAR O JOGAR NOVAMENTE PARA FASES JÁ JOGADAS.
      - ANIMAÇOES.
      - ELEMENTOS DINAMICOS COMO VIDA, E LIXO.

AJUSTES:
      - SÓ HÁ A NECESSIDADE DE CRIAR AS ANIMAÇOES UMA VEZ POR ISSO O MELHOR LUGAR É EM PRELOAD.
OK    - AJUSTAR PROFUNDIDADE DO PERSONAGEM EM RELAÇÃO AS ARVORES NO LEVEL 1.
      - AJUSTAR ALINHAMENTO DOS Decisions_break NO TILED.
      - REPRODUZIR PASSOS AO ANDAR.
      - MUSICAS PARA LEVEL1.

OTIMIZAÇÂO:
      - AONDE ALOCAR OS ASSETS ?
