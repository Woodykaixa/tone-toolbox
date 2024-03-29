import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Menu, MenuProps } from "antd";
import classNames from "classnames";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Link from "next/link";
import Script from "next/script";
import Head from "next/head";
import { ConfigProvider, theme } from "antd";
import { once } from "events";
import Sw from "@/sw";
import Theme from "@/stupid-next/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "视唱练耳工具箱",
	manifest: "manifest.json",
};
const items: MenuProps["items"] = [
	{
		key: "index",
		label: <Link href="/">练耳训练</Link>,
	},
	{
		key: "foo",
		label: "更多功能（锐意制作中）",
		disabled: true,
	},
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-CN">
			<Sw />
			<body
				className={classNames(
					inter.className,
					"flex flex-col justify-center p-1 sm:p-4"
				)}
			>
				<AntdRegistry>
					<Theme>
						<Menu
							items={items}
							mode="horizontal"
							className="fixed top-0 left-0 w-full"
						/>
						<div className="w-full max-w-3xl pt-12 self-center min-h-screen">
							{children}
						</div>
					</Theme>
				</AntdRegistry>
			</body>
		</html>
	);
}
