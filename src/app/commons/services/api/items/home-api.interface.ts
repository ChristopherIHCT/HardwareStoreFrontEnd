export interface IItems {
  id: number;
  itemCode: string;
  itemName: string;
  barCode: string;
  categoryId: number;
  price: number;
  stock: number;
  imageUrl: string;
  quantity?: number;
}
