import { defineConfig } from "vitest/config";
import { resolve } from "path";
export default defineConfig({
    resolve: {
        alias: {
            react: resolve(__dirname, "node_modules/react"),
            "react-dom": resolve(__dirname, "node_modules/react-dom"),
            "react-router-dom": resolve(__dirname, "node_modules/react-router-dom"),
            "react-router": resolve(__dirname, "node_modules/react-router")
        },
        dedupe: ["react", "react-dom", "react-router", "react-router-dom"]
    },
    test: {
        globals: true,
        environment: "jsdom",
        include: ["tests/**/*.test.js", "tests/**/*.test.jsx"],
        setupFiles: ["./setup.js"],
        threads: false,
        environmentMatchGlobs: [
            ["**/tests/backend/**", "node"],
            ["**/tests/shared/**", "node"]
        ]
    },
});