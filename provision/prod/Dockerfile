FROM zenika/alpine-chrome:117-with-node

USER root

RUN apk add --update --no-cache openssl1.1-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g corepack
RUN corepack enable

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

ENV NODE_ENV production
ENV SKIP_ENV_VALIDATION 1

RUN pnpm run db:generate \
    && pnpm run build \
    && pnpm prune --prod

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

RUN npx prisma migrate deploy

CMD ["pnpm", "run", "start"]
