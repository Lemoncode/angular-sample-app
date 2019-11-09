import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { ISeller } from '../models/seller.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GameStockService {
  constructor(private http: HttpClient) { }

  mapGame = (serverGame: any) => {
    return (serverGame.sellers && serverGame.sellers.length) ?
      new Game(
        serverGame.name,
        serverGame.dateRelease.toString(),
        serverGame.imageUrl,
        serverGame.sellers
      ) :
      new Game(
        serverGame.name,
        serverGame.dateRelease.toString(),
        serverGame.imageUrl,
      );
  };

  mapGames = (serverGames: any[]) => {
    return serverGames.map((sg) => this.mapGame(sg));
  };

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('/api/games/')
      .pipe(
        map(this.mapGames)
      );
  }

  getGame(name: string): Observable<Game> {
    return this.http.get<Game>(`/api/games/${name}`)
      .pipe(
        map(this.mapGame),
      );
  }

  getGameSellers(name: string): Observable<ISeller[]> {
    return this.getGame(name)
      .pipe(
        map(g => g.sellers)
      );
  }

  addGame(game: Game): Observable<Game> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post<Game>(
      '/api/games/',
      game,
      httpOptions
    );
  }
}
