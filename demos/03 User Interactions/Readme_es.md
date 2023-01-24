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
  pointer-events: none;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  max-width: 300px;
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
  pointer-events: none;
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

Vamos a controlar el estado del modal con una variable booleana, en este caso por dar una solución simple lo gestionremos desde el componente padre, esto nos servirá para aprender como funciona la directiva _ngIf_, en un proyecto real usarías un componente modal de una librería que ya traería encapsulada esta implementación.

_./src_

```diff
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
