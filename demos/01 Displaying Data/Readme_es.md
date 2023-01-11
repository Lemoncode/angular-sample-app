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

  constructor(name?: string, dateRelease?: string, imageUrl?: string) {
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


