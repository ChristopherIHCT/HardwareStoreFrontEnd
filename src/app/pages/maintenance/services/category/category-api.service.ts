import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../../../commons/services/api/api-models-base.interface';
import { environment } from '../../../../../environments/environment';
import {
  IResponseCategorie,
  IRequestCreateUpdateCategory,
} from '../../services/category/category-api-model.interface';

export const URL_Category = environment.host + '/Categories';

@Injectable()
export class CategoryApiService {
  private _httpClient = inject(HttpClient);

  createCategory(
    request: IRequestCreateUpdateCategory
  ): Observable<IResponse<number>> {
    return this._httpClient.post<IResponse<number>>(URL_Category, request);
  }

  getCategorys(): Observable<IResponse<IResponseCategorie[]>> {
    return this._httpClient.get<IResponse<IResponseCategorie[]>>(URL_Category);
  }

  getCategory(id: number): Observable<IResponse<IResponseCategorie>> {
    const url = `${URL_Category}/${id}`;
    return this._httpClient.get<IResponse<IResponseCategorie>>(url);
  }

  updateCategory(
    id: number,
    request: Partial<IRequestCreateUpdateCategory>
  ): Observable<IResponse<number>> {
    const url = `${URL_Category}/${id}`;
    return this._httpClient.put<IResponse<number>>(url, request);
  }

  deleteCategory(id: number): Observable<IResponse<number>> {
    const url = `${URL_Category}/${id}`;
    return this._httpClient.delete<IResponse<number>>(url);
  }
}
