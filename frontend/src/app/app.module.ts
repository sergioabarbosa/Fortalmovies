import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaFilmesComponent } from './lista-filmes/lista-filmes.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaFilmesComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
