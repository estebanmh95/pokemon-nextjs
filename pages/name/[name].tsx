import { GetStaticProps, NextPage } from "next";
import React from "react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { PokemonDetail } from "../../components/pokemon";
import { DetailedPokemon, Sprites } from "../../interfaces/pokemon";
import { PokemonAPI } from "../../interfaces/pokemon-list";
import { getPokemon } from "../../utils/getPokemon";

interface Props {
	id: string;
	height: string;
	name: string;
	sprites: Sprites;
	weight: string;
	img: string;
}

const PokemonByNamePage: NextPage<Props> = (props) => {
	return (
		<Layout title={`#${props.id} - ${props.name}`}>
			<PokemonDetail pokemon={props} />
		</Layout>
	);
};

export async function getStaticPaths<GetStaticPaths>() {
	const { data } = await pokeApi.get<PokemonAPI>("/pokemon?limit=151");

	const pokemons151 = data.results.map((value, idx) => {
		return {
			params: { name: value.name },
		};
	});

	return {
		paths: pokemons151,
		fallback: false,
	};
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { name } = params as { name: string };
	const pokemon: DetailedPokemon = await getPokemon(name);
	const { id, height, name: pokemonName, sprites, weight } = pokemon;

	return {
		props: {
			id,
			height,
			name: pokemonName,
			sprites,
			weight,
			img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
		},
	};
};

export default PokemonByNamePage;
