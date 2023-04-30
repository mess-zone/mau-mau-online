import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";

// cada carta deve ter um id único, para que o index da carta deixe de ser utilizado na Partida
export interface Carta {
    id: string;
    naipe: Naipe;
    numero: NumeroCarta;
}
  