import { Naipe } from "@/entities/naipe";
import { ValorCarta } from "@/entities/valor-carta";

export interface Carta {
    naipe: Naipe;
    valor: ValorCarta;
}
  