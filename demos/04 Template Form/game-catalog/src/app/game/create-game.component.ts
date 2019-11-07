import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styles: [`
    em { color: red; }
  `]
})
export class CreateGameComponent {
  @Output() createGameEvent: EventEmitter<any> = new EventEmitter<any>();
  createGame(formValues: any) {
    // console.log(formValues);
    this.createGameEvent.emit(formValues);
  }
}
