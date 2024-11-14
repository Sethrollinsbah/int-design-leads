import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config();

const conf =
	process.env.NODE_ENV === 'production'
		? defineConfig({
				schema: './src/lib/server/db/schema.ts',
				out: './migrations',
				dialect: 'sqlite',
				driver: 'd1-http',
				dbCredentials: {
					accountId: '0e9b5fad61935c0d6483962f4a522a89',
					databaseId: '07429540-d320-4467-b534-05dbe856ec35',
					token: process.env.CF_TOK || ''
				}
			})
		: defineConfig({
				schema: './src/lib/server/schema.ts',
				out: './migrations',
				dialect: 'sqlite',
				dbCredentials: {
					url: `./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/f3dd23570add2fa1b98bd574fef54125664df892ca951e8f6f672ea9321f8df5.sqlite`
				}
			});

export default conf;
// import { defineConfig } from 'drizzle-kit';
// if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
//
// export default defineConfig({
// 	schema: './src/lib/server/db/schema.ts',
//
// 	dbCredentials: {
// 		url: process.env.DATABASE_URL
// 	},
//
// 	verbose: true,
// 	strict: true,
// 	dialect: 'sqlite'
// });
