PROJECTNAME := $(shell basename "$(PWD)")
OS := $(shell uname -s | awk '{print tolower($$0)}')
GOARCH := amd64

## help: helper
.PHONY: help
all: help
help: Makefile
	@echo
	@echo " Project: ["$(PROJECTNAME)"]"
	@echo " Please choose a command"
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo

## dup: docker compose up
.PHONY: dup
dup:
	docker-compose up -d

## ddown: docker compose down
.PHONY: ddown
ddown:
	docker-compose down

## dps: docker compose ps
.PHONY: dps
dps:
	docker-compose ps -a

## loadtest: execete loadtest
.PHONY: loadtest
loadtest:
	docker-compose run --rm -T k6 run /k6-scripts/sample.js
