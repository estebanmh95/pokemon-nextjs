import React, { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

type Props = {
	children?: React.ReactNode | undefined;
	title?: string;
};
const Layout: FC<Props> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title || "Pokemon App"}</title>
				<meta name="author" content="Esteban Marin" />
				<meta
					name="description"
					content={`Informacion sobre el pokemon ${title}`}
				/>
				<meta name="keywords" content={`${title}, pokemon, pokedez`} />
			</Head>

			<Navbar />

			<main
				style={{
					padding: "0px 20px",
				}}
			>
				{children}
			</main>
		</>
	);
};

export default Layout;
