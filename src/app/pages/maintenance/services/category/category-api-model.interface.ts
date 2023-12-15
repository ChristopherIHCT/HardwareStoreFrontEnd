//#region  GET CategoryS
export interface IResponseCategorie {
	id: number;
	name: string;
	status: boolean;
}
//#endregion

//#region CREATE Category
export interface IRequestCreateUpdateCategory {
	name: string;
	status: boolean;
}
//#endregion
