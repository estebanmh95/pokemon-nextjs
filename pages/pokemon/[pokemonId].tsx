import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { DetailedPokemon, Sprites } from "../../interfaces/pokemon";
import { GetStaticProps, NextPage } from "next";
import { PokemonCard, PokemonDetail } from "../../components/pokemon";
import { getPokemon } from "../../utils/getPokemon";

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
		<Layout title={`#${props.id} - ${props.name}`}>
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
		fallback: "blocking",
	};
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { pokemonId } = params as { pokemonId: string };
	const pokemon: DetailedPokemon | null = await getPokemon(pokemonId);

	if (!pokemon) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
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
		revalidate: 86400,
	};
};

export default PokemonPage;
