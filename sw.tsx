"use client";

import Script from "next/script";
import { useEffect } from "react";

const registerServiceWorker = async () => {
	if (navigator && "serviceWorker" in navigator) {
		try {
			console.log("开始安装 Service worker");
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

export default function Sw() {
	useEffect(() => {
		registerServiceWorker();
	}, []);
	return null;
}
