import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { DetailedPokemon, Sprites } from "../../interfaces/pokemon";
import { GetStaticProps, NextPage } from "next";
import { PokemonCard, PokemonDetail } from "../../components/pokemon";

interface Props {
	id: string;
	height: string;
	name: string;
	sprites: Sprites;
	weight: string;
	img: string;
}

const PokemonPage: NextPage<Props> = (props) => {
	return (
		<Layout title="Algun pokemon">
			<PokemonDetail pokemon={props} />
		</Layout>
	);
};

export async function getStaticPaths<GetStaticPaths>() {
	const pokemons151 = [...Array(151)].map((value, idx) => {
		return {
			params: { pokemonId: String(idx + 1) },
		};
	});

	return {
		paths: pokemons151,
		fallback: false,
	};
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { pokemonId } = params as { pokemonId: string };
	const pokemon: DetailedPokemon = await getPokemon(pokemonId);
	const { id, height, name, sprites, weight } = pokemon;

	return {
		props: {
			id,
			height,
			name,
			sprites,
			weight,
			img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
		},
	};
};

async function getPokemon(pokemonId: string) {
	const { data } = await pokeApi.get<DetailedPokemon>(`/pokemon/${pokemonId}`);

	return data;
}
export default PokemonPage;
