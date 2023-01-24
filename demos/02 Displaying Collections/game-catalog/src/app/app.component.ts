import { Component } from '@angular/core';
import { Game } from './model/game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'game-catalog';
  games: Game[];

  constructor() {
    this.games = [
      new Game(
        'Super Mario Bros',
        '13 September 1985',
        'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/super-mario.webp'
      ),
      new Game(
        'Legend of Zelda',
        '21 February 1986',
        'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/legend-zelda.webp'
      ),
      new Game(
        'Sonic',
        '26 June 1981',
        'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/sonic-frontiers.webp'
      ),
    ];
  }

  ngOnInit(): void {}
}
