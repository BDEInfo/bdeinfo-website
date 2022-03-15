import Document, { Html, Head, Main, NextScript } from "next/document";

class MainDocument extends Document {

	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<title>BDE Info</title>
					<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png" />
					<link rel="manifest" href="assets/site.webmanifest" />
					<link rel="mask-icon" href="assets/safari-pinned-tab.svg" color="#5bbad5" />
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#ffffff" />
				</Head>
				<body>
					<Main />
					<NextScript />
					
					<div id="modal-root"></div>
				</body>
			</Html>
		);
	}
}

export default MainDocument;