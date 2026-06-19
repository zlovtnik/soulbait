mak.ONESHELL:

.PHONY: help setup dev preview deploy

PROJECT_NAME = soulbait

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-12s\033[0m %s\n", $$1, $$2}'

setup: ## Create the Cloudflare Pages project on Cloudflare (run once)
	bunx wrangler pages project create $(PROJECT_NAME)

dev: ## Start Vite dev server with HMR (no Cloudflare proxy)
	bun run dev

preview: ## Build static site and serve via Cloudflare Pages dev runtime
	bun run build
	bunx wrangler pages dev dist/

deploy: ## Build and deploy to Cloudflare Pages
	bun run build
	bunx wrangler pages deploy dist/ --branch main
