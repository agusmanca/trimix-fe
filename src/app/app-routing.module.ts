import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmPersonaComponent } from './persona/abm-persona/abm-persona.component';
import { ListaPersonaComponent } from './persona/lista-persona/lista-persona.component';

const routes: Routes = [
  {path: '', component: ListaPersonaComponent},
  {path: 'lista-persona', component: ListaPersonaComponent},
  {path: 'abm-persona/:id', component: AbmPersonaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
