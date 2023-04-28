import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";

export interface Carta {
    naipe: Naipe;
    numero: NumeroCarta;
}
  