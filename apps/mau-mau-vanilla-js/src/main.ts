import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { shuffleArray } from './logic/utils/shuffle-array.ts'
import { GameController } from './logic/controllers/game-controller.ts'
import { Partida } from './logic/entities/partida.ts'
import { Jogador } from './logic/entities/jogador.ts'
import { PilhaDeDescarte } from './logic/entities/pilha-de-descarte.ts'
import { Baralho } from './logic/entities/baralho.ts'
import { Stack } from './logic/entities/stack.ts'
import { Carta } from './logic/entities/carta.ts'
import { ArrayList } from './logic/entities/array-list.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more ${shuffleArray([0, 1, 2, 3, 4, 5])}
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const baralhoStack = new Stack<Carta>()
const baralho = new Baralho(baralhoStack)
const descarteStack = new Stack<Carta>()
const pilhaDeDescarte = new PilhaDeDescarte(descarteStack)

const jog1List = new ArrayList<Carta>()
const jogador1 = new Jogador(jog1List)
const jog2List = new ArrayList<Carta>()
const jogador2 = new Jogador(jog2List)

const partida = new Partida({ baralho, pilhaDeDescarte, jogadores: [jogador1, jogador2]})
const game = new GameController(partida)

// declare var __game: GameController;

// @ts-ignore
window.__game = game
console.log(game)
