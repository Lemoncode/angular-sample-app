import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../model/game.model';
import { Seller } from '../model/seller.model';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css'],
})
export class CardGameComponent {
  @Input() game!: Game;
  @Output() showSellerList = new EventEmitter<Seller[]>();

  onTitleClick() {
    this.showSellerList.emit(this.game.sellers);
  }
}
