import { LowerCasePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { PATH_BUY_PAGES } from '../../commons/config/path-pages';
import { HomeApiService } from '../../commons/services/api/home/home-api.service';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';
import { IHomeCategories } from 'src/app/commons/services/api/home/home-api.interface';
import { ICardCategory } from 'src/app/commons/models/components.interface';

type StateLoadin = 'LOADING' | 'ERROR' | 'EMPTY' | 'READY';
@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [
    SharedFormCompleteModule,
    CardEventComponent,
    UpperCasePipe,
    LowerCasePipe,
    NgFor,
    NgIf,
  ],
})
export class HomePageComponent implements OnInit {
  listCategories: IHomeCategories[] = [];

  private readonly _homeApiService = inject(HomeApiService);
  private readonly _router = inject(Router);

  stateLoading = signal<StateLoadin>('LOADING');

  titleSignalFunction = computed(() => {
    if (this.stateLoading() === 'LOADING') return 'Cargando las categorias...';
    if (this.stateLoading() === 'ERROR')
      return 'Ocurrio un error, intenta más tarde';
    if (this.stateLoading() === 'EMPTY')
      return 'No hay conciertos disponibles.';

    return 'Selecciona tu categorias';
  });

  ngOnInit(): void {
    this._loadHome();
  }

  clickCard(category: ICardCategory): void {
    console.log(category);
    this._router.navigate([PATH_BUY_PAGES.buyPage.withSlash], {
      state: { category },
    });
  }

  private _loadHome() {
    this._homeApiService.getHome().subscribe({
      next: (response) => {
        this.listCategories = response.categories;
        this.stateLoading.set(
          this.listCategories.length === 0 ? 'EMPTY' : 'READY'
        );
      },
      error: () => {
        this.stateLoading.set('ERROR');
      },
    });
  }

  getMessage(): string {
    console.log('---getMessage---');
    return 'Selecciona tu género Hardwareal favorito';
  }
}
