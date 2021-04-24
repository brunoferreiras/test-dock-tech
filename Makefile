up:
	docker-compose up -d

build:
	rm -rf dist/
	docker-compose up -d --build --force-recreate --renew-anon-volumes

logs:
	docker-compose logs -f app

logs-database:
	docker-compose logs -f database

reset-db:
	docker-compose down
	sudo rm -rf .files/database

restart:
	docker-compose restart

down:
	docker-compose down

stop:
	docker-compose stop

bash:
	docker-compose exec app bash