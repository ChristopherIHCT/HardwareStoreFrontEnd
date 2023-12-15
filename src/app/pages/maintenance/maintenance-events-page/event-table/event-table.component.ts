import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IResponseItem } from '../../services/Items/item-api-model.interface';
import { ItemApiService } from '../../services/service-index';
import { ItemsService } from '../items.service';

@Component({
	selector: 'app-event-table',
	templateUrl: './event-table.component.html',
	styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnInit, AfterViewInit {
	@Output() clickUpdate = new EventEmitter();
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	private readonly _ItemApiService = inject(ItemApiService);
	private readonly _ItemsService = inject(ItemsService);

	displayedColumns: string[] = [
		'imageUrl',
		'title',
		'description',
		'dateEvent',
		'ticketsQuantity',
		'price',
		'Category',
		'status',
		'action'
	];
	dataSource = new MatTableDataSource<IResponseItem>();
	resultsLength = 0;

	ngOnInit(): void {
		this._loadItems();

		this._ItemsService.channelCrudEvent$.subscribe(() => {
			this._loadItems();
		});
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	private _loadItems(): void {
		this._ItemApiService.getListItems().subscribe((response) => {
			this.dataSource.data = response.data;
			this.resultsLength = response.data.length;
		});
	}

	clickUpdateEvent(idEvent: number): void {
		this._ItemsService.updateForm(idEvent).subscribe(() => this.clickUpdate.emit());
	}

	clickDelete(idEvent: number): void {
		this._ItemsService.deleteEvent(idEvent).subscribe(() => {
			this._loadItems();
		});
	}

	
}
