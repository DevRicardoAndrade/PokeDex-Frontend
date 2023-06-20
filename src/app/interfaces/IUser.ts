import { IPokemonFavorited } from "./IPokemonFavorited"

export interface IUser {
    name:string,
    email:string,
    password:string,
    userName:string
    rules?:Array<Object>
    pokemonFavorited?: Array<IPokemonFavorited>
}
