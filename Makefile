build:
	yarn run build
dev:
	yarn run start
fmt:
	yarn run format
fix:
	yarn run format:fix
install:
	yarn install --frozen-locakfile
search:
	bash ./scripts/crawler.sh
deploy:
	netlify deploy --prod
.PHONY: build
