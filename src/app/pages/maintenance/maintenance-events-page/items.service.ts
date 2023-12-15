import { DatePipe } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  ConfirmBoxEvokeService,
  ToastEvokeService,
} from '@costlydeveloper/ngx-awesome-popup';
import { EMPTY, Observable, Subject, concatMap, map, of } from 'rxjs';
import { CRUD_METHOD, STATUS_CRUD } from '../../../commons/models/enums';
import { IResponse } from '../../../commons/services/api/api-models-base.interface';
import {
  IRequestCreateUpdateItem,
  IResponseItem,
} from '../services/Items/item-api-model.interface';
import { ItemApiService } from '../services/service-index';

@Injectable()
export class ItemsService {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _eventApiService = inject(ItemApiService);
  private readonly _datePipe = inject(DatePipe);
  private readonly _confirmBoxEvokeService = inject(ConfirmBoxEvokeService);
  private readonly _toastEvokeService = inject(ToastEvokeService);

  private readonly crudSource = new Subject<boolean>();
  channelCrudEvent$ = this.crudSource.asObservable();

  crudMethod = CRUD_METHOD.SAVE;

  itemsFormGroup = this._formBuilder.nonNullable.group({
    idField: [0, Validators.required],
    itemCode: ['', Validators.required],
    itemName: ['', Validators.required],
    barCode: ['', Validators.required],
    categoryId: [0, Validators.required],
    stock: [0, Validators.required],
    price: [0, Validators.required],
    imageUrl: ['', Validators.required],
    base64Image: [''], // Initially empty as it's optional
    fileName: [''], // Initially empty as it's optional
  });

  deleteEvent(idItem: number): Observable<boolean> {
    return this._confirmBoxEvokeService
      .warning(
        'Evento',
        '¿Esta seguro de eliminar el Evento?',
        'Si',
        'Cancelar'
      )
      .pipe(
        concatMap((responseQuestion) =>
          responseQuestion.success
            ? this._eventApiService.deleteConcert(idItem)
            : EMPTY
        ),
        concatMap((response) => {
          if (response.success) {
            this._toastEvokeService.success(
              'Exito',
              'El evento a sido eliminado'
            );
            return of(true);
          }
          return of(false);
        })
      );
  }

  updateForm(idItem: number): Observable<IResponse<IResponseItem>> {
    return this._eventApiService.getConcert(idItem).pipe(
      map((response) => {
        const eventResponse = response.data;
        this.idField.setValue(eventResponse.id);
        this.itemCodeField.setValue(eventResponse.itemCode);
        this.itemNameField.setValue(eventResponse.itemName);
        this.barCodeField.setValue(eventResponse.barCode);
        this.imageUrlField.setValue(eventResponse.imageUrl);
        this.categoryIdField.setValue(eventResponse.categoryId);
        this.priceField.setValue(eventResponse.price);
        this.stockField.setValue(eventResponse.stock);

        this.crudMethod = CRUD_METHOD.UPDATE;
        return response;
      })
    );
  }

  saveEvent(): void {
    if (this.itemsFormGroup.valid) {
      this._confirmBoxEvokeService
        .warning(
          'Evento',
          '¿Esta seguro de guardar la información?',
          'Si',
          'Cancelar'
        )
        .pipe(
          concatMap((responseQuestion) =>
            responseQuestion.success ? this._getMethod() : EMPTY
          )
        )
        .subscribe(() => {
          this._toastEvokeService.success(
            'Exito',
            'La información ha sido guardada.'
          );
          this.itemsFormGroup.reset();
        });
    }
  }

  private _getMethod(): Observable<IResponse<number>> {
    const idItem = this.idField.value as number;
    const request = this._getRequest();
    return this.crudMethod === CRUD_METHOD.SAVE
      ? this._eventApiService.createConcert(request)
      : this._eventApiService.updateConcert(idItem, request);
  }

  /**
   * En esta función vamos a retornar el evento que deseamos guardar o modificar; en el caso de las imagenes puede que al momento de seleccionar el evento para poder modificarlo solo modifiquen atributos de texto o número por lo tanto el valor de la imagen es solo una URL asi que no se debería de enviar, recuerden que el API necesita un base64 para crear una imagen.
   * @param method
   * @returns
   */
  private _getRequest(): IRequestCreateUpdateItem {
    const request: IRequestCreateUpdateItem = {
      itemCode: this.itemCodeField.value,
      itemName: this.itemNameField.value,
      barCode: this.barCodeField.value,
      categoryId: this.categoryIdField.value,
      stock: this.stockField.value,
      price: this.priceField.value,
      imageUrl: this.imageUrlField.value,
      base64Image: '',
      fileName: this.fileNameField.value,
    };
    const existHttpMitocode = this.imageUrlField.value.search(
      'https://mitocode.blob.core.windows.net'
    );

    if (
      this.crudMethod === CRUD_METHOD.SAVE ||
      (this.crudMethod == CRUD_METHOD.UPDATE && existHttpMitocode === -1)
    ) {
      const base64 = this.imageUrlField.value.split(',')[1];
      request.base64Image = base64;
      request.fileName = this.fileNameField.value!;
    }

    return request;
  }

  //#region
  get idField(): FormControl<number> {
    return this.itemsFormGroup.controls.idField;
  }

  get itemCodeField(): FormControl<string> {
    return this.itemsFormGroup.controls.itemCode;
  }

  get itemNameField(): FormControl<string> {
    return this.itemsFormGroup.controls.itemName;
  }

  get barCodeField(): FormControl<string> {
    return this.itemsFormGroup.controls.barCode;
  }

  get categoryIdField(): FormControl<number> {
    return this.itemsFormGroup.controls.categoryId;
  }

  get stockField(): FormControl<number> {
    return this.itemsFormGroup.controls.stock;
  }

  get priceField(): FormControl<number> {
    return this.itemsFormGroup.controls.price;
  }

  get categoriesField(): FormControl<number> {
    return this.itemsFormGroup.controls.categoryId;
  }

  get imageUrlField(): FormControl<string> {
    return this.itemsFormGroup.controls.imageUrl;
  }

  get base64ImageField(): FormControl<string> {
    return this.itemsFormGroup.controls.base64Image;
  }

  get fileNameField(): FormControl<string> {
    return this.itemsFormGroup.controls.fileName;
  }
  //#endregion
}
