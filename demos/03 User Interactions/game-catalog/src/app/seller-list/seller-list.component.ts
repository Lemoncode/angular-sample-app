import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css'],
})
export class SellerListComponent {
  @Output() close = new EventEmitter();

  onCloseClick(event?: MouseEvent) {
    this.close.emit();
  }
}
