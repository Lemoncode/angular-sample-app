# angular-8-sample-app
Repository to teach Angular 8 fundamentals

## Before start

These demos use angular-cli to avoid related issues ensure that you have installed the right version. To install the latest version:

```bash
npm uninstall -g @angular/cli
npm cache verify
# if npm version is < 5 then use `npm cache clean` 
npm install -g @angular/cli@latest
```

These demos works with angular-cli version __8.3.17__. To install the exact match:

```bash
npm uninstall -g @angular/cli
npm cache verify
# if npm version is < 5 then use `npm cache clean` 
npm install -g @angular/cli@8.3.17
```

## HTTP demos

Demos related with HTTP, work with a local node solution. On __demo 11 HTTP GET__ we explain how to install and get the node server up and running. In order to make more simple its use, we have placed in the root folder,  _under the server folder_, the related files.