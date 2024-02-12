"use client";
import { ConfigProvider, theme } from "antd";
import { ReactNode, useEffect, useState } from "react";

export default function Theme({ children }: { children: ReactNode }) {
	const [appTheme, setAppTheme] = useState(() => theme.defaultAlgorithm);
	useEffect(() => {
		const query = window.matchMedia("(prefers-color-scheme: dark)");
		if (query.matches) {
			setAppTheme(() => theme.darkAlgorithm);
		}
		const eventHandler = (e: MediaQueryListEvent) => {
			if (e.matches) {
				setAppTheme(() => theme.darkAlgorithm);
			} else {
				setAppTheme(() => theme.defaultAlgorithm);
			}
		};
		query.addEventListener("change", eventHandler);
		return () => {
			query.removeEventListener("change", eventHandler);
		};
	}, []);
	return (
		<ConfigProvider
			theme={{
				cssVar: true,
				algorithm: appTheme,
			}}
		>
			{children}
		</ConfigProvider>
	);
}
