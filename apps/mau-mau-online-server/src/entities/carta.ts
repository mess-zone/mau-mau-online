import { Naipe } from "@/entities/naipe";
import { NumeroCarta } from "@/entities/numero-carta";

export interface Carta {
    id: string;
    naipe: Naipe;
    numero: NumeroCarta;
}
