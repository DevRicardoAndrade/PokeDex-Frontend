import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { PokemonsComponent } from '../pages/pokemons/pokemons.component';
import { MeComponent } from '../pages/me/me.component';
import { AuthGuard } from '../services/auth/authGaurd/auth-guard';
import { PokemonComponent } from '../pages/pokemon/pokemon.component';
import { RegisterComponent } from '../pages/register/register.component';

const routes: Routes = [
  {
  path: 'login',
  component: LoginComponent
  },
  {
    path: 'pokemons',
    component: PokemonsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'me',
    component: MeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pokemon/:name',
    component: PokemonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}

export const getRoutes = ():Routes =>{
  return routes;
};