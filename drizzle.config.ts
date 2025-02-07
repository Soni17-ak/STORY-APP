import { defineConfig } from 'drizzle-kit'
export default defineConfig({
    schema:"./config/schema.tsx",
    dialect:'postgresql',
    dbCredentials:{
        url: 'postgresql://neondb_owner:npg_gM7qmIYeC3TU@ep-blue-moon-a87hnkhf-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
    },
    verbose: true,
    strict: true
});