FROM zenika/alpine-chrome:117-with-node

USER root

RUN apk add --update --no-cache openssl

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g corepack
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/sync/package.json ./apps/sync/

COPY packages/database/package.json ./packages/database/
COPY packages/eslint-preset/package.json ./packages/eslint-preset/
COPY packages/shared/package.json ./packages/shared/
COPY packages/tsconfig/package.json ./packages/tsconfig/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build:sync

WORKDIR /app/apps/sync

EXPOSE 3001

CMD ["node", "dist/main"]
