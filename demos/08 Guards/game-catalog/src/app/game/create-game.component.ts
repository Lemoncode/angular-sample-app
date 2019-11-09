import { Component } from '@angular/core';
import { GameStockService } from '../services/game-stock.service';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styles: [`
    em { color: red; }
  `]
})
export class CreateGameComponent {
  constructor(private gameStockService: GameStockService) {}

  createGame(formValues: any) {
    const game = this.mapper(formValues);
    this.gameStockService.addGame(game);
  }

  private mapper(formValues: any): Game {
    return new Game(formValues.name, formValues.daterelease, formValues.imageUrl);
  }
}
