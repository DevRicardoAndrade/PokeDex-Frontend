import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { FormsModule } from '@angular/forms';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';
import { LoginComponent } from './pages/login/login.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { MeComponent } from './pages/me/me.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonDetailsComponent,
    PokemonsListComponent,
    LoginComponent,
    PokemonsComponent,
    PokemonComponent,
    MeComponent,
    NavBarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
