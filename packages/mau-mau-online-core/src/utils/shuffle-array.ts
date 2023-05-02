/**
 * Utiliza o algoritmo de Fisher-Yates para embaralhar um array
 * @param array 
 * @returns novo array embaralhado
 */
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]; // cria uma cópia do array original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // escolhe um índice aleatório entre 0 e i
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // troca os elementos nas posições i e j
    }
    return shuffled;
}