export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

// when running in development, execute to true
// feature toggle different tools for dev vs prod
// e.g. vite hot-reload in dev, prebuilt for prod
