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

Ficheros: _card-game.component.ts, card-game.component.html, card-game.component.css, card-game.component.spec.ts_

Y en el fichero _app.module.ts_ se ha registrado el componente.

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
