import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  categories = input<string[] | undefined>();
  selected = output<string>();

  emitSelected(category: string) {
    this.selected.emit(category)
  }
}
