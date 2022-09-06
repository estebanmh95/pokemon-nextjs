import { Row, Text } from "@nextui-org/react";
import Image from "next/image";
import React, { FC } from "react";
import { SmallPokemon } from "../../../interfaces/pokemon-list";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

interface Props {
	pokemon: SmallPokemon;
}
const PokemonCard: FC<Props> = ({ pokemon }) => {
	const router = useRouter();
	const onClick = () => {
		router.push(`pokemon/${pokemon.id}`);
	};
	return (
		<li className={styles["pokemon-list__card"]} onClick={onClick}>
			<h3>{pokemon.name}</h3>
			<Image
				width="200px"
				height="200px"
				src={pokemon.img}
				alt={`${pokemon.name} image`}
			/>
			<Row justify="space-between">
				<Text transform="capitalize">{pokemon.name}</Text>
				<Text>#{pokemon.id}</Text>
			</Row>
		</li>
	);
};

export default PokemonCard;
