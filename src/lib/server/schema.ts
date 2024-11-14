import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const lead = sqliteTable('lead', {
	id: text('id').primaryKey(),
	createdAt: integer('created_at').notNull(), // Store timestamp as an integer (Unix timestamp)
	name: text('name').notNull(), // Store name as a JSON string
	surname: text('surname').notNull(), // Store other surname as a JSON string
	phone: text('phone').notNull(), // Store other phone as a JSON string
	house: text('house').notNull(), // Store other house as a JSON string
	dob: text('dob').notNull(), // Store other dob as a JSON string
	zip: text('zip').notNull(), // Store other zip as a JSON string
	email: text('email').notNull(), // Store other email as a JSON string
	phoneCode: text('phoneCode').notNull() // Store other phoneCode as a JSON string
});

export type Lead = typeof lead.$inferSelect;

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
