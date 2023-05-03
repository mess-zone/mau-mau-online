import { Evento, Observer, Subject } from '@mess-zone/mau-mau-online-core/src/entities/observer'
import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { ArrayList, Baralho, Carta, GameController, Jogador, Partida, PilhaDeDescarte, Stack } from '@mess-zone/mau-mau-online-core'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header>
<h1>mau mau </h1>
</header>

<div class="container">
  <section class="section">
    <h2>Partida</h2>
    <button id="btnStart">start</button>
    <button id="btnCancel">cancel</button>
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
    <button id="btnPescar0">pescar</button>
    <div id="jog0">

    </div>
  </section>

  <section class="section">
    <h2>Jogador 1</h2>
    <button id="btnPescar1">pescar</button>
    <div id="jog1">

    </div>
  </section>

</div>

`

const btnStart = document.querySelector<HTMLButtonElement>('#btnStart')
const btnCancel = document.querySelector<HTMLButtonElement>('#btnCancel')

const btnPescar0 = document.querySelector<HTMLButtonElement>('#btnPescar0')
const btnPescar1 = document.querySelector<HTMLButtonElement>('#btnPescar1')

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

class ConcreteObserver implements Observer {
  constructor(private subject: Subject) {
    this.subject.addObserver(this);
  }

  public update(evento: Evento): void {
    console.log(`[${evento.tipo}]`, evento.dados);
    updateScreen()
  }

  public unsubscribe(): void {
    this.subject.removeObserver(this);
  }
}

// motifica a tela para se atualizar com o estado atual do jogo
const observer = new ConcreteObserver(partida)


updateScreen()

btnStart.addEventListener('click', () => {
  game.execute('start')
})

btnCancel.addEventListener('click', () => {
  game.execute('cancel')
})

btnPescar0.addEventListener('click', () => {
  game.execute('pescar-padrao', { jogadorIndex: 0 })
})

btnPescar1.addEventListener('click', () => {
  game.execute('pescar-padrao', { jogadorIndex: 1 })
})

function updateScreen() {
  console.log('update screen')
  prePartida.innerHTML = JSON.stringify({
    currentJogador: partida.currentJogador,
    status: partida.status,
  }, null, ' ')
  preBaralho.innerHTML = JSON.stringify(baralho, null, ' ')
  preDescarte.innerHTML = `<div>size: ${pilhaDeDescarte.size()}</div> <div>topo: ${JSON.stringify(pilhaDeDescarte.peek(), null, ' ') }</div><hr/>` + JSON.stringify(pilhaDeDescarte, null, ' ')

  renderCartas(0, [...jogador0.iterator()], preJogador0)
  renderCartas(1, [...jogador1.iterator()], preJogador1)
}

function renderCartas(jogadorIndex: number, list: Carta[], listContainer: HTMLElement) {
  listContainer.innerHTML = ''
  for(const carta of list) {
    const cartaEl = document.createElement('div')
    cartaEl.classList.add('carta')
    cartaEl.innerHTML = `${carta.id} ${carta.naipe} ${carta.numero}`

    const btnDescartar = document.createElement('button')
    btnDescartar.innerText = 'descartar'
    btnDescartar.addEventListener('click', () => {
      console.log('descartar ', carta)
      game.execute('descartar-padrao', { jogadorIndex, cartas:[carta] })
      updateScreen()
    })

    cartaEl.appendChild(btnDescartar)
    listContainer.appendChild(cartaEl) 
  }
}

