import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { ArrayList, Baralho, Carta, GameController, Jogador, Partida, PilhaDeDescarte, Stack } from '@mess-zone/mau-mau-online-core'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header>
<h1>mau mau </h1>
<button id="btnStart">start</button>
<button id="btnCancel">cancel</button>
</header>

<div class="container">
  <section class="section">
    <h2>Partida</h2>
    <pre id="partida">

    </pre>
  </section>

  <section class="section">
    <h2>Baralho</h2>
    <pre id="baralho">

    </pre>
  </section>

  <section class="section">
    <h2>Pilha de Descarte</h2>
    <pre id="descarte">

    </pre>
  </section>

  <section class="section">
    <h2>Jogador 0</h2>
    <pre id="jog0">

    </pre>
  </section>

  <section class="section">
    <h2>Jogador 1</h2>
    <pre id="jog1">

    </pre>
  </section>

</div>

`

const btnStart = document.querySelector<HTMLButtonElement>('#btnStart')
const btnCancel = document.querySelector<HTMLButtonElement>('#btnCancel')
const prePartida = document.querySelector<HTMLButtonElement>('#partida')
const preBaralho = document.querySelector<HTMLButtonElement>('#baralho')
const preDescarte = document.querySelector<HTMLButtonElement>('#descarte')
const preJogador0 = document.querySelector<HTMLButtonElement>('#jog0')
const preJogador1 = document.querySelector<HTMLButtonElement>('#jog1')


let baralhoStack = new Stack<Carta>()
let baralho = new Baralho(baralhoStack)
let descarteStack = new Stack<Carta>()
let pilhaDeDescarte = new PilhaDeDescarte(descarteStack)

let jog0List = new ArrayList<Carta>()
let jogador0 = new Jogador(jog0List)
let jog1List = new ArrayList<Carta>()
let jogador1 = new Jogador(jog1List)

let partida: Partida
let game: GameController


btnStart.addEventListener('click', () => {
  console.log('start')

  baralhoStack = new Stack<Carta>()
  baralho = new Baralho(baralhoStack)
  descarteStack = new Stack<Carta>()
  pilhaDeDescarte = new PilhaDeDescarte(descarteStack)

  jog0List = new ArrayList<Carta>()
  jogador0 = new Jogador(jog0List)
  jog1List = new ArrayList<Carta>()
  jogador1 = new Jogador(jog1List)

  partida = new Partida({ baralho, pilhaDeDescarte, jogadores: [jogador0, jogador1]})
  game = new GameController(partida)

  // @ts-ignore
  window.__game = game
  console.log(game)

  prePartida.innerHTML = JSON.stringify({
    currentJogador: partida.currentJogador,
    status: partida.status,
  }, null, ' ')
  preBaralho.innerHTML = JSON.stringify(baralho, null, ' ')
  preDescarte.innerHTML = JSON.stringify(pilhaDeDescarte, null, ' ')
  preJogador0.innerHTML = JSON.stringify(jogador0, null, ' ')
  preJogador1.innerHTML = JSON.stringify(jogador1, null, ' ')
})


btnCancel.addEventListener('click', () => {
  console.log('cancel')
})

