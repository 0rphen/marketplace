import { Component, OnInit, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items = input<number>(0);
  filter = output<string>();
  search = new FormControl('');

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((res) => {
      if (res) this.filter.emit(res);
    })
  }
}
