# Contribution Guidelines

RSSmarkable is an open source project, and contributions of any kind are welcome and appreciated. Open issues, bugs, and enhancements are all listed on the [issues](https://github.com/Bartek532/rssmarkable/issues) tab and labeled accordingly. For more detailed and long-term roadmap you can also check [projects](https://github.com/users/Bartek532/projects/2) tab, where all the tasks and plans are located. Feel free to open bug tickets and make feature requests. Easy bugs and features will be tagged with the `good first issue` label.

## Issues

If you encounter a bug, please file a bug report. If you have a feature to request, please open a feature request. If you would like to work on an issue or feature, there is no need to request permission.

## Pull Requests

In order to create a pull request for RSSmarkable, follow the GitHub instructions for [creating a pull request from a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Please link your pull request to an existing issue.

## Architecture

<img src="https://github.com/Bartek532/rssmarkable/blob/main/docs/images/architecture-details.png?raw=true" alt="RSSmarkable architecture details" width="100%">

<br />

1. Starting from the main setup, [Docker](https://www.docker.com) and [Turborepo](https://turbo.build) were utilized to create a perfect development environment. The separation of concerns in this monorepo helps keep the codebase clean and structured. It is also used to simplify the process of deployment and testing the app, enabling us to run multiple tasks in parallel.

2. The web app is the primary interface that users see, built with [Next.js](https://nextjs.org/) App Router to harness the benefits from [RSC](https://nextjs.org/docs/app/building-your-application/rendering/server-components) and keep performance under control.

3. Leveraging the full power of [Next.js](https://nextjs.org/) we employ serverless API and [Edge functions](https://vercel.com/docs/functions) 🔥 mainly for CRUD operations on the database or non-resource-intensive computations on given data. Being a built-in part of [Next.js](https://nextjs.org/) it's super easy to maintain.

4. The connection between the frontend and serverless API is facilitated by [tRPC](https://trpc.io),enforcing full type-safety and conventions across different operations. Seamless validation is achieved with [Zod](https://zod.dev/), ensuring our data is in the correct shape.

5. The Sync module, the main character in this theater, is a strictly separated backend built with [Nest.js](https://nestjs.com/) responsible ONLY for sync functionality. As operations here could be resource and time-intensive, we can scale and extend it independently from the main flow to ensure a good user experience while background tasks are executed.

6. To initiate synchronization, a simple HTTP request is made. The goal is to make it as simple as possible for third-party tools to integrate with this part by just making a request. Communication follows a pure REST API approach using endpoints exposed by the backend, with the request requiring authorization through a special user-specific token.

7. Sync performance, a potential concern, is addressed by using queues. A straightforward [Redis](https://redis.io/) instance with reasonable limits ensures smooth operation. Incoming requests are pushed to the correct queue, and when their time comes, our main service processes them.

8. [BullMQ](https://docs.bullmq.io/) is used to communicate with our queues, a library dedicated to managing structures like this. Easy integration with [Nest.js](https://nestjs.com/), multiple features, and a developer-friendly API enable us to avoid complicated syntax to achieve simple goals.

9. But where is the data? Short question = short answer. [Supabase](https://supabase.com). It uses [PostgreSQL](https://www.postgresql.org/) under the hood, so we won't bother about strictly db things. With a range of useful services that can be integrated in minutes (e.g., realtime, auth), it allows us to focus on business value rather than low-level implementation details.

10. There are several ways to communicate with the database, but RSSmarkable places its bet on the official [JavaScript SDK](https://supabase.com/docs/reference/javascript/introduction). Simple, handy, and performant, it eliminates the need for writing tons of abstractions over the database to obtain the desired data.

## File Structure

Description of the project files and directories.

```bash
├── .github/                      # Github related files (workflows, templates)
├── .husky/                       # Husky config
├── apps/                         # Main apps on which we are focused
│    ├── sync/                    # Nest.js backend, used ONLY for sync functionality
│    └── web/                     # Next.js web app with serverless CRUD (tRPC)
├── docs/                         # Things used in any kind of documentation
├── packages/                     # Packages shared across the workspace
│    ├── database/                # Database related things (migrations, config, client)
│    ├── eslint-preset/           # ESLint preset
│    ├── shared/                  # Things shared across packages/apps
│    └── tsconfig/                # TypeScript config
├── .dockerignore                 # Files ignored by Docker
├── .env.example                  # Examples of env variables
├── .gitignore                    # Files ignored by git
├── .npmrc                        # Npm packages config
├── .prettierignore               # Files ignored by Prettier
├── .prettierrc                   # Code convention enforced by Prettier
├── commitlint.config.cjs         # Config for CommitLint - to enforce commit consistency
├── package.json                  # Dependencies and additional informations about the project
├── pnpm-lock.yaml                # Pnpm lockfile
├── pnpm-workspace.yaml           # Pnpm workspace file
├── README.md
└── turbo.json                    # Turborepo config
```

## Styleguide

Coding conventions are enforced by [ESLint](.eslintrc.json) and [Prettier](prettier.config.cjs).

- Semicolons
- Double quotes
- `const` preferred over `let`
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Two space indentation
- React: functional style with Hooks (no classes)
- Trailing commas in arrays and objects
- [Non-default exports](https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/) are preferred for components
- Module imports are ordered and separated: **built-in** -> **external** -> **internal** -> **css/assets/other**
- TypeScript: strict mode, with no implicitly any

## Example component structure

```bash
├── component/
│   ├── component.tsx
```

```tsx
import { memo } from "react";

interface ComponentProps = {
  readonly title: string;
};

export const Component = memo<ComponentProps>(({ title }) => {
  return <h1>{title}</h1>;
});

Component.displayName = "Component";
```

## Tech stack

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
