import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Menu, MenuProps } from "antd";
import classNames from "classnames";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Link from "next/link";
import Script from "next/script";
import Head from "next/head";

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

const registerServiceWorker = async () => {
	if ("serviceWorker" in navigator) {
		try {
			const registration = await navigator.serviceWorker.register(
				"/_next/static/service-worker.js",
				{
					scope: "/",
				}
			);
			if (registration.installing) {
				console.log("正在安装 Service worker");
			} else if (registration.waiting) {
				console.log("已安装 Service worker installed");
			} else if (registration.active) {
				console.log("激活 Service worker");
			}
		} catch (error) {
			console.error(`注册失败：${error}`);
		}
	}
};

// …

registerServiceWorker();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-CN">
			{/* <Script
				strategy="lazyOnload"
				src="/_next/static/service-worker.js"
			></Script> */}
			<body
				className={classNames(
					inter.className,
					"flex flex-col justify-center p-1 sm:p-4"
				)}
			>
				<AntdRegistry>
					<Menu
						items={items}
						mode="horizontal"
						className="fixed top-0 left-0 w-full"
					/>
					<div className="w-full max-w-3xl pt-12 self-center min-h-screen">
						{children}
					</div>
				</AntdRegistry>
			</body>
		</html>
	);
}
