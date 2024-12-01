import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GardenerService } from './gardener.service';

@Component({
  selector: 'app-gardener-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: ` 
  <div class="container">
  <h2>{{ isEditMode ? 'Editar Jardineiro' : 'Criar Jardineiro' }}</h2>
  <form [formGroup]="gardenerForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label for="name">Nome</label>
      <input id="name" formControlName="name" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="contact">Contato</label>
      <input id="contact" formControlName="contact" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="specialties">Especialidades</label>
      <input
        id="specialties"
        formControlName="specialties"
        class="form-control"
        placeholder="Ex: Paisagismo, poda"
        required
      />
    </div>

    <div class="form-group">
      <label for="region">Região</label>
      <input id="region" formControlName="region" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="availability">Disponibilidade</label>
      <input id="availability" formControlName="availability" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="rating">Avaliação</label>
      <input
        id="rating"
        formControlName="rating"
        type="number"
        class="form-control"
        min="0"
        max="5"
      />
    </div>

    <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Atualizar' : 'Criar' }}</button>
    <button type="button" class="btn btn-secondary" (click)="navigateToGardenerList()">
      Cancelar
    </button>
  </form>
</div>
  
  `,
})
export class GardenerFormComponent implements OnInit {
  gardenerForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private gardenerService: GardenerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.gardenerForm = this.fb.group({
      id: [null], // Só usado em modo de edição
      name: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      specialties: ['', [Validators.required]],
      region: ['', [Validators.required]],
      availability: ['', [Validators.required]],
      rating: [0, [Validators.min(0), Validators.max(5)]],
    });
  }

  navigateToGardenerList(): void {
    this.router.navigate(['/gardener']);
  }

  ngOnInit(): void {
    debugger;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.gardenerService.getGardeners().subscribe((gardeners) => {
        const gardener = gardeners.find((g: any) => g.id === id);
        if (gardener) {
          this.gardenerForm.patchValue(gardener);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.gardenerForm.valid) {
      const gardenerData = this.gardenerForm.value;

      if (this.isEditMode) {
        this.gardenerService
          .updateGardener(gardenerData.id, gardenerData)
          .subscribe(() => {
            this.router.navigate(['/gardener/create']);
          });
      } else {
        // Criação: Remover o campo `id`
        const { id, ...newGardenerData } = gardenerData;
        this.gardenerService.createGardener(newGardenerData).subscribe(() => {
          this.router.navigate(['/gardener/create']);
        });
      }
    }
  }
}
