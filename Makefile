init:
	cp .env.example .env
	make up

up:
	docker-compose up -d

up-prod:
	docker-compose -f docker-compose-prod.yml up -d

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

create-prod:
	# command: make create-pord image_version="1.0.0"
	@[ "${image_version}" ] || ( echo ">> var version is not set"; exit 1 )
	docker build -t brunoferreiras/account-management:${image_version} .
	docker push brunoferreiras/account-management:${image_version}