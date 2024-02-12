// import withOffline from "next-offline";
import { join } from "path";
import process from "process";
import { GenerateSW } from "workbox-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, options) => {
		config.plugins.push(
			...[
				!options.isServer &&
					!options.dev &&
					new GenerateSW({
						exclude: [
							"react-loadable-manifest.json",
							"build-manifest.json",
							"app-build-manifest.json",
							/_next\/app/,
							/_next\/server/,
							/\.map$/,
						],
						modifyURLPrefix: {
							"static/": "_next/static/",
							"public/": "_next/public/",
						},
						inlineWorkboxRuntime: true,
						runtimeCaching: [
							{
								urlPattern: /^https?.*/,
								handler: "NetworkFirst",
								options: {
									cacheName: "offlineCache",
									expiration: {
										maxEntries: 200,
									},
								},
							},
						],
						swDest: "./static/service-worker.js",
					}),
			].filter(Boolean)
			// new CopyWebpackPlugin({
			// 	patterns: [{ from: `${join(process.cwd(), ".next/static")}/**/*` }],
			// })
		);
		return config;
	},
};
export default nextConfig;
