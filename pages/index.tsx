import type { NextPage } from "next";
import { Button, Row, Text } from "@nextui-org/react";
import Image from "next/image";
import { Layout } from "../components/layouts";
import { GetStaticProps } from "next";
import { pokeApi } from "../api";
import { PokemonAPI, SmallPokemon } from "../interfaces/pokemon-list";
import styles from "./index.module.scss";
import { PokemonCard } from "../components/pokemon";
interface Props {
	pokemons: SmallPokemon[];
}
const HomePage: NextPage<Props> = (props) => {
	// console.log(props);
	const { pokemons } = props;
	// console.log(pokemons[0]);

	return (
		<Layout title="Listado de Pokémons">
			<ul className={styles["pokemon-list__container"]}>
				{pokemons.map((pokemon) => (
					<PokemonCard pokemon={pokemon} key={pokemon.id} />
				))}
			</ul>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { data } = await pokeApi.get<PokemonAPI>("/pokemon?limit=151");

	const pokemons = data.results;
	const pokemonLength = pokemons[0].url.split("/").length;
	return {
		props: {
			pokemons: pokemons.map((pokemon) => {
				return {
					...pokemon,
					id: pokemon.url.split("/")[pokemonLength - 2],
					img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
						pokemon.url.split("/")[pokemonLength - 2]
					}.svg`,
				};
			}),
		},
	};
};
export default HomePage;

