FROM node:20-slim AS deps
RUN apt-get update \
  && apt-get install -y openssl \
  && apt-get install -y procps

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

FROM deps AS migrations
CMD ["pnpm", "run", "db:migrate:dev"]

FROM migrations AS starter
EXPOSE 3000
CMD ["pnpm", "run", "dev"]
