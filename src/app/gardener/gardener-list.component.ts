import { Gardener } from './../models/gardener';
import { Component, inject } from '@angular/core';
import { GardenerService } from './gardener.service';
@Component({
  selector: 'app-gardener-list',
  standalone: true,
  imports: [],
  template: `
   <h1 class="text-3xl text-red-200">Lista de Jardineiros</h1>
<ul>
  @for (gardener of gardeners ; track gardener.id) {
     <li>
      <h2 class="text-2xl text-red-300">{{ gardener.name }}</h2>
      <h3>{{ gardener.region }}</h3>
      <p>{{ gardener.contact }}</p>
      <p>{{ gardener.specialties }}</p>
      <p>{{ gardener.availability }}</p>
      <button class="btn btn-primary">Button</button>
  </li>
  }
 
</ul>

  `,
  styles: ``
})
export class GardenerListComponent {
  gardeners: Gardener[] = [];
  private gardenerService = inject(GardenerService);

  ngOnInit(): void {
    this.gardenerService.getGardeners().subscribe((data) => {
      this.gardeners = data;
    });
  }
}
