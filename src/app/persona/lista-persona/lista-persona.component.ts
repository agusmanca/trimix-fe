import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonaPage } from '../model/PersonaPage';
import { PersonaService } from '../service/persona.service';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {

  public personaPage: PersonaPage = {
      totalElements: 0,
      totalPages: 0,
      size: 0,
      page: 0,
      content: []
  };

  nombre: FormControl<string | null> = new FormControl('', []);
  tipoDni = new FormControl('all', []);

  columnsName: string[] = ['id', 'nombre', 'apellido', 'dni', 'tipoDni', 'fechaNacimiento', 'actualizar', 'eliminar'];

  constructor(public service: PersonaService,
              public router: Router){
  }

  ngOnInit(): void {
      this.listaPersona(0);
  }

  listaPersona(page: number) {
      this.service.getPersonaLst(page).subscribe((p: PersonaPage) => {
          this.personaPage = p;
      });
  }

  filtrarNombre(page: number) {
      let name = this.nombre.value;
      name = (name != null) ? name.trim() : "";

      this.service.getPersonaByNombre(page, name).subscribe({
          next: (p: PersonaPage) => {
              this.personaPage = p;
          },
          error: err => {
            console.log(err);
          }
      });
  }

  filtrarTipoDoc(page: number) {
      let dni = this.tipoDni.value;
      dni = (dni != null) ? dni.trim() : "";
    
      this.service.getPersonaByTipoDni(page, dni).subscribe({
          next: (p: PersonaPage) => {
            this.personaPage = p;
          },
          error: err => {
            console.log(err);
          }
      });
  }

  limpiarFiltro() {
      this.listaPersona(0);
      this.nombre.setValue("");
      this.tipoDni.setValue("all");
  }

  crearPersona() {
    this.router.navigate(['abm-persona', 0]);
  }

  actualizarPersona(id: number) {
    this.router.navigate(['abm-persona', id]);
  }

  eliminarPersona(id: number) {


      Swal.fire({
        title: 'Eliminar Registro',
        text: "Desea eliminar el siguiente registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {

          if (result.isConfirmed) {
              this.service.deletePersona(id).subscribe((result: boolean) => {
                  if(result){
                      this.limpiarFiltro();

                      Swal.fire('Eliminado!',
                                'El registro fue eliminado correctamente.',
                                'success')
                  }
              });
          } 
      })
  }
}
