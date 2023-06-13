import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaDto } from '../model/PersonaDto';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-abm-persona',
  templateUrl: './abm-persona.component.html',
  styleUrls: ['./abm-persona.component.css']
})
export class AbmPersonaComponent implements OnInit {

    public mainForm!: FormGroup;  
    public personaId: number = 0;
    public isUpdate: boolean = false;

    public personaDto!: PersonaDto;

    public txtBtnValue: string = 'Guardar';

    public title: string = "Ingrese Un Nuevo Usuario";

    constructor(public fb: FormBuilder, 
                public activeRouter: ActivatedRoute,
                public router: Router,
                public service: PersonaService) {

        this.activeRouter.params.subscribe((param) => {
            this.personaId = param['id'];
        });          
  
        this.mainForm = fb.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            dni: ['', [Validators.max(99999999), Validators.min(1111111)]],
            tipoDni: ['', Validators.required],
            fechaNacimiento: ['']
        });
    }

    ngOnInit(): void {
        if(this.personaId > 0) {
            this.service.getPersonaById(this.personaId).subscribe((p: PersonaDto) => {
                if(p) {
                  this.mainForm.get('nombre')?.setValue(p.nombre);
                  this.mainForm.get('apellido')?.setValue(p.apellido);
                  this.mainForm.get('dni')?.setValue(p.dni);
                  this.mainForm.get('tipoDni')?.setValue(p.tipoDni);
                  this.mainForm.get('fechaNacimiento')?.setValue(p.fechaNacimiento);
                
                  this.txtBtnValue = 'Actualizar';
                  this.title = "Actualizar Usuario";
                  this.isUpdate = true;
                }
            });
        }
    }

    submitProcess(): void {
        if(this.mainForm.invalid){
          return
        }
  
        if(this.isUpdate) {
            this.service.updatePersona(this.personaId, this.setPersonaValue(this.personaId)).subscribe(() => {
              this.router.navigate(['lista-persona']);
            });
        } else {
            this.service.savePersona(this.setPersonaValue(0)).subscribe(() => {
                this.router.navigate(['lista-persona']);
            });
        }
    }

    setPersonaValue(id: number): PersonaDto {
        return {
            id: id,
            nombre: this.mainForm.get('nombre')?.value,
            apellido: this.mainForm.get('apellido')?.value,
            dni: this.mainForm.get('dni')?.value,
            tipoDni: this.mainForm.get('tipoDni')?.value,
            fechaNacimiento: this.mainForm.get('fechaNacimiento')?.value
        }
    }
}
