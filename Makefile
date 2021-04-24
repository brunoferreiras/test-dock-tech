up:
	docker-compose up -d

build:
	docker-compose up -d --build

logs:
	docker-compose logs -f

restart:
	docker-compose restart

down:
	docker-compose down

stop:
	docker-compose stop

bash:
	docker-compose exec app bash