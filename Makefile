# ============================================
# PibeLabs Frontend - Makefile
# ============================================

.PHONY: help install dev build preview clean test lint format docker-build docker-run deploy-vercel deploy-netlify

# Default target
.DEFAULT_GOAL := help

# Colors for output
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

## help: Show this help message
help:
	@echo "$(CYAN)PibeLabs Frontend - Available Commands$(NC)"
	@echo ""
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/^## /  $(GREEN)/' | sed 's/:/ $(NC)-/'
	@echo ""

## install: Install dependencies
install:
	@echo "$(CYAN)Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

## dev: Start development server
dev:
	@echo "$(CYAN)Starting development server...$(NC)"
	npm run dev

## build: Build for production
build:
	@echo "$(CYAN)Building for production...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Build complete$(NC)"

## preview: Preview production build
preview:
	@echo "$(CYAN)Starting preview server...$(NC)"
	npm run preview

## clean: Clean build artifacts
clean:
	@echo "$(CYAN)Cleaning build artifacts...$(NC)"
	npm run clean
	@echo "$(GREEN)✓ Clean complete$(NC)"

## clean-all: Clean everything (including node_modules)
clean-all:
	@echo "$(RED)Cleaning everything...$(NC)"
	npm run clean:all
	@echo "$(GREEN)✓ Clean complete$(NC)"

## test: Run tests
test:
	@echo "$(CYAN)Running tests...$(NC)"
	npm run test

## lint: Run linter
lint:
	@echo "$(CYAN)Running linter...$(NC)"
	npm run lint

## lint-fix: Fix linting issues
lint-fix:
	@echo "$(CYAN)Fixing linting issues...$(NC)"
	npm run lint:fix
	@echo "$(GREEN)✓ Linting fixed$(NC)"

## format: Format code with Prettier
format:
	@echo "$(CYAN)Formatting code...$(NC)"
	npm run format
	@echo "$(GREEN)✓ Code formatted$(NC)"

## format-check: Check code formatting
format-check:
	@echo "$(CYAN)Checking code formatting...$(NC)"
	npm run format:check

## type-check: Run TypeScript type checking
type-check:
	@echo "$(CYAN)Running TypeScript type checking...$(NC)"
	npm run type-check
	@echo "$(GREEN)✓ Type checking complete$(NC)"

## quality: Run all quality checks (lint, type-check, format-check)
quality: lint type-check format-check
	@echo "$(GREEN)✓ All quality checks passed$(NC)"

## docker-build: Build Docker image
docker-build:
	@echo "$(CYAN)Building Docker image...$(NC)"
	docker build -t pibelabs-frontend:latest .
	@echo "$(GREEN)✓ Docker image built$(NC)"

## docker-build-dev: Build Docker dev image
docker-build-dev:
	@echo "$(CYAN)Building Docker dev image...$(NC)"
	docker build -f Dockerfile.dev -t pibelabs-frontend:dev .
	@echo "$(GREEN)✓ Docker dev image built$(NC)"

## docker-run: Run Docker container
docker-run:
	@echo "$(CYAN)Running Docker container...$(NC)"
	docker run -d -p 80:80 --name pibelabs-frontend pibelabs-frontend:latest
	@echo "$(GREEN)✓ Container running at http://localhost$(NC)"

## docker-run-dev: Run Docker dev container
docker-run-dev:
	@echo "$(CYAN)Running Docker dev container...$(NC)"
	docker run -d -p 3000:3000 -v $(PWD):/app --name pibelabs-frontend-dev pibelabs-frontend:dev
	@echo "$(GREEN)✓ Dev container running at http://localhost:3000$(NC)"

## docker-stop: Stop Docker container
docker-stop:
	@echo "$(CYAN)Stopping Docker container...$(NC)"
	docker stop pibelabs-frontend pibelabs-frontend-dev 2>/dev/null || true
	docker rm pibelabs-frontend pibelabs-frontend-dev 2>/dev/null || true
	@echo "$(GREEN)✓ Container stopped$(NC)"

## docker-logs: View Docker logs
docker-logs:
	@echo "$(CYAN)Showing Docker logs...$(NC)"
	docker logs -f pibelabs-frontend

## compose-up: Start with docker-compose
compose-up:
	@echo "$(CYAN)Starting with docker-compose...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✓ Services started$(NC)"

## compose-down: Stop docker-compose services
compose-down:
	@echo "$(CYAN)Stopping docker-compose services...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Services stopped$(NC)"

## compose-logs: View docker-compose logs
compose-logs:
	@echo "$(CYAN)Showing docker-compose logs...$(NC)"
	docker-compose logs -f

## deploy-vercel: Deploy to Vercel
deploy-vercel:
	@echo "$(CYAN)Deploying to Vercel...$(NC)"
	npm run deploy:vercel
	@echo "$(GREEN)✓ Deployed to Vercel$(NC)"

## deploy-netlify: Deploy to Netlify
deploy-netlify:
	@echo "$(CYAN)Deploying to Netlify...$(NC)"
	npm run deploy:netlify
	@echo "$(GREEN)✓ Deployed to Netlify$(NC)"

## setup: Complete setup (install + build)
setup: install build
	@echo "$(GREEN)✓ Setup complete$(NC)"

## ci: Run CI checks (quality + build + test)
ci: quality build test
	@echo "$(GREEN)✓ CI checks passed$(NC)"

## stats: Show project statistics
stats:
	@echo "$(CYAN)Project Statistics:$(NC)"
	@echo "  Files: $$(find src -type f | wc -l)"
	@echo "  Lines of code: $$(find src -name '*.tsx' -o -name '*.ts' | xargs wc -l | tail -1)"
	@echo "  Components: $$(find src/components -name '*.tsx' | wc -l)"
	@echo "  Node modules: $$(ls node_modules | wc -l)"

## update: Update dependencies
update:
	@echo "$(CYAN)Updating dependencies...$(NC)"
	npm update
	@echo "$(GREEN)✓ Dependencies updated$(NC)"

## outdated: Check for outdated dependencies
outdated:
	@echo "$(CYAN)Checking for outdated dependencies...$(NC)"
	npm outdated

## security: Run security audit
security:
	@echo "$(CYAN)Running security audit...$(NC)"
	npm audit
	@echo "$(GREEN)✓ Security audit complete$(NC)"
