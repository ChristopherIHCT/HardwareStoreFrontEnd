import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ICardEvent, ICardCategory } from '../../models/components.interface';
import { IItems } from '../../services/api/items/home-api.interface';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  imports: [
    MatCardModule,
    MatIconModule,
    NgClass,
    NgIf,
    CustomCurrencyPipe,
    FormsModule,
  ],
})
export class CardItemComponent {
  @Input() item?: IItems;
  @Output() clickItem = new EventEmitter<IItems>();

  isSelect = false;

  decreaseQuantity(): void {
    if (this.item && this.item.quantity && this.item.quantity > 0) {
      this.item.quantity -= 1;
      this.item.stock += 1
    }
  }

  increaseQuantity(): void {
    if (this.item && this.item.quantity && this.item.stock > 0) {
      this.item.quantity += 1;
      this.item.stock -= 1
    } else if (this.item && this.item.stock > 0) {
      this.item.quantity = 1;
      this.item.stock -= 1
    }
  }

  addItem(): void {
    this.isSelect = true;
    this.clickItem.emit(this.item);
  }
}
