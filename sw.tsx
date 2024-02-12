"use client";

import { useEffect } from "react";

const registerServiceWorker = async () => {
	if (navigator && "serviceWorker" in navigator) {
		try {
			const registration = await navigator.serviceWorker.register("sw.js", {
				scope: "/",
			});
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
