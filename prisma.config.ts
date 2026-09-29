import 'dotenv/config';
import { definePrismaConfig } from "prisma/config";
import { defineConfig } from "@prisma/orm-postgres/config";

export default definePrismaConfig({
  orm: defineConfig({ 
    contract: "./prisma/schema.prisma",
    db: { connection: process.env.DIRECT_URL }
  }),
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
});
