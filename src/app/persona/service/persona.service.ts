import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonaDto } from '../model/PersonaDto';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PersonaPage } from '../model/PersonaPage';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  persona$!: Observable<PersonaDto>;
  personaSubject: Subject<PersonaDto> = new Subject<PersonaDto>();

  personaPage$!: Observable<PersonaPage>;
  personaPageSubject: Subject<PersonaPage> = new Subject<PersonaPage>();
  
  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(public httpServ: HttpClient) {  
      this.persona$ = this.personaSubject.asObservable();
      this.personaPage$ = this.personaPageSubject.asObservable();
  }

  getPersonaById(id: number): Observable<PersonaDto> {
      let subpath: string = `persona/id/${id}`;

      this.httpServ.get<PersonaDto>(subpath).subscribe((personaObs: PersonaDto) => {
          this.personaSubject.next(personaObs);
      });

      return this.persona$;
  }

  getPersonaLst(page: number): Observable<PersonaPage> {
      let subpath: string = `persona/all/${page}`;

      this.httpServ.get<PersonaPage>(subpath).subscribe((personaObs: PersonaPage) => {
          this.personaPageSubject.next(personaObs);
      });

      return this.personaPage$;
  }

  getPersonaByTipoDni(page: number, tipoDni: string): Observable<PersonaPage> {
      let subpath: string = `persona/dni/${page}/${tipoDni}`;
      
      this.httpServ.get<PersonaPage>(subpath).subscribe((personaObs: PersonaPage) => {
          this.personaPageSubject.next(personaObs);
      });

      return this.personaPage$;
  }

  getPersonaByNombre(page: number, name: string): Observable<PersonaPage> {
      let subpath: string = `persona/name/${page}/${name}`;
      
      this.httpServ.get<PersonaPage>(subpath).subscribe((personaObs: PersonaPage) => {
          this.personaPageSubject.next(personaObs);
      });

      return this.personaPage$;
  }

  savePersona(newPersona: PersonaDto): Observable<PersonaDto> {
      let subpath: string = `persona`;
        
      this.httpServ.post<PersonaDto>(subpath, newPersona, { headers: this.headers }).subscribe((personaObs: PersonaDto) => {
          this.personaSubject.next(personaObs);
      });

      return this.persona$;
  }

  updatePersona(id: number, updPersona: PersonaDto): Observable<PersonaDto> {
      let subpath: string = `persona/${id}`;
          
      this.httpServ.put<PersonaDto>(subpath, updPersona, { headers: this.headers }).subscribe((personaObs: PersonaDto) => {
          this.personaSubject.next(personaObs);
      });

      return this.persona$;
  }

  deletePersona(id: number): Observable<boolean> {
      let subpath: string = `persona/${id}`; 
      return this.httpServ.delete<boolean>(subpath);
  }
}
