import React, { FC } from "react";
import PokemonCard from "../PokemonCard";
import styles from "./index.module.scss";
import { FavoritePokemon } from "../../../pages/favorites/index";
import { Pokemon } from "../PokemonDetail/index";

interface PokemonProp {
	id: string;
	name: string;
	img: string;
}
interface Props {
	[id: string]: PokemonProp;
}
const PokemonListFav: FC<any> = ({ favPokemon }) => {
	console.log(favPokemon);

	return (
		<ul className={styles["pokemon-list__container"]}>
			{Object.keys(favPokemon).map((pokemonKey: string) => {
				console.log("sss", pokemonKey);

				const { id, name, img } = favPokemon[pokemonKey];
				return (
					<PokemonCard
						key={pokemonKey}
						pokemon={{
							id,
							name,
							img,
							url: "",
						}}
					/>
				);
			})}
		</ul>
	);
};

export default PokemonListFav;
