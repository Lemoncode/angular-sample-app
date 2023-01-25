# Interacción con el usuario

Bueno ya sabemos como mostrar datos, hasta incluso podemos mostrar una lista de elmentos.

Vamos ahora a empezar a interactuar con el usuario, para ello vamos a permitir al usuario mostrar una lista de vendedores disponibles para un juego: al pulsar sobre un vendedor se mostrará un modal una lista de los juegos que tiene a la venta.

# Paso a paso

- Partimos del ejemplo anterior, lo copiamos e instalamos las dependencias.

```bash
npm install
```

Vamos a incluir la información de cada seller en el array de juegos, para ellos nos toca actualizar el modelo.

Primero crearemos un interfaz para el modelo de seller.

_./src/app/model/seller.model.ts_

```javascript
export interface Seller {
  id: number;
  name: string;
  price: number;
  amount: number;
  isAvailable: boolean;
}
```

> En este caso hemos creado un interfaz para el modelo de seller porque sólo va a almacenar datos y cero implementación, en estos casos hay desarrolladores que le añaden el prefijo 'I' al interfaz para distinguirlo de la clase, si tienes dudas consulta con tu equipo de desarrollo por que estándar sigues (no existe bala de plata, ambas aproximaciones tienen sus pros y cons, lo importante es ser consistente).

- Vamos a actualizar la entidad game para que tenga una lista de vendedores por cada juego.

_./src/app/model/game.model.ts_

```diff
+ import { Seller } from './seller.model';

export class Game {
  name: string;
  dateRelease: Date;
  imageUrl?: string;
+  sellers?: Seller[];

-  constructor(name: string, dateRelease: string = "", imageUrl? : string)
+  constructor(name: string, dateRelease: string = "", imageUrl? : string
+  sellers?: Seller[])
{
    this.name = name;
    this.dateRelease = new Date(dateRelease);
    this.imageUrl = imageUrl;
+   this.sellers = sellers;
  }

  getYearsFromRelease(): number {
    const milliseconds = Date.now() - this.dateRelease.getTime();
    return this.convertToYears(new Date(milliseconds));
  }

  private convertToYears = (date: Date): number =>
    Math.abs(date.getUTCFullYear() - 1970);
}
```

- Vamos a modificar nuestra semilla de datos mock:

_./src/app/app.component.ts_

```diff
    this.games = [
      new Game(
        'Super Mario Bros',
        '13 September 1985',
        'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/super-mario.webp',
+        [
+          {
+            id: 1,
+            name: 'Old shop',
+            price: 95,
+            amount: 2,
+            isAvailable: true,
+          },
+          {
+            id: 2,
+            name: 'New shop',
+            price: 115,
+            amount: 1,
+            isAvailable: true,
+          },
+          {
+            id: 3,
+            name: 'Regular shop',
+            price: 135,
+            amount: 0,
+            isAvailable: false,
+          }
+        ]
      ),
      new Game(
        'Legend of Zelda',
        '21 February 1986',
        'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/legend-zelda.webp',
+        [
+          {
+            id: 3,
+            name: 'Old shop',
+            price: 125,
+            amount: 0,
+            isAvailable: false,
+          },
+          {
+            id: 4,
+            name: 'New shop',
+            price: 145,
+            amount: 1,
+            isAvailable: true,
+          },
+        ]
      ),
      new Game(
        'Sonic',
        '26 June 1981',
        'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/sonic-frontiers.webp',
        []
      ),
    ];
  }
```

- Ahora vamos a crear un componente que muestre un modal y la lista de sellers.

> De momento lo vamos a crear todo en uno, más adelante aprenderamos a
> dividir esto en dos componentes, un modal, que pueda consumir la lista de sellers u otro componente.

> Lo normal cuando trabajamos con angular es que elijamos una librería de componentes y es esa librería la que nos va a proporcionar los componentes avanzados de UI.

Vamos a crear un componente que llamaremos seller-list.component.ts

Para ello nos vamos a la carpeta app y creamos el componente _seller-list_.

```bash
cd src/app
```

```bash
ng g c seller-list
```

Vamos a definir un componente que muestre un modal con la lista de sellers.

_./src/app/seller-list.component.css_

```css
/** Modal */
.modal {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.modal-close-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
}

/** Overlay */
.overlay {
  opacity: 0.7;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
```

- Sobre este CSS:
  - No es un modal para usar en producción, es un ejemplo para aprender, lo ideal es que uses librerías como Angular Material.
  - Está fuera del alcance de esta formación (no es angular), pero vamos a contaros que es lo que hace.
  - Clase modal:
    - Se posiciona de manera absoluta respecto al primer padre que encuentre posicionado (en esta caso llega al body).
    - Lo posicionamos en la posición 10,0 (left y top).
    - Le damos un ancho de 300 pixeles.
    - Y le damos bordes redondeados y una sombra.
  - Clase modal-close-btn:
    - Se posiciona de manera absoluta respecto al primer padre que encuentre posicionado (en esta caso quedará dentro del modal.).
    - Lo posicionamos en la posición 10,10 (right y top), es decir a la izquierda del modal.
    - Le damos un tamaño de 20 pixeles.
    - Después en el HTML pondremos un emoticon de aspa para indicar que es cierre del modal.
  - Clase _overlay_: esta clase se suele usar en un DIV para envolver a todos los elementos menos el modal y tiene una transparencia para que sea vea que el resto de elementos están deshabilitados.
    - Le damos una opacidad de 0.7.
    - Le aplicamos position fixed (se posiciona respecto a la ventana del navegador).
    - Le aplicamos top, left, right y bottom a 0 y un ancho y alto del 100% para que ocupe toda la ventana.

_./src/app/seller-list.component.html_

```html
<div class="overlay"></div>
<div class="modal">
  <button class="modal-close-btn">✖️</button>
  <h2>Lista de vendedores</h2>
</div>
```

Y vamos a instanciarlo en el app.component.html

```diff
<h1>My application</h1>
<h2>{{ title + "(" + title.length + ")" }})</h2>

<div *ngFor="let game of games">
  <app-card-game [game]="game"></app-card-game>
</div>
+ <app-seller-list></app-seller-list>
```

Vamos a controlar el estado del modal con una variable booleana, en este caso por dar una solución simple lo gestionaremos desde el componente padre, esto nos servirá para aprender como funciona la directiva _ngIf_, en un proyecto real usarías un componente modal de una librería que ya traería encapsulada esta implementación.

_./src/app/app.component.ts_

```diff
export class AppComponent {
  title = 'game-catalog';
  games: Game[];
+ showSellerList: boolean;

  constructor() {
+  this.showSellerList = false;
    this.games = [
```

_./src/app/app.component.html_

```diff
<div *ngFor="let game of games">
  <app-card-game [game]="game"></app-card-game>
</div>

- <app-seller-list></app-seller-list>
+ <app-seller-list *ngIf={showSellerList}></app-seller-list>
```

Si te fijas ya no aparece el modal, ¿Por qué? Porque el valor de _showSellerList_ es _false_.

Vamos a añadir la siguiente funcionalidad: si pinchas en el título del juego, se muestra el diálogo modal, para ello vamos seguir estos pasos:

- En card game vamos a exponer un evento click.
- En el componente padre vamos a escuchar ese evento y cambiar el valor de _showSellerList_ a _true_ cuando se ejecute.
- Dentro del cardgame vamos a añadir un evento click que emita el evento _showSellerList_ cuando pinchemos en el título.
- Lo asociamos al título.

Definimos el evento en cardGame:

- Es un evento de salida (un callback).
- Es de tipo EventEmitter.
- El tipo de dato que va a emitir es un array de Sellers (ya tenemos el dato, otra opción podría haber sido pasarle el nombre del juego)

_./src/app/card-game/card-game.component.ts_

```diff
- import { Component, Input } from '@angular/core';
+ import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../model/game.model';
+ import { Seller } from '../model/seller.model';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css'],
})
export class CardGameComponent {
  @Input() game!: Game;
+ @Output() showSellerList = new EventEmitter< Seller[]>();
}
```

Vamos a definir un handler para el click en el titulo:

_./src/app/card-game/card-game.component.ts_

```diff
export class CardGameComponent {
  @Input() game!: Game;
  @Output() showSellerList = new EventEmitter< Seller[]>();
+
+ onTitleClick() {
+   this.showSellerList.emit(this.game.sellers);
+ }
}
```

Y en el HTML del cardGame vamos a definir el evento click:

_./src/app/card-game/card-game.component.html_

```diff
-  <div class="card_title title-white">
+  <div class="card_title title-white" (click)="onTitleClick()">
    {{ game.name }} ({{ game.getYearsFromRelease() }})
  </div>
```

Ya estamos cerca, vamos ahora recoger el evento de titulo clicado en el componente padre y cambiar el valor de _showSellerList_ a _true_.

_./src/app/app.component.ts_

```diff
+ import { Seller } from './model/seller.model';
// (...)

  ngOnInit(): void {}

+ onShowSellerList(sellers: Seller[]) {
+   this.showSellerList = true;
+ }
}
```

Y lo enganchamos en el HTML:

_./src/app/app.component.html_

```diff
<div *ngFor="let game of games">
-  <app-card-game [game]="game"></app-card-game>
+  <app-card-game [game]="game" (showSellerList)="onShowSellerList($event)"></app-card-game>
</div>
```

Vamos a probarlo...

Ey ! pinchamos en el título y se muestra el diálogo modal (ojo si hacemos scroll más abajo veremos que no se muestra el modal, tenemos que hacer scroll, actualizaremos esto más adelante).

Vamos ahora añadir la funcionalidad para cerrar el modal, en este caso si pinchamos en el bóton de aspa emitiremos un evento desde el componente hijo y lo recogeremos en el componente padre.

Vamos a añadir un evento de salida en el componente hijo:

_./src/app/seller-list/seller-list.component.ts_

```diff
- import { Component } from '@angular/core';
+ import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
})
export class SellerListComponent {
+ @Output() close = new EventEmitter();
}
```

Vamos a implementar el handler para el botón y emitir el evento:

_./src/app/seller-list/seller-list.component.ts_

```diff
export class SellerListComponent {
  @Output() close = new EventEmitter();

+ onCloseClick() {
+   this.close.emit();
+ }
}
```

Y en el HTML

_./src/app/seller-list/seller-list.component.html_

```diff
<div class="overlay"></div>
<div class="modal">
-  <button class="modal-close-btn">✖️</button>
+  <button class="modal-close-btn" (click)="onCloseClick()">✖️</button>
  <h2>Lista de vendedores</h2>
</div>
```

- Y en el componente padre vamos a implementar el handler para el evento de cierre del modal:

_./src/app/app.component.ts_

```diff
  ngOnInit(): void {}

  onShowSellerList(sellers: Seller[]) {
    this.showSellerList = true;
  }

+  onCloseSellerList() {
+    this.showSellerList = false;
+  }
}
```

Y vamos a engancharlo en el HTML:

_./src/app/app.component.html_

```diff
- <app-seller-list *ngIf="showSellerList"></app-seller-list>
+ <app-seller-list *ngIf="showSellerList" (close)="onCloseSellerList()"></app-seller-list>
```

- Nos centramos ahora en mostrar la lista de sellers en el modal.

- Primero tenemos que pasar la lista de sellers al componente modal:

Primero añadimos el parametro al modal

_./src/app/seller-list/seller-list.component.ts_

```diff
- import { Component, EventEmitter, Output } from '@angular/core';
+ import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css'],
})
export class SellerListComponent {
  @Output() close = new EventEmitter();
+ @Input() sellers: Seller[];

+  constructor() {
+    this.sellers = [];
+  }


  onCloseClick(event?: MouseEvent) {
```

- Y a nivel de app vamos a meter la lista de sellers del objeto en el que se pinche en una variable miembro:

_./src/app/app.component.ts_

```diff
export class AppComponent {
  title = 'game-catalog';
  games: Game[];
  showSellerList: boolean;
+ sellers: Seller[];

  constructor() {
    this.showSellerList = false;
+   this.sellers = [];
  }

  ngOnInit(): void {}

  onShowSellerList(sellers: Seller[]) {
+   this.sellers = sellers;
    this.showSellerList = true;
```

_./src/app/app.component.html_

```diff
- <app-seller-list *ngIf="showSellerList" (close)="onCloseSellerList()"></app-seller-list>
+ <app-seller-list *ngIf="showSellerList" (close)="onCloseSellerList()" [sellers]="sellers"></app-seller-list>
```

Para probar rápido que este llegando la lista de sellers vamos a pintarla en el modal:

_./src/app/seller-list/seller-list.component.html_

```diff
<div class="overlay"></div>
<div class="modal">
  <button class="modal-close-btn" (click)="onCloseClick($event)">✖️</button>
  <h2>Lista de vendedores</h2>
+  <ul>
+    <li *ngFor="let seller of sellers">{{ seller.name }}</li>
+  </ul>
</div>
```

- Ejecutamos y todo bien, vamos ahora a darle un poco de estilo a esa lista (aquí lo mismo... os recomendamos que en un proyecto real uséis una librería de componentes de terceros, pero de cara a aprender lo haremos desde cero).

A nivel de estilado:

- Para crear una lista vamos a usar el estándar CSS-Grid.
- Vamos a crear definir 4 columnas, le vamos a darle tamaño fijo a todas las columnas menos a la columna nombre ahí le diremos que coja todo el espacio disponibles (será la única que tenga definido FR), si más adelante quisiéramos dejar esto más fino podríamos usar mediaqueries.
- Vamos a definir una clase para la cabecera de la columna con un color de fondo.

_./src/app/seller-list/seller-list.component.css_

```css
.seller-grid-container {
  display: grid;
  grid-template-columns: 1fr 80px 60px 90px;
  grid-template-rows: auto;
  padding: 10px;
}

.seller-grid-header {
  background-color: #f2f2f2;
}
```

_./src/app/seller-list/seller-list.component.html_

```diff
<div class="overlay"></div>
<div class="modal">
  <button class="modal-close-btn" (click)="onCloseClick($event)">✖️</button>
  <h2>Lista de vendedores</h2>
-  <ul>
-    <li *ngFor="let seller of sellers">{{ seller.name }}</li>
-  </ul>
+  <div class="seller-grid-container">
+    <div class="seller-grid-header">Nombre</div>
+    <div class="seller-grid-header">Cantidad</div>
+    <div class="seller-grid-header">Precio</div>
+    <div class="seller-grid-header">Disponible</div>
+    <div *ngFor="let seller of sellers" class="seller-grid-item">
+      <span>{{ seller.name }}</span>
+      <span>{{ seller.amount }}</span>
+      <span>{{ seller.price }}</span>
+      <span>{{ seller.isAvailable ? "✅" : "✖️" }}</span>
+    </div>
+  </div>
</div>
```

Bueno parece que esta, PEEEEROOOO... ¿Qué ha pasado aquí? Al poner un Div en el ng for nos cargamos el grid de CSS : ¿Cómo podemos hacer para eliminar ese div? Para ello en vez de usar un _div_ vamos a usar un _ng-container_ que es un elemento que no se renderiza en el DOM.

```diff
  <div class="seller-grid-container">
    <div class="seller-grid-header">Nombre</div>
    <div class="seller-grid-header">Cantidad</div>
    <div class="seller-grid-header">Precio</div>
    <div class="seller-grid-header">Disponible</div>
-    <div *ngFor="let seller of sellers" class="seller-grid-item">
+    <ngContainer *ngFor="let seller of sellers" class="seller-grid-item">
      <span>{{ seller.name }}</span>
      <span>{{ seller.amount }}</span>
      <span>{{ seller.price }}</span>
      <span>{{ seller.isAvailable ? "✅" : "✖️" }}</span>
-    </div>
+   </ngContainer>
  </div>
```

- Ahora si que se muestra en cada columna.

- Vamos a terminar tocando un poco de CSS, si te fijas, si hacemos scroll, el dialogo modal se sigue mostrando arriba del todo, para ello cambiamos el position a fixed.

_./src/app/seller-list/seller-list.component.css_

```diff
.modal {
-  position: absolute;
+  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}
```

# Material

Este ejemplo de modal está basado en el siguiente codepen: https://codepen.io/becolomochi/pen/zpEebg

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

También puedes apuntarte a nuestro Bootcamp de Back End [Bootcamp Backend](https://lemoncode.net/bootcamp-backend#inicio-banner)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)

```

```
