import { ICardCategory } from '../../../models/components.interface';
import {
  IHomeItems,
  IHomeCategories,
  IResponseHome,
} from './home-api.interface';

export class ResponseHome {
  categories!: IHomeCategories[];

  constructor(data: IResponseHome) {
    this.categories = data.categories;
  }

  getDataCardEvent(): ICardCategory[] {
    return this.categories.map((cat) => {
      const category: ICardCategory = {
        id: cat.id,
        imageUrl: cat.imageUrl,
        name: cat.name,
        status: cat.status,
      };

      return category;
    });
  }
}
