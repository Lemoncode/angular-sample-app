import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameSummaryComponent } from './game/game-summary.component';
import { GameStockService } from './services/game-stock.service';
import { GameSellersComponent } from './game/game-sellers.component';

@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent,
    GameSellersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GameStockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
