import { Component, OnInit, inject } from '@angular/core';
import { CRUD_METHOD } from '../../../../commons/models/enums';
import { CategoryApiService } from '../../services/service-index';
import { ItemsService } from '../items.service';
import { IResponseCategorie } from '../../services/category/category-api-model.interface';

@Component({
	selector: 'app-crud-event',
	templateUrl: './crud-event.component.html',
	styleUrls: ['./crud-event.component.scss']
})
export class CrudEventComponent implements OnInit {
	private _CategoryApiService = inject(CategoryApiService);

	ItemsService = inject(ItemsService);

	listCategorys: IResponseCategorie[] = [];

	ngOnInit(): void {
		this._loadCategorys();
	}

	private _loadCategorys(): void {
		this._CategoryApiService.getCategorys().subscribe((response) => {
			this.listCategorys = response.data;
		});
	}

	onFileSelected(event: Event): void {
		const htmlInput: HTMLInputElement = event.target as HTMLInputElement;
		if (htmlInput && htmlInput.files && htmlInput.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(htmlInput.files[0]);
			reader.onload = () => {
				const resultImageFile = reader.result!.toString();
				this.ItemsService.fileNameField.setValue(htmlInput.files![0].name);
				this.ItemsService.imageUrlField.setValue(resultImageFile);
			};
		}
	}
	clickSave(): void {
		this.ItemsService.saveEvent();
	}

	clickClear(): void {
		this.ItemsService.crudMethod = CRUD_METHOD.SAVE;
		this.ItemsService.itemsFormGroup.reset();
	}
}
