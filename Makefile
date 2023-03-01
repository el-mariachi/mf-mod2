run:
	docker compose up -d
run-dev:
	docker compose -f docker-compose-dev.yml up -d
run-db:
	docker compose -f docker-compose-db.yml up -d
run-admin:
	docker compose -f docker-compose-admin.yml up -d
stop:
	docker compose stop
	docker compose down
