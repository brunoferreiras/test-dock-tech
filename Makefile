up:
	docker-compose up -d

build:
	docker-compose up -d --build

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