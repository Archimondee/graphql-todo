CREATE TABLE `users` (
	`id` text,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`is_active` integer DEFAULT true,
	`role` integer DEFAULT 1,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);