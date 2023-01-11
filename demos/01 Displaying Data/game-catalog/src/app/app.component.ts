import { Component } from '@angular/core';
import { Game } from './model/game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'game-catalog';
  private games: Game[];
  game: Game = new Game("");

  constructor() {
    console.log('** Constructor called **');
    this.games = [
      new Game('Super Mario Bros', '13 September 1985'),
      new Game('Legend of Zelda', '21 February 1986'),
      new Game('Sonic', '26 June 1981'),
    ];
  }

  ngOnInit(): void {
    console.log('** ngOnInit called **');
    this.game = this.games[0];
  }
}
