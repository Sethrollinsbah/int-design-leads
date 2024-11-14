CREATE TABLE `lead` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`phone` text NOT NULL,
	`house` text NOT NULL,
	`dob` text NOT NULL,
	`zip` text NOT NULL,
	`email` text NOT NULL,
	`phoneCode` text NOT NULL
);
