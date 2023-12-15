//#region  CREATE  / UPDATE EVENT
export interface IRequestCreateUpdateItem {
  itemCode: string;
  itemName: string;
  barCode: string;
  categoryId: number;
  stock: number;
  price: number;
  imageUrl: string;
  base64Image: string;
  fileName: string;
}

//#endregion

//#region GET LIST Items
export interface IResponseItem {
  id: number;
  itemCode: string;
  itemName: string;
  barCode: string;
  categoryId: number;
  stock: number;
  price: number;
  imageUrl: string;
}

//#endregion
