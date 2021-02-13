import { enableProdMode } from '@angular/core';//arranca modo produccion
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';//arancar app

import { AppModule } from './app/app.module';//modulo principal
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//modulo principal a partier del cual arranca la aplicacion
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
