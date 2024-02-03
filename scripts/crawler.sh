docker run -it --env-file=./scripts/.env -e "CONFIG=$(cat ./scripts/config.json | jq -r tostring)" algolia/docsearch-scraper
