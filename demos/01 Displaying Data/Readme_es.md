# Introducción

En este ejemplo vamos a dar nuestros primeros pasos con Angular:

- Instalaremos una serie de plugins de VSCode que nos harán la vida más fácil.
- Definiremos un modelo de datos con TypeScript.
- Mostraremos la información de un juego en pantalla.

# Paso a paso

- Antes de arrancarnos, es buena idea instalar una serie de extensiones de VSCode que están especializadas en mejorar nuestra experiencia de usuario cuando desarrollemos con Angular, hay una extensión de extensiones interesante:

- Angular Essentials:
  - Compendio de extensiones que nos ayudarán a desarrollar con Angular (entre
    otras el [language service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) que incluye autocomplete etc..)
  - https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials

> Si nunca has instalado extensiones en VSCode, aquí va una guía para instalar una extensión de Vscode: https://learn.microsoft.com/es-es/visualstudio/ide/finding-and-using-visual-studio-extensions?view=vs-2022

- Vamos a mostrar los datos de un juego, como estamos trabajando con _TypeScript_ es muy aconsejable crear
  una entidad tipada, para ello vamos a crear un directorio debajo de src al que llamaremos `model` y dentro un fichero `game.model.ts`:

_./src/app/game.model.ts_

```typescript
export class Game {
  name: string;
  dateRelease: Date;
  imageUrl?: string;

  constructor(name: string, dateRelease: string = "", imageUrl?: string) {
    this.name = name;
    this.dateRelease = new Date(dateRelease);
    this.imageUrl = imageUrl;
  }

  getYearsFromRelease(): number {
    const milliseconds = Date.now() - this.dateRelease.getTime();
    return this.convertToYears(new Date(milliseconds));
  }

  private convertToYears = (date: Date): number =>
    Math.abs(date.getUTCFullYear() - 1970);
}
```

> Por nomenclatura y sencillez a la hora de leerlo le añadimos un sufijo _model_ esto es opcional, pero recomendable.

> Hemos definido esta entidad como una clase y le hemos añadido algo de lógica, también se pueden definir como interfaces.

Ahora nos vamos a ir al punto de entrada de la aplicación el _app.component.ts_: Este fichero contiene un componente de Angular, que es una clase que contiene datos y lógica que se encarga de mostrar la información en pantalla.

Vamos a diseccionar el fichero (no copiar este código):

El componente que vamos a crear va a heredar de _Component_, ese componente
base lo importamos de la librería de Angular:

```ts
import { Component } from "@angular/core";
```

El componente lo definimos como una clase, pero le ponemos justo encima un decorador (@Component), en este decorador le indicamos unos parametros de configuración:

- Como se va a llamar el componente, en este caso `app-root`, esto es lo que utilizaremos en el HTML para referenciarlo.
- La ruta del fichero HTML que contiene la plantilla de este componente, es decir un componente tiene este fichero y otro de HTML donde definimos el interfaz de usuarios.
- La ruta del fichero CSS que contiene los estilos de este componente, si en Angular tenemos un sitio para definir estilos globales, y después un css por componente para definir estilos locales (así evitamos el infierno de tener que mantener un fichero global enorme).

Dentro de _AppComponent_ tenemos por defecto definido una propiedad _title_ un string.

```ts
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "game-catalog";
}
```

- Ya que hemos visto la parte de lógica vamos a arrancarnos con la parte de HTML, si te fijas el fichero _app.component.html_ tiene un montón de líneas de código, las vamos a eliminar, partimos de un fichero vació y metemos el siguiente contenido:

_./src/app/app.component.html_

```html
<h1>My application</h1>
```

Si ejecutas la aplicación puedes ver que se muestra el título que hemos definido en vez del contenido anterior de demo.

> Fíjate que si dejas ejecutando el ng-serve automáticamente se va recargando la aplicación si se detectan cambios en los ficheros.

- Vamos ahora a mostrar el contenido de la propiedad _title_ que hay definida en el componente y vamos a mostrar por pantalla, para ello vamos a utilizar la sintaxis de _interpolación_ de Angular, que es la siguiente:

```diff
<h1>My application</h1>
+ <h2>{{ title }}</h2>
```

Si ahora ejecutamos puedes ver que por pantalla aparece tanto _My Application_ como _game-catalog_ (el contenido de la variable _title_), ¿Qué está pasando aquí?

- Las propiedades públicas del componente son visible en el HTML del mismo.

- Con los llaves estamos indicando que queremos mostrar el contenido de una variable, en este caso la variable _title_, esta sintaxis se llama _interpolación_, cuando Angular ve en un HTML de un componente lago escrito entre esas dobles llaves lo evalúa y lo trata de convertir a una cadena de texto para volcarlo en un texto.

- De hecho en la cadena podemos poner una expresión, por ejemplo vamos mostrar el nombre de la variable y la longitud de la misma:

```diff
<h1>My application</h1>
- <h2>{{ title }}</h2>
+ <h2>{{ title + ' (' + title.length + ')'}}</h2>
```

- Fíjate que ahora aparece el texto: _game-catalog (12)_, es decir muestra el título y se calcula la longitud del mismo.

- ¿Y donde se usa mi componente? Vamos a tirar del hilo, si te fijas
  en el decorador hemos definido un selector, que hemos llamado _app-root_, si buscamos este selector lo podemos encontrar en el fichero _index.html_

**No copiar este código, es sólo de referencia**

_./src/index.html_

```html
<body>
  <app-root></app-root>
</body>
```

- Vamos a darle un poco más de vidilla a este componente, vamos a definir una lista de juegos, y vamos a mostrar la ficha del primer juego del array.

Para ello vamos a definir una variable miembro que va a ser privada (de momento) y tendrá un array de juegos, a su vez vamos a definir una variable miembro publica que va a tener el primer juego de la lista.

De primeras definimos las variables miembro:

```diff

import { Component } from '@angular/core';
+ import { Game } from './models/game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'game-catalog';
+  private games: Game[];
+  game: Game;
}
```

> Podemos ver algunos avisos de TypeScript indicando que no hemos definido el tipo de la variable _games_ y _game_, esto es porque no hemos importado el modelo _Game_... en breve lo arreglamos.

Y para inicializar la lista de juegos lo hacemos en el constructor:

```diff
export class AppComponent {
  title = 'game-catalog';
  private games: Game[];
  game: Game;

+  constructor() {
+    this.games = [
+      new Game('Super Mario Bros', '13 September 1985'),
+      new Game('Legend of Zelda', '21 February 1986'),
+      new Game('Sonic', '26 June 1981'),
+    ];
+  }
}
```

En este caso usamos el constructor (algo estándar de ES6 / TypeScript) porque queremos introducir unos valores hardcodeados, ya veremos más adelante que el constructor lo usaremos para inyectar servicios.

A la hora de establecer datos iniciales, lo más habitual es hacerlo en el método _ngOnInit_ que es un método que se ejecuta cuando el componente se _inicializa_,
vamos a usar esto para inicializar la variable _game_ con el primer juego de la lista.

```diff
export class AppComponent {
  title = 'game-catalog';
  private games: Game[];
  game: Game;

  constructor() {
    this.games = [
      new Game('Super Mario Bros', '13 September 1985'),
      new Game('Legend of Zelda', '21 February 1986'),
      new Game('Sonic', '26 June 1981'),
    ];
  }

+  ngOnInit(): void {
+    this.game = this.games[0];
+  }
}
```

- Fíjate que a pesar se que _this.game_ lo inicializamos en el _ngOnInit_ nos sigue saliendo un error, esto porque _game_ no esta inicializado en el constructor, vamos a añadir un fix rápido para que no aparezca (lo inicializamos a un valor por defecto):

```diff
-  game: Game;
+    game: Game = new Game("");
```

> _ngOnInit_ está en el ciclo de vida de Angular, y se invoca cuando se inicializa un componente, es decir cuando se crea el componente y se inyectan las dependencias (se invoca justo después de que el constructor se haya llamado), angular provee de otro punto de entrada llamado _ngOnDestroy_ que se llama para limpiar recursos.

Para comprobar que esto se ejecuta en el orden que hemos comentado, vamos a añadir dos _console.log_ en el constructor y en el _ngOnInit_:

```diff
  constructor() {
+    console.log('** Constructor called **');
    this.games = [
      new Game('Super Mario Bros', '13 September 1985'),
      new Game('Legend of Zelda', '21 February 1986'),
      new Game('Sonic', '26 June 1981'),
    ];
  }
```

```diff
  ngOnInit(): void {
+    console.log('** ngOnInit called **');
    this.game = this.games[0];
  }
```

Ahora si ejecutamos y abrimos la consola del navegador podemos ver que se llama primero el constructor y después el onInit.

Para ellos abrimos las herramientas de desarrollo del navegador y vamos a la pestaña _sources_ en la parte izquierda del arbol elegimos _webpack://_ y en la parte derecha buscamos el fichero _app.component.ts_ y ponemos un breakpoint en el constructor y en el _ngOnInit_, si refrescamos podemos ver como se para.

También podemos depurar usando las tool del navegador.

Bueno ya tenemos los datos, ¿Probamos a mostrarlos?

> En este punto puedes parar el readme o video e intentarlo tu, sólo tendrías que usar interpolación y mostrar _game.name_ y _game.releaseDate_ ¿Te animas?.

Vamos a mostrar esa información en el fichero _app.component.html_:

```diff
<h1>My application</h1>
<h2>{{ title + "(" + title.length + ")" }})</h2>
+ <div>
+  <label>Name:</label>
+  <span>{{ game.name }}</span>
+ </div>
+ <div>
+  <label>Years from release:</label>
+  <span>{{ game.getYearsFromRelease() }}</span>
+ </div>
```

Ahora podemos ver como aparecen estos datos.

Vamos ahora a darle un poco de estilo.

Primero vamos a aplicar un cambio global (queremos que se use en toda la aplicación), vamos a indicar que se usa la fuente _arial_ en el fichero _styles.css_:

_./app/styles.css_

```diff
+ html, body {
+  font-family: arial;
+ }
```

Y ahora vamos a poner las etiquetas _name_ y _years_ en negrita, pero esta vez sólo queremos que ese estilo se aplique en este componente, para ello vamos a crear un fichero _app.component.css_:

_./app/app.component.css_

```css
label {
  font-weight: bold;
}
```

Cuando aprendemos a crear componentes veremos como estos estilos se quedan estancos para el mismo.
