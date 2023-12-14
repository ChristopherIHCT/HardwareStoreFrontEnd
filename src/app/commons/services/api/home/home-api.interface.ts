export interface IResponseHome {
	categories: IHomeCategories[];
	success: boolean;
}

export interface IHomeConcerts {
	id: number;
	title: string;
	description: string;
	place: string;
	unitPrice: number;
	genre: string;
	genreId: number;
	dateEvent: string;
	timeEvent: string;
	imageUrl: string;
	ticketsQuantity: number;
	finalized: boolean;
	status: string;
}

export interface IHomeCategories {
	id: number;
	name: string;
	imageUrl: string;
	status: boolean;
}
