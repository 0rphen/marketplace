import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent {
  amount = this.data.amount || 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { title: string, amount?:number },
    private readonly dialogRef: MatDialogRef<AddToCartComponent>
  ) {}

  toggleAmount(amount:number) {
    if (amount >= 0) this.amount = amount;
  }

  close() {
    this.dialogRef.close(this.amount);
  }
}
