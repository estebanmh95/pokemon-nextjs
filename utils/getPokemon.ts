import { pokeApi } from "../api";
import { DetailedPokemon } from "../interfaces/pokemon";

export async function getPokemon(param: string) {
	const { data } = await pokeApi.get<DetailedPokemon>(`/pokemon/${param}`);

	return data;
}
