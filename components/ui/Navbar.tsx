import React from "react";
import { useTheme, Text } from "@nextui-org/react";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import { default as NextLink } from "next/link";

export const Navbar = () => {
	const { theme } = useTheme();
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "5px 15px",
				backgroundColor: theme?.colors.gray50.value,
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<NextLink href={"/"}>
					<Link>
						<Image
							width="70px"
							height="70px"
							src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
							alt="ditto image"
						/>
						<Text color="white" h2>
							P
						</Text>
						<Text color="white" h3>
							okémon
						</Text>
					</Link>
				</NextLink>
			</div>
			<NextLink href={"/favorites"}>
				<Link>
					<Text color="white" h4>
						Favoritos
					</Text>
				</Link>
			</NextLink>
		</div>
	);
};
