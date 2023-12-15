import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IResponse } from '../../../../commons/services/api/api-models-base.interface';
import { IRequestCreateUpdateItem, IResponseItem } from './item-api-model.interface';

const URL_CONCERT = environment.host + '/Items';

@Injectable()
export class ItemApiService {
	private _httpClient = inject(HttpClient);

	createConcert(event: IRequestCreateUpdateItem): Observable<IResponse<number>> {
		return this._httpClient.post<IResponse<number>>(URL_CONCERT, event);
	}

	updateConcert(idEvent: number, event: IRequestCreateUpdateItem): Observable<IResponse<number>> {
		const url = `${URL_CONCERT}/${idEvent}`;
		return this._httpClient.put<IResponse<number>>(url, event);
	}

	deleteConcert(idEvent: number): Observable<IResponse<number>> {
		const url = `${URL_CONCERT}/${idEvent}`;
		return this._httpClient.delete<IResponse<number>>(url);
	}

	getListItems(page?: number, rows?: number, filter?: string): Observable<IResponse<IResponseItem[]>> {
		let params = new HttpParams();
		if (filter) {
			params = params.set('filter', filter);
		}

		if (page) {
			params = params.set('page', page);
		}

		if (rows) {
			params = params.set('pageSize', rows);
		}

		return this._httpClient.get<IResponse<IResponseItem[]>>(URL_CONCERT, { params });
	}

	getConcert(id: number): Observable<IResponse<IResponseItem>> {
		const url = `${URL_CONCERT}/${id}`;
		return this._httpClient.get<IResponse<IResponseItem>>(url);
	}

	finalizeConcert(idConcert: number): Observable<IResponse> {
		const url = `${URL_CONCERT}/${idConcert}`;
		return this._httpClient.patch<IResponse>(url, {});
	}
}
