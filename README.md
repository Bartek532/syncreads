<h2 align="center">RSSmarkable - open source app for syncing feeds</h2>

## Project Overview 🎨

This is project is fully open source app which can be used to sync the newest articles from favourites feeds into [reMarkable](https://remarkable.com) tablet. Feel free to open an [issue](https://github.com/Bartek532/rssmarkable/issues) or directly make a [pull request](https://github.com/Bartek532/rssmarkable/pulls). Enjoy!

## Contributing

Please read [CONTRIBUTING.md](https://github.com/Bartek532/rssmarkable/blob/main/CONTRIBUTING.md)

## Tech/framework used 🧰

| Tech                                           | Description                                                         |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/)  | Static type-checking programming language                           |
| [Next.js](https://nextjs.org/)                 | The React Framework for Production                                  |
| [React](https://reactjs.org/)                  | Library for building user interfaces                                |
| [tRPC](https://trpc.io/)                       | Lib for building fully typesafe APIs                                |
| [Docker](https://www.docker.com/)              | An open platform for developing, shipping, and running applications |
| [PostgreSQL](https://www.postgresql.org)       | Relational database                                                 |
| [Prisma](https://www.prisma.io)                | ORM for TypeScript and Node.js                                      |
| [Tailwind](https://tailwindcss.com/)           | Utility-first CSS framework                                         |
| [React Hook Form](https://react-hook-form.com) | Forms with easy-to-use validation                                   |
| [Husky](https://github.com/typicode/husky)     | Git hooks                                                           |
| [ESLint](https://eslint.org/)                  | TypeScript linting                                                  |
| [Prettier](https://prettier.io/)               | Code formatter                                                      |

## Local development 💿

### Prerequisite

- Node.js v16.\*
- Docker + docker compose

```bash

git clone https://github.com/Bartek532/rssmarkable.git

npm run install

cp .env.example .env.development.local
# set up environment variables

npm run db:migrate:dev

npm run dev

```

## Live 🎆

https://rssmarkable.onrender.com
