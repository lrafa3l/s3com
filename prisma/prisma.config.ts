// prisma/prisma.config.ts
// Prisma 7 requires migration configuration in a separate config file
// See: https://pris.ly/d/config-datasource
import path from "node:path"
import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: path.join(__dirname, "schema.prisma"),

  migrate: {
    async url() {
      // For migrations, use DATABASE_URL from environment
      return process.env.DATABASE_URL || ""
    },
  },
})
