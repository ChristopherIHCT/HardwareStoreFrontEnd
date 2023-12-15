//#endregion CARD-CATEGORIES
export interface ICardCategory {
	id: number;
	imageUrl: string;
	name: string;
	status: boolean;
}
//#endregion

//#endregion CARD MENU
export interface ICardMenu {
	title: string;
	nameImage: string;
	path: string;
}
//#endregion

//#endregion CARD-EVENT
export interface ICardEvent {
	idEvent: number;
	urlImage: string;
	title: string;
	description: string;
	date: string;
	hour: string;
	price: number;
	Category: string;
	place: string;
}
//#endregion
