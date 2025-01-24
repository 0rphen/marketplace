import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  id = input.required<number>();
  src = input.required();
  title = input.required();
  price = input(0);
  description = input();
  setItem = output<number>();

  addToCart() {
    this.setItem.emit(this.id());
  }
}
