<a href="https://rssmarkable.vercel.app"><img src="https://rssmarkable.vercel.app/images/banner/light.png" width="100%"></a>

## Project Overview 🎨

RSSmarkable is a fully open source app which can be used to sync the newest articles and feeds into [reMarkable](https://remarkable.com) tablet. The focus is primarily on producing the best workflow to consume web content on your offline devices. Feel free to open an [issue](https://github.com/Bartek532/rssmarkable/issues) or directly make a [pull request](https://github.com/Bartek532/rssmarkable/pulls). Enjoy!

## Contributing 🤝

Please read [CONTRIBUTING.md](https://github.com/Bartek532/rssmarkable/blob/main/CONTRIBUTING.md)

## Architecture 📐

TBD.

For more details look at [Architecture details](https://github.com/Bartek532/rssmarkable/blob/main/CONTRIBUTING.md/#Architecture)

## Tech/framework used 🧰

| Tech                                           | Description                                                                   |
| ---------------------------------------------- | ----------------------------------------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/)  | Static type-checking programming language                                     |
| [Nest.js](https://nestjs.com/)                 | Node.js framework for building efficien and scalable server-side applications |
| [Next.js](https://nextjs.org/)                 | React Framework for Production                                                |
| [React](https://reactjs.org/)                  | Library for building user interfaces                                          |
| [tRPC](https://trpc.io/)                       | Library for building fully typesafe APIs                                      |
| [Docker](https://www.docker.com/)              | Open platform for developing, shipping, and running applications              |
| [Supabase](https://supabase.com/)              | Open source Firebase alternative                                              |
| [PostgreSQL](https://www.postgresql.org)       | Relational database                                                           |
| [Vitest](https://vitest.dev)                   | Testing framework                                                             |
| [shadcn/ui](https://ui.shadcn.com/)            | Extendable component library                                                  |
| [Tailwind](https://tailwindcss.com/)           | Utility-first CSS framework                                                   |
| [React Hook Form](https://react-hook-form.com) | Forms with easy-to-use validation                                             |
| [Turborepo](https://turbo.build/)              | High-performance build system for JavaScript and TypeScript codebases.        |
| [Husky](https://github.com/typicode/husky)     | Git hooks                                                                     |
| [ESLint](https://eslint.org/)                  | TypeScript linting                                                            |
| [Prettier](https://prettier.io/)               | Code formatter                                                                |

## Local development 💿

### Prerequisite

- Node.js v20.\*
- Docker + docker compose

```bash

git clone https://github.com/Bartek532/rssmarkable.git

pnpm install

cp .env.example .env
# set up environment variables

pnpm run db:setup:dev

pnpm run dev

```

## Live 🎆

https://rssmarkable.vercel.app
