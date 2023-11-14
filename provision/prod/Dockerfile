FROM zenika/alpine-chrome:117-with-node AS builder

USER root
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV SKIP_ENV_VALIDATION 1
ARG NEXT_PUBLIC_WS_URL

RUN pnpm run build

# Production image, copy all the files and run next
FROM zenika/alpine-chrome:102-with-node-16 AS runner
USER root
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app ./

RUN npm run db:migrate:prod

CMD ["npm", "run", "start"]
