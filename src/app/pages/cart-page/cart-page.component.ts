import {
  CurrencyPipe,
  DatePipe,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import {
  Component,
  OnInit,
  computed,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

type StateLoadin = 'LOADING' | 'ERROR' | 'EMPTY' | 'READY';
@Component({
  standalone: true,
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
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
    MatPaginatorModule,
    MatTableModule,
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
  @ViewChild('paginator') paginator?: MatPaginator;

  displayedColumns: string[] = [
    'itemCode',
    'itemName',
    'price',
    'quantity',
    'total',
    'imageUrl',
    'actions',
  ];
  stateLoading = signal<StateLoadin>('LOADING');
  dataSource = new MatTableDataSource<IItems>([]); // Inicializa con una matriz vacía

  ngOnInit(): void {
    let datos = this._sessionStorageService.getItems();
    this.dataSource = new MatTableDataSource<IItems>(datos);
  }

  getMessage(): string {
    console.log('---getMessage---');
    return 'Selecciona tu género Hardwareal favorito';
  }
}
