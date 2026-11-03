CREATE TABLE "mobiles" (
	"id" serial PRIMARY KEY,
	"brand" text NOT NULL,
	"model" text NOT NULL,
	"ram" integer NOT NULL,
	"storage" integer NOT NULL,
	"price" double precision NOT NULL
);
