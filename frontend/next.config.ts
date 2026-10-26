import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mantemos o render dinâmico simples: a lista de vagas e a landing leem o
  // SQLite do worker a cada requisição (os dados mudam a cada 2h).
  cacheComponents: false,
  serverExternalPackages: ["@prisma/client", "prisma"],
  // O repositório tem package-lock na raiz e em frontend/ — fixamos a raiz
  // do Turbopack aqui para não herdar a do monorepo por engano.
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
