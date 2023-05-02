export enum Naipe {
    Espadas = 'Espadas',
    Ouros = 'Ouros',
    Copas = 'Copas',
    Paus = 'Paus'
}

export type NaipeStrings = keyof typeof Naipe