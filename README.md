# linkedin-agentic-ai
LinkedIn Agentic AI is a workflow-driven multi-agent system that automates LinkedIn growth. It researches trends, learns your writing style, generates human-like posts, and creates personalized outreach messages. Built with Node.js, TypeScript, PostgreSQL, embeddings, and OpenAI agents.

Run in Background

docker compose -f infra/docker/docker-compose.dev.yml up -d --build


Check running services:

docker compose -f infra/docker/docker-compose.dev.yml ps


View logs (streaming):

docker compose -f infra/docker/docker-compose.dev.yml logs -f backend


Stop everything:

docker compose -f infra/docker/docker-compose.dev.yml down


Restart only app (without rebuilding):

docker compose -f infra/docker/docker-compose.dev.yml up -d

migrate

docker compose -f infra/docker/docker-compose.dev.yml exec backend npx sequelize-cli db:migrate
