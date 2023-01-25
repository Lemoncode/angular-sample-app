import { Component } from '@angular/core';
import { Game } from './model/game.model';
import { Seller } from './model/seller.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'game-catalog';
  games: Game[];
  showSellerList: boolean;
  sellers: Seller[];

  constructor() {
    this.showSellerList = false;
    this.sellers = [];

    this.games = [
      new Game(
        'Super Mario Bros',
        '13 September 1985',
        'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/super-mario.webp',
        [
          {
            id: 1,
            name: 'Old shop',
            price: 95,
            amount: 2,
            isAvailable: true,
          },
          {
            id: 2,
            name: 'New shop',
            price: 115,
            amount: 1,
            isAvailable: true,
          },
          {
            id: 3,
            name: 'Regular shop',
            price: 135,
            amount: 0,
            isAvailable: false,
          },
        ]
      ),
      new Game(
        'Legend of Zelda',
        '21 February 1986',
        'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/legend-zelda.webp',
        [
          {
            id: 3,
            name: 'Old shop',
            price: 125,
            amount: 0,
            isAvailable: false,
          },
          {
            id: 4,
            name: 'New shop',
            price: 145,
            amount: 1,
            isAvailable: true,
          },
        ]
      ),
      new Game(
        'Sonic',
        '26 June 1981',
        'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/sonic-frontiers.webp',
        []
      ),
    ];
  }

  ngOnInit(): void {}

  onShowSellerList(sellers: Seller[]) {
    this.sellers = sellers;
    this.showSellerList = true;
  }

  onCloseSellerList() {
    this.showSellerList = false;
  }
}
