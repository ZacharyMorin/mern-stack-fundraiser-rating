build-dev:
	cd client && $(MAKE) build
	cd server && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

###

build-local:
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up

###

build-production:
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build

run-production:
	ENV=production docker-compose -f docker-compose-production.yml up

SSH_STRING:=root@147.182.189.8

ssh:
	ssh $(SSH_STRING)

copy-files:
 scp -r ./* $(SSH_STRING):/root/
