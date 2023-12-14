import {
  CurrencyPipe,
  DatePipe,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { CustomCurrencyPipe } from '../../commons/pipes/custom-currency.pipe';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';
import {
  ItemSearchParams,
  itemsApiService,
} from 'src/app/commons/services/api/items/items-api.service';
import { CardItemComponent } from 'src/app/commons/components/card-item/card-item.component';
import { IItems } from 'src/app/commons/services/api/items/home-api.interface';
import { SessionStorageService } from 'src/app/commons/services/local/storage/storage.service';

type StateLoadin = 'LOADING' | 'ERROR' | 'EMPTY' | 'READY';
@Component({
  standalone: true,
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss'],
  imports: [
    SharedFormCompleteModule,
    CardItemComponent,
    CustomCurrencyPipe,
    CurrencyPipe,
    DatePipe,
    NgSwitchDefault,
    NgSwitchCase,
    NgSwitch,
    NgFor,
    NgIf,
  ],
})
export default class BuyPageComponent implements OnInit {
  listItems: IItems[] = [];
  searchParams: ItemSearchParams = {
    ItemName: '',
    CategoryId: 0,
    Page: 1,
    Rows: 10,
  };
  private readonly _itemsApiService = inject(itemsApiService);
  private _sessionStorageService = inject(SessionStorageService);
  private readonly _toastEvokeService = inject(ToastEvokeService);

  stateLoading = signal<StateLoadin>('LOADING');

  titleSignalFunction = computed(() => {
    if (this.stateLoading() === 'LOADING') return 'Cargando los articulos...';
    if (this.stateLoading() === 'ERROR')
      return 'Ocurrio un error, intenta más tarde';
    if (this.stateLoading() === 'EMPTY') return 'No hay articulos disponibles.';

    return 'Selecciona tu articulo y su cantidad';
  });

  ngOnInit(): void {
    this._loadItems();
  }

  clickItem(item: IItems): void {
    let items: IItems[] = this._sessionStorageService.getItems();

    const existingItemIndex = items.findIndex((i) => i.id === item.id);

    if (existingItemIndex !== -1) {
      // Si el artículo ya existe, actualiza la cantidad
      items[existingItemIndex].quantity =
        (items[existingItemIndex].quantity || 0) + 1;
    } else {
      // Si el artículo no existe, agrega el nuevo artículo al carrito
      item.quantity = 1; // Establece la cantidad inicial del nuevo artículo
      items.push(item);
    }

    this._sessionStorageService.setItems(items);
    this._toastEvokeService.success(
      'Exitoso',
      'Articulo agregado correctamente'
    );
    this._toastEvokeService.success(
      'Exito',
      'Revisa tu carrito de compra para continuar'
    );
  }

  private _loadItems() {
    const currentState = history.state;

    if (currentState && currentState.category && currentState.category.id) {
      const categoryId = currentState.category.id;
      this.searchParams.CategoryId = categoryId;

      this._itemsApiService.getItems(this.searchParams).subscribe({
        next: (response) => {
          console.log(response);
          this.listItems = response.data;
          this.stateLoading.set(
            this.listItems.length === 0 ? 'EMPTY' : 'READY'
          );
        },
        error: () => {
          this.stateLoading.set('ERROR');
        },
      });
    } else {
    }
  }

  getMessage(): string {
    console.log('---getMessage---');
    return 'Selecciona tu género Hardwareal favorito';
  }
}
