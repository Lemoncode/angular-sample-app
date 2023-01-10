# Introducción

Vamos a crear un proyecto de arranque en Angular.

Para ellos usaremos el cli de Angular, y después estudiaremos la estructura de, proyecto generado.

# Prerequisitos

- Tener instalado [NodeJS](https://nodejs.org/en/).
- Tener instalado [Visual Studio Code](https://code.visualstudio.com/)

# Paso a paso

- Para crear el proyecto, Angular nos ofrece un _cli_ (command line interface), que nos permite crear proyectos, ejecutar tests, etc. (más información en [https://cli.angular.io/](https://cli.angular.io/).

¿Cómo lo instalamos? Pues muy fácil, simplemente ejecutamos el siguiente comando:

```bash
npm install -g @angular/cli
```

Esto lo que hace es intalar el _cli_ de Angular de forma global en nuestro sistema.

> Nota (I), esto funciona bien desde el CMD de MS-Dos o desde el terminal bash de linux o MacOS, si estás usando power shell puedes tener algun problemilla, [en la página oficial de Angular te explican como solucionarlo](https://angular.io/start).

> Nota (II) en Linux o MacOS, si tienes problemas de permisos, puedes ejecutar el comando con `sudo` delante (así se ejecuta el comando en modo administrador)

- Para ver que está instalado y la versión que tenemos podemos ejecutar el siguiente comando:

```bash
ng version
```

> Si es al primera vez que ejecutas un comando _ng_ te hará un par de preguntas de configuración (si quieres autocomplete, puedes elegir Y, y si quieres enviar informes de errores a Google si algo falla, aquí elije lo que mejor te venga).

Si más adelante necesitamos actualizar el _cli_ podemos ejecutar:

```bash
npm update -g @angular/cli
```

- Una vez instalado, creamos un nuevo proyecto con el siguiente comando:

```bash
ng new game-catalog
```

> Aquí invocamos a la tool _ng_ con _new_ le decimos queremos crear un nuevo proyecto y _game-catalog_ es el nombre del proyecto (se crea un subcarpeta con ese nombre).

Esto nos va a realizar una serie se preguntas:

- ¿Desea agregar Angular routing? (y/n): Angular te puede generar una aplicación SPA con varias páginas y utiliza su propio enrutador, lo normal cuando arranques un proyecto es que si quieras enrutador, si eliges _y_ te genera todo lo necesario, si le das a _n_ más adelante puedes añadirlo pero tendrás que trabajarlo un poco (en este ejemplo partimos de que no lo tenemos), eligimos N.

- ¿Desea usar CSS? (y/n): Angular te permite usar CSS, SASS, LESS, etc. En este caso vamos a usar CSS, en un proyecto de más envergadura lo normal es elegir SASS ya que te permite usar variables, mixins, etc., te es más fácil por ejemplo mantener la imagen coroporativa de tu empresa.

Con esto ya nos crea el proyecto.

El proceso es lento, y realiza una serie de tareas, como por ejemplo, instalar las dependencias, compilar el proyecto, etc.

Un tema que también hace es crear un repositorio git, y hacer un primer commit, si no quieres que lo haga, puedes ejecutar el comando con la opción `--skip-git`:

```bash
ng new game-catalog --skip-git
```

- Una vez creado el proyecto, vamos a ejecutarlo para ver que todo funciona correctamente:

```bash
cd game-catalog
ng serve
```

> La primera vez que ejecutemos también nos preguntará si queremos enviar informes de errores a Google, si quieres puedes elegir lo que mejor te venga.

- Una vez ejecutado, podemos ver que el proyecto se ha creado correctamente, y que podemos acceder a él desde el navegador en la dirección [http://localhost:4200](http://localhost:4200)

- Para parar el servidor, simplemente pulsamos `Ctrl + C`

- Ahora vamos a estudiar la estructura del proyecto, para ello abrimos el proyecto en nuestro editor de código favorito (yo uso Visual Studio Code).

Podemos ver cuatro grandes bloques:

- Unos ficheros en el raiz del proyecto (angular.json, package.json, tsconfig.json, tslint.json, etc.), son configuraciones.
- Una carpeta `src`: aquí tenemos el código fuente de la aplicación.
- Una carpeta `.angular`: aquí tenemos cachés de build y otros ficheros temporales, el cli de angular automaticamente añade esta ruta a su _.gitignore_ para que no se suba al repositorio.
- Una carpeta _.vscode_: settings de workspace de Visual Studio Code para el proyecto.

Nos vamos a centrar en le carpeta _src_ (más adelante se detallan todos los ficheros).

Aquí podemos ver el punto de entrada de la aplicación:

- `index.html`: la página HTML de entrada de la aplicación, aquí se carga el fichero _main.js_ que es el punto de entrada de la aplicación.
- `main.ts`: es el punto de entrada de la aplicación, aquí se carga el módulo principal de la aplicación, que es _app.module.ts_.
- `styles.css`: es el fichero de estilos de la aplicación, aquí se cargan los estilos globales de la aplicación.
- `favicon.ico`: es el icono de la aplicación.

Dentro de la carpeta _app_, iremos añadiendo el código que necesitemos, aquí tenemos el módulo principal de la aplicación:

- `app.component.html`: es el fichero HTML del componente principal de la aplicación.
- `app.component.css`: es el fichero de estilos del componente principal de la aplicación.
- `app.component.spec.ts`: es el fichero de pruebas unitarias del componente principal de la aplicación.
- `app.component.ts`: es el fichero de código del componente principal de la aplicación.
- `app.module.ts`: es el fichero de configuración del módulo principal de la aplicación.

Para finalizar nos queda la carpeta _assets_, aquí iremos añadiendo los ficheros estáticos que necesitemos, como por ejemplo, imágenes, etc.

Fíjate que en esa carpeta lo que tenemos es un fichero _.gitkeep_, esto es para que git no elimine la carpeta cuando no tenga ningún fichero dentro (es un _hack_ aceptado usar esto).

### Detalle ficheros raíz

Si tienes curiosidad para que sirve cada fichero de configuración, aquí tienes un detalle.

- En la raíz del proyecto, podemos ver los siguientes archivos:

  - `angular.json`: Archivo de configuración de Angular, donde podemos ver las configuraciones de los diferentes módulos de Angular, como por ejemplo, el compilador, el servidor de desarrollo, etc.
  - `package.json`: Archivo de configuración de npm, donde podemos ver las dependencias del proyecto, y los scripts que podemos ejecutar.
  - `tsconfig.json`: Archivo de configuración de TypeScript, donde podemos ver las opciones de compilación de TypeScript.
  - `tslint.json`: Archivo de configuración de TSLint, donde podemos ver las reglas de linting de TypeScript.
  - `tsconfig.app.json`: Archivo de configuración de TypeScript para la aplicación.
  - `tsconfig.spec.json`: Archivo de configuración de TypeScript para los tests.
  - `tsconfig.app.json`: Archivo de configuración de TypeScript para la aplicación.
  - `tsconfig.spec.json`: Archivo de configuración de TypeScript para los tests.

### Detalle ficheros en la carpeta `src`

- En la carpeta `src` podemos ver los siguientes archivos:

  - `index.html`: Archivo principal de la aplicación, donde se carga el módulo principal de la aplicación.
  - `main.ts`: Archivo principal de la aplicación, donde se carga el módulo principal de la aplicación.
  - `polyfills.ts`: Archivo que contiene los polyfills necesarios para que la aplicación funcione en todos los navegadores.
  - `styles.css`: Archivo de estilos principal de la aplicación.
  - `test.ts`: Archivo de test principal de la aplicación.

- En la carpeta `src/app` podemos ver los siguientes archivos:

  - `app.component.css`: Archivo de estilos del componente principal de la aplicación.
  - `app.component.html`: Archivo de plantilla del componente principal de la aplicación.
  - `app.component.spec.ts`: Archivo de test del componente principal de la aplicación.
  - `app.component.ts`: Archivo de código del componente principal de la aplicación.
  - `app.module.ts`: Archivo de configuración del módulo principal de la aplicación.

- En la carpeta `src/assets` podemos ver los siguientes archivos:
  - `/.gitkeep`: Archivo que se usa para mantener la carpeta en el repositorio de git.

- En la carpeta `src/environments` podemos ver los siguientes archivos:

  - `environment.prod.ts`: Archivo de configuración de producción.
  - `environment.ts`: Archivo de configuración de desarrollo.

  # ¿Te apuntas a nuestro máster?

Si te ha gustado este ejemplo y tienes ganas de aprender Front End
guiado por un grupo de profesionales ¿Por qué no te apuntas a
nuestro [Máster Front End Online Lemoncode](https://lemoncode.net/master-frontend#inicio-banner)? Tenemos tanto edición de convocatoria
con clases en vivo, como edición continua con mentorización, para
que puedas ir a tu ritmo y aprender mucho.

También puedes apuntarte a nuestro Bootcamp de Back End [Bootcamp Backend](https://lemoncode.net/bootcamp-backend#inicio-banner)

Y si tienes ganas de meterte una zambullida en el mundo _devops_
apuntate nuestro [Bootcamp devops online Lemoncode](https://lemoncode.net/bootcamp-devops#bootcamp-devops/inicio)
