export enum ValorCarta {
    As = 'A',
    Dois = '2',
    Tres = '3',
    Quatro = '4',
    Cinco = '5',
    Seis = '6',
    Sete = '7',
    Oito = '8',
    Nove = '9',
    Dez = '10',
    Valete = 'J',
    Rainha = 'Q',
    Rei = 'K'
}

export type ValorCartaStrings = keyof typeof ValorCarta