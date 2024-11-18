import { Routes } from '@angular/router';
import { GardenerListComponent } from './gardener/gardener-list.component';
import { GardenerFormComponent } from './gardener/gardener-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'gardener', pathMatch: 'full' }, // Rota padrão redireciona para 'gardener'
    { path: 'gardener', component: GardenerListComponent }, // Listagem de jardineiros
    { path: 'gardener/create', component: GardenerFormComponent }, // Formulário de criação
    { path: 'gardener/edit/:id', component: GardenerFormComponent }, // Formulário de edição
];
