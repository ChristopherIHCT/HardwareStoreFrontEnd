import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IResponseHome } from '../home/home-api.interface';
import { IResponse } from '../api-models-base.interface';
import { IItems } from './home-api.interface';

export const URL_ITEMS = environment.host + '/Items';
export interface ItemSearchParams {
  ItemName?: string;
  CategoryId?: number;
  Page?: number;
  Rows?: number;
}

@Injectable({ providedIn: 'root' })
export class itemsApiService {
  private _httpClient = inject(HttpClient);

  getItems(params: ItemSearchParams): Observable<IResponse<IItems[]>> {
    let httpParams = new HttpParams();

    // Añadir parámetros a HttpParams si están definidos en 'params'
    if (params.ItemName) {
      httpParams = httpParams.set('ItemName', params.ItemName);
    }
    if (params.CategoryId) {
      httpParams = httpParams.set('CategoryId', params.CategoryId.toString());
    }
    if (params.Page) {
      httpParams = httpParams.set('Page', params.Page.toString());
    }
    if (params.Rows) {
      httpParams = httpParams.set('Rows', params.Rows.toString());
    }

    return this._httpClient
      .get<IResponse<IItems[]>>(URL_ITEMS, {
        params: httpParams,
      })
  }
}
