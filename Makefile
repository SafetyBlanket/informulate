# Makefile for Supabase Project
SUPABASE_URL := http://localhost:54321
SUPABASE_ANON_KEY := your-anon-key

.PHONY: init start stop status db-push db-generate reset migration-new migration-run studio

all: dev

## Start Supabase locally
start-supabase:
	cp .env ./supabase/functions/.env && \
	cd ./supabase && \
	npx supabase start

stop-supabase:
	cd ./supabase && \
	npx supabase stop

## Start React locally
start-ui:
	cp .env ./user-interface/.env && \
	cd ./user-interface && npm install && npm run dev

dev:
	@echo "Starting Supabase and UI..." && \
	( \
		make start-supabase & \
		make start-ui & \
		wait \
	)

