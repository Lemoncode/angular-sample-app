# Introducción

Hemos mostrado datos de una entidad, ¿Pero que pasa si tenemos una colección? Es muy normal querer mostrar una lista de cards, o una tabla con los datos de una colección.

En este ejemplo:

- Vamos iterar por una lista de elementos y mostrar un HTML por cada uno.
- Vamos a encapsular el HTML de cada elemento en un componente.

# Paso a paso

- Partimos del ejemplo anterior lo copiamos (menos la carpeta _node_modules_) y hacemos un _npm install_.

```bash
npm install
```

- Vamos en enriquecer la lista de juegos e incluir la imagen de cada uno.

_./src/app/app.component.ts_

```diff
  constructor() {
    console.log('** Constructor called **');
    this.games = [
-      new Game('Super Mario Bros', '13 September 1985'),
+      new Game('Super Mario Bros', '13 September 1985', 'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/super-mario.webp'),
-      new Game('Legend of Zelda', '21 February 1986'),
+      new Game('Legend of Zelda', '21 February 1986', 'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/legend-zelda.webp'),
-      new Game('Sonic', '26 June 1981'),
+      new Game('Sonic', '26 June 1981', 'https://raw.githubusercontent.com/Lemoncode/angular-sample-app/master/media/sonic-frontiers.webp'),
    ];
  }
```

- Vamos ahora a exponer la lista de juegos como publica y eliminar lo referente a un sólo juego:

_./src/app/app.component.ts_

```diff
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'game-catalog';
-  private games: Game[];
+  games: Game[];
-  game: Game = new Game('');

  constructor() {
-    console.log('** Constructor called **');
```

```diff
  ngOnInit(): void {
-    console.log('** ngOnInit called **');
-    this.game = this.games[0];
  }
```

- Si nos vamos al HTML e intentamos usar interpolación para mostrar la ficha del juego veremos que bueno... nos da algo que no es lo que esperamos:

```diff
<h1>My application</h1>
<h2>{{ title + "(" + title.length + ")" }})</h2>

- <div>
-  <label>Name:</label>
-  <span>{{ game.name }}</span>
- </div>
- <div>
-  <label>Years from release:</label>
-  <span>{{ game.getYearsFromRelease() }}</span>
- </div>
{{games}}
```

Bueno lo que saca por pantalla es la serialización del objeto (un array de objectos):
_[object Object],[object Object],[object Object]_

- Vamos a iterar por la lista de juegos y asignar un componente por cada uno, para ello usamos la directiva _\*ngFor_ en nuestro HTML:
  - Las directivas son atributos que se añaden a un elemento HTML y que modifican su comportamiento (es decir le enseñan trucos nuevos a un elemento de HTML, mientras que los componentes son elementos HTML que tienen su propio comportamiento)
  - _ngFor_ es una directiva estructural, es decir que modifica la estructura del DOM (en este caso añade elementos).

Veámoslo en acción:

_./src/app/app.component.html_

```diff
<h1>My application</h1>
<h2>{{ title + "(" + title.length + ")" }})</h2>
- {{games}}
+ <div *ngFor="let game of games">
+   <img src={{game.imageUrl}}  style="max-width: 240px"/>
+   <p>{{game.name}}</p>
+   <p>{{game.getYearsFromRelease()}}</p>
+ </div>
```

¿Qué estamos haciendo aquí?

- Tenemos un contenedor padre (un _div_), aquí definimos que vamos a iterar por la lista de juegos, y en cada iteración asignamos a la variable _game_ el elemento actual.
- Dentro del contenedor padre tenemos 3 elementos hijos, que se van a repetir por cada elemento de la lista de juegos (la imagen y los dos parrafos).
- En cada elemento hijo usamos la variable _game_ para acceder a las propiedades del elemento actual.
- El elemento hijo se repite tantas veces como elementos haya en la lista de juegos.

Bueno, ya tenemos esto andando en modo básico.

Ahora imaginate que queremos darle estilo a cada juego de la lista, lo suyo sería mostrar cada juego dentro de un card, ¿Qué pasa si intentamos hacer esto en el propio app? Pues nos podemos encontrar con que nuestro componente App acabe con un sphagetthi de código HTML, y que sea muy difícil de mantener, también sería complicado poder reutilizar el componente card en otro sitio.

¿Qué podemos hacer? Pues crear un componente nuevo, que se encargue de mostrar la ficha de un juego, y que lo podamos reutilizar en cualquier otro sitio.

Si antes hicimos uso de nuestra primera directiva, ahora vamos crear nuestro primer componente, lo primero que vamos a hacer es pasar lo que tenemos tal cual a un componente nuevo.

Si intentamos crear un componente de forma manual tendríamos que realizar varios pasos:

- Crear un fichero .ts
- Crear un fichero .html
- Crear un fichero .css
- Crear un fichero .spec.ts (si queremos meter pruebas)
- Registrar el componente en el módulo principal.

Esto además de ser un proceso pesado, es muy propenso a errores, por eso vamos a usar el CLI de Angular para crear el componente.

- Vamos a crear un componente nuevo llamado _card-game_:

```bash
ng generate component card-game
```

Vamos a fijarnos en lo que se ha generado:

En la ruta _app/card-game_ se han creado los siguientes fichero:

- _card-game.component.ts_: La lógica del componente.
- _card-game.component.html_: El HTML del componente.
- _card-game.component.css_ : Los estilos del componente.
- _card-game.component.spec.ts_: El fichero de pruebas del componente.

Y en el fichero _app.module.ts_ se ha registrado el componente.

** Ojo este snippet es solo para referencia **

_./src/app/app.module.ts_

```diff
import { AppComponent } from './app.component';
+ import { CardGameComponent } from './card-game/card-game.component';

@NgModule({
  declarations: [
    AppComponent,
+    CardGameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

Vamos a incluir este componente en nuestro _ngFor_, para saber que selector usar (en esto caso _app-card-game_) podemos verlo en el fichero _card-game.component.ts_, en la entrada _selecrtor_:

_./src/card-game/card-game.component.ts_

** Codigo de referencia, no copiar **

```diff
@Component({
+  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css']
})
export class CardGameComponent {
```

Nos vamos a nuestro _app.component_ y lo introducimos en el _ngFor_:

_./src/app/app.component.html_

```diff
<h1>My application</h1>
<h2>{{ title + "(" + title.length + ")" }})</h2>

<div *ngFor="let game of games">
   <img src={{game.imageUrl}}  style="max-width: 240px"/>
   <p>{{game.name}}</p>
   <p>{{game.getYearsFromRelease()}}</p>
+  <app-card-game></app-card-game>
</div>
```

Si ejecutamos podemos ver que ¡¡eyyy!! se instancia el nuevo componente, vamos ahora a pasar el contenido de la ficha al nuevo componente que hemos creado, aquí nos vamos a dar cuenta de que nos falta algo, y es que el componente no tiene ninguna propiedad, para poder pasarle el juego que queremos mostrar.

_./src/app/card-game/card-game.component.html_

```diff
- <p>card-game works!</p>
+   <img src={{game.imageUrl}}  style="max-width: 240px"/>
+   <p>{{game.name}}</p>
+   <p>{{game.getYearsFromRelease()}}</p>
```

Así que nos vamos a ir al fichero que define la lógica del componente y le vamos a indicar que aceptamos un parametro de entrada, para ello vamos a usar el decorador _@Input_:

_./src/app/card-game/card-game.component.ts_

```diff
- import { Component } from '@angular/core';
+ import { Component, Input } from '@angular/core';
+ import { Game } from '../model/game.model';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css']
})
export class CardGameComponent {
+  @Input() game!: Game;
}
```

> Con el signo de exclamación le estamos diciendo a TypeScript, que si que _game_ no lo he inicializado a null, pero que sabemos lo que estamos haciendo ;) (otra opción habría sido inicializar _game_ a un valor por defecto).

Vamos ahora a por el componente app, y vamos a eliminar el código antiguo y añadir el binding a game para el nuevo componente.

_./src/app/app.component.html_

```diff
<h1>My application</h1>
<h2>{{ title + "(" + title.length + ")" }})</h2>

<div *ngFor="let game of games">
-  <img src="{{ game.imageUrl }}" style="max-width: 240px" />
-  <p>{{ game.name }}</p>
-  <p>{{ game.getYearsFromRelease() }}</p>
-  <app-card-game></app-card-game>
+  <app-card-game [game]="game"></app-card-game>
</div>
```

Vale lo tenemos funcionando, pero hemos metido algo de "magia" de por medio, aunque alguno de estos puntos los veremos en detalles en los siguientes ejemplos, vamos a dar una introducción.

Para poder aceptar un parámetro de entrada en un componente podemos usar dos decoradores:

- @Input: para aceptar un parámetro de entrada
- @Output: para emitir un evento (si por ejemplo queremos que el componente padre sepa que se ha pulsado un botón) (\* veremos esto más adelante).

Ahora podemos ver como hemos usado el binding de propiedad, que es el que hemos usado para pasar el parámetro de entrada, en este caso _game_.

** Este código es de referencia no copiar y pegar en la solución**

El @input en el CardGameComponent

```diff
export class CardGameComponent {
+  @Input() game!: Game;
}
```

En el componente principal lo instanciamos y usamos esa propiedad:

```diff
<div *ngFor="let game of games">
+  <app-card-game [game]="game"></app-card-game>
</div>
```

Ahora viene otro punto de magia este binding cuando lo vamos a usar lo envolvemos entre _corchetes_ y le ponemos el nombre de la propiedad que queremos pasarle, en este caso _game_ ¿Esto por qué? Angular tiene un sistema de property binding, podemos envolver la propiedad entre corchetes o entre paréntesis ¿Qué diferencia hay?

- Si la envolvemos entre corchetes:
  - Es un binding en una dirección, desde la fuente de datos (el objeto) al destino (el componente).
  - Es decir en el caso del ejemplo, estamos indicando que es una propiedad de un objeto, por ejemplo _game.name_.
- Si la envolvemos entre paréntesis:
  - Es un binding en una dirección desde el destino (el componente) hacia la fuente de datos (el objeto).
  - Esto lo podemos usar para leer datos de un _input.value_, o engancharnos a un evento, por ejemplo un botón _(click)="onSave()"_.
- ¿Y si usamos las dos? [()]
  - A esto lo llamamos _banana in a box_ y es un binding en dos direcciones, es decir, si cambia el valor en el componente, se actualiza el objeto y viceversa.
  - Se puede usar en los casos en los que queremos que el valor de un input se actualice en el objeto y viceversa, lo enlazaríamos a la propiedad value.
  - El binding two way genera mucha discusión y controversia, en escenarios sencillos puede ser una solución más que válida.

> Más información: https://stackoverflow.com/questions/35944749/what-is-the-difference-between-parentheses-brackets-and-asterisks-in-angular2

Para finalizar estilar un poco el componente card.

Añadimos un poco de CSS para:

- Mostrar la imagen en como fondo.
- Añadir un borde redondeado.
- Añadir abajo el título del juego y el precio.
- Añadir un efecto de hover.

_./src/app/card-game/card-game.component.css_

```css
.card {
  position: relative;
  margin: 30px auto;
  width: 300px;
  height: 300px;
  border-radius: 40px;
  box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25), -5px -5px 30px 7px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  transition: 0.4s;
}

.card .card_image {
  width: inherit;
  height: inherit;
  border-radius: 40px;
}

.card .card_image img {
  width: inherit;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
}

.card .card_title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 24px;
  top: 80%;
  height: 40px;
  left: 50%;
  width: 90%;
  border-radius: 10px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
}

.card:hover {
  transform: scale(0.9, 0.9);
  box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25), -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
}

.title-white {
  color: white;
}
```

Y modificamos el markup para adptar layout y estilo

_./src/app/card-game/card-game.component.html_

```diff
- <img src="{{ game.imageUrl }}" style="max-width: 240px" />
-<p>{{ game.name }}</p>
-<p>{{ game.getYearsFromRelease() }}</p>
+ <div class="card">
+  <div class="card_image"><img [src]="game.imageUrl" /></div>
+  <div class="card_title title-white">
+    {{ game.name }} ({{ game.getYearsFromRelease() }})
+  </div>
+ </div>
```

Aunque esto está fuera del estudio de Angular, un breve resumen de lo como está montando este CSS:

- Definimos un contenedor _card_ que será el que contiene la imagen y el título, soBre este contenedor:

  - Le damos una posición relativa para que el título se pueda posicionar sobre la imagen, este truco lo emplearemos para el texto del título, que lo posicionaremos en la parte inferior de la imagen.
  - Para simplificar trabajamos en pixeles y le damos un tamaño fijo.
  - Le damos un margen de 30 pixeles para que no aparezca pegado.
  - Esa caja la queremos con los bordes redondeados y de paso le ponemos un efecto de sombra con box-shadow.
  - Le ponemos un cursor de mano para indicar que es un elemento interactivo.
  - Le añadimos una transición para que cuando pasemos el ratón por encima se haga más grande.

- Definimos dentro de es card la imagen de fondo y el título:
  - Para el div de la imagen le indicamos que heredemos el ancho y alto de su contenedor (así la imagen ocupará todo el espacio disponible del card).
  - Le indicamos un border radius de 40px como el padre (aquí podríamos habernos planteado usar _inherit_ también)
  - En la imagen en si lo más destacable es que le indicamos que haga un _object-fit: cover_ para que la imagen se adapte al tamaño de la caja y no se estire.
- Vamos ahora al título, aquí hacemos varias cosas:
  - La más importante: queremos que el título aparezca en la parte inferior de la imagen, para ello usamos _position:absolute_ (que tomara como refrencia el card padre que está como relative) y lo posicionamos en la parte inferior del card y lo movemos hacia arriba con _top: 80%_.
  - Por otro lado para que el div aparezca centrado en la parte inferior del card (al esta en absoluto aparece a la izquierda), lo posicionamos en el centro con _left: 50%_ y lo movemos hacia la izquierda con _transform: translateX(-50%)_.
  - Y ya lo que hacemos es usar un contenedor Flex para centrar el texto vertical y horizontalmente (jugando con _align-items_ y _justify-content_).

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

También puedes apuntarte a nuestro Bootcamp de Back End [Bootcamp Backend](https://lemoncode.net/bootcamp-backend#inicio-banner)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)

