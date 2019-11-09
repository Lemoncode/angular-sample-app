import { Component, OnInit } from '@angular/core';
import { GameStockService } from '../services/game-stock.service';
import { Game } from '../models/game.model';
import { ISeller } from '../models/seller.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styles: []
})
export class GameListComponent implements OnInit {
  games: Game[];
  selectedGameInfo: string;
  sellers: ISeller[];

  constructor(private gameStockService: GameStockService) { }

  gameChangeHandler($event) {
    console.log($event);
    this.gameStockService.getGameSellers($event)
      .subscribe((sellers) => {
        this.sellers = (sellers && sellers.length) ? sellers : [];
      });

    this.gameStockService.getGame($event)
      .subscribe((selectedGame) => {
        this.selectedGameInfo = `${selectedGame.name}. Age:${selectedGame.getYearsFromRelease()}`;
      });
  }

  ngOnInit(): void {
    this.gameStockService.getGames()
      .subscribe((games) => this.games = games);
  }
}
