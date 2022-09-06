import { Text } from "@nextui-org/react";
import React from "react";
import { Layout } from "../../components/layouts";
import { PokemonCard, PokemonListFav } from "../../components/pokemon";
import { Pokemon } from "../../components/pokemon/PokemonDetail";

export interface FavoritePokemon {
	[id: string]: Pokemon;
}

const FavoritesPage = () => {
	let favPokemon: FavoritePokemon = {};

	if (typeof window !== "undefined") {
		favPokemon = JSON.parse(localStorage.getItem("favorites") || "{}");
	}

	return (
		<Layout title="Pokemones Favoritos">
			{Object.keys(favPokemon).length === 0 ? (
				<Text
					h1
					style={{
						position: "absolute",
						top: "400px",
						left: "40%",
					}}
				>
					No hay favoritos
				</Text>
			) : (
				<PokemonListFav favPokemon={favPokemon} />
			)}
		</Layout>
	);
};

export default FavoritesPage;
