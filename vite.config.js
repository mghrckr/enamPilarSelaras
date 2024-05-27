import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  // Example configuration options
  server: {
    // This allows Vite to bind to all interfaces, useful for Docker containers
    host: true,
    port: 4173, // Ensure this matches the port you expose in Docker
  },
  preview:{
    host:true,
    port:4173
  }
});
