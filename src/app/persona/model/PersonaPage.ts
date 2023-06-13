import { PersonaDto } from "./PersonaDto";

export class PersonaPage {
    totalPages!: number;
    totalElements!: number;
    size!: number;
    page!: number;
    content!: Array<PersonaDto>;
}