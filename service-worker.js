const CACHE_NAME = "Nash-Qbank-cache-130918";
const APP_PREFIX = "Nash-Qbank_";

// Install event - cache necessary assets
self.addEventListener("install", (event) => {
	console.log("Service Worker: Installing...");
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			console.log("Service Worker: Fetching assets list");

			const response = await fetch("/Nash-Qbank/assets.txt");
			const text = await response.text();

			const assets = text
				.split("\n")
				.map(line => line.trim().replace(/^"|"[,]$/g, "")) // strip quotes + trailing comma
				.filter(line => line);

			console.log("Service Worker: Caching assets", assets);
			return cache.addAll(assets);
		})()
	);
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
	console.log("Service Worker: Activating...");
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== CACHE_NAME) {
						console.log("Service Worker: Deleting old cache", cache);
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// Fetch event - serve cached content if offline
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) {
				console.log("Service Worker: Serving from cache", event.request.url);
				return response;
			}
			console.log("Service Worker: Fetching from network", event.request.url);
			return fetch(event.request);
		})
	);
});