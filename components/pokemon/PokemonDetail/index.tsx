import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Sprites } from "../../../interfaces/pokemon";
import confetti from "canvas-confetti";

export interface Pokemon {
	id: string;
	height: string;
	name: string;
	sprites: Sprites;
	weight: string;
	img: string;
}

interface Props {
	pokemon: Pokemon;
}
const PokemonDetail: FC<Props> = ({ pokemon }) => {
	const [favPokemons, setFavPokemons] = useState(null);

	useEffect(() => {
		const favPokemonClient = JSON.parse(
			localStorage.getItem("favorites") || "{}"
		);
		setFavPokemons(favPokemonClient);
	}, []);

	const handleFavoriteClick = () => {
		const favPokemon = JSON.parse(localStorage.getItem("favorites") || "{}");
		if (favPokemon[pokemon.id]) {
			delete favPokemon[pokemon.id];
			localStorage.setItem("favorites", JSON.stringify(favPokemon));
			setFavPokemons(favPokemon);
		} else {
			confetti({
				zIndex: 999,
				particleCount: 100,
				spread: 160,
				angle: -100,
				origin: {
					x: 1,
					y: 0,
				},
			});
			localStorage.setItem(
				"favorites",
				JSON.stringify({ ...favPokemon, [pokemon.id]: pokemon })
			);
			setFavPokemons({ ...favPokemon, [pokemon.id]: pokemon });
		}
	};

	return (
		<Grid.Container
			css={{
				marginTop: "5px",
			}}
			gap={2}
		>
			<Grid xs={12} sm={4}>
				<Card css={{ padding: "30px" }}>
					<Card.Body>
						<Card.Image
							src={
								pokemon.sprites.other?.dream_world.front_default ||
								"/mp-image.png"
							}
							width="100%"
							height={200}
							alt={pokemon.name}
						/>
					</Card.Body>
				</Card>
			</Grid>

			<Grid xs={12} sm={8}>
				<Card>
					<Card.Header
						css={{ display: "flex", justifyContent: "space-between" }}
					>
						<Text h1 transform="capitalize">
							{pokemon.name}
						</Text>

						<Button
							color={"gradient"}
							ghost={!(!!favPokemons && favPokemons[pokemon.id])}
							onClick={handleFavoriteClick}
						>
							{!!favPokemons && favPokemons[pokemon.id]
								? "En Favoritos"
								: "Guardar en favoritos"}
						</Button>
					</Card.Header>
					<Card.Body>
						<Text size={30}>Sprites:</Text>
						<Container direction="row" display="flex" justify="space-between">
							<Image
								src={pokemon.sprites.front_default}
								alt={pokemon.name}
								height={100}
								width={100}
							></Image>
							<Image
								src={pokemon.sprites.back_default}
								alt={pokemon.name}
								height={100}
								width={100}
							></Image>
							<Image
								src={pokemon.sprites.front_shiny}
								alt={pokemon.name}
								height={100}
								width={100}
							></Image>
							<Image
								src={pokemon.sprites.back_shiny}
								alt={pokemon.name}
								height={100}
								width={100}
							></Image>
						</Container>
					</Card.Body>
				</Card>
			</Grid>
		</Grid.Container>
	);
};

export default PokemonDetail;
