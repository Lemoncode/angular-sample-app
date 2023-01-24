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

```javascript
export interface Seller {
  id: number;
  name: string;
  price: number;
  amount: number;
  isAvailable: boolean;
}
```

> En este caso hemos creado un interfaz para el modelo de seller porque sólo va a almacenar datos y cero implementación, en estos casos hay desarrolladores que le añaden el prefijo 'I' al interfaz para distinguirlo de la clase.


****
Modal
https://codepen.io/becolomochi/pen/zpEebg

# ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

También puedes apuntarte a nuestro Bootcamp de Back End [Bootcamp Backend](https://lemoncode.net/bootcamp-backend#inicio-banner)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)