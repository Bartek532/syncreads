# Contribution Guidelines

RSSmarkable is an open source project, and contributions of any kind are welcome and appreciated. Open issues, bugs, and enhancements are all listed on the [issues](https://github.com/Bartek532/rssmarkable/issues) tab and labeled accordingly. Feel free to open bug tickets and make feature requests. Easy bugs and features will be tagged with the `good first issue` label.

## Issues

If you encounter a bug, please file a bug report. If you have a feature to request, please open a feature request. If you would like to work on an issue or feature, there is no need to request permission.

## Pull Requests

In order to create a pull request for RSSmarkable, follow the GitHub instructions for [Creating a pull request from a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Please link your pull request to an existing issue.

## File Structure

Description of the project files and directories.

```bash
├── .husky/                       # Husky config
├── .github/                      # Github related files (workflows, templates)
├── provision/                    # Configs for deployment and local development (Docker)
├── public/                       # All images, icons, fonts
├── src/                          # Main source of app
│    ├── components/              # React components
│    ├── config/                  # Static data used to config components/logic
│    ├── env/                     # Config for environment variables
│    ├── hooks/                   # Shared React hooks
│    ├── lib/                     # External libs configuration files
│    ├── pages/                   # Next.js pages
│    ├── providers/               # Providers from React Context
│    ├── server/                  # All files related to backend side (mainly tRPC)
│        ├── common/              # Shared utils
│        ├── controllers/         # Controllers for handling input/output
│        ├── db/                  # Database files (Prisma)
│        ├── services/            # Server business logic
│        └── trpc/                # tRPC config
│    ├── styles/                  # All shared styles
│    ├── types/                   # TypeScript types
│    ├── typings/                 # TypeScript types definitions
│    ├── utils/                   # All utilities
│    └── views/                   # All views used in pages
├── .dockerignore                 # Files ignored by Docker
├── .env.example                  # Examples of env variables
├── .eslintrc.json                # ESLint configuration file
├── .gitignore                    # Files ignored by git
├── commitlint.config.cjs         # Config for CommitLint - to enforce commit consistency
├── next.config.js                # Next.js config
├── package.json                  # Dependencies and additional informations about the project
├── pnpm-lock.yaml                # Pnpm lockfile
├── prettier.config.cjs           # Code convention enforced by Prettier
├── README.md
├── server.ts                     # Custom Next.js server code
├── tailwind.config.js            # Tailwind config
├── tsconfig.json                 # Typescript configuration
├── tsconfig.server.json          # Typescript configuration for server
└── vitest.config.ts              # Vitest configuration
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
├── Component/
│   ├── Component.tsx
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

| Tech                                           | Description                                                         |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/)  | Static type-checking programming language                           |
| [Next.js](https://nextjs.org/)                 | The React Framework for Production                                  |
| [React](https://reactjs.org/)                  | Library for building user interfaces                                |
| [tRPC](https://trpc.io/)                       | Lib for building fully typesafe APIs                                |
| [Docker](https://www.docker.com/)              | An open platform for developing, shipping, and running applications |
| [PostgreSQL](https://www.postgresql.org)       | Relational database                                                 |
| [Prisma](https://www.prisma.io)                | ORM for TypeScript and Node.js                                      |
| [Redis](https://redis.io)                      | Open source, in-memory data store                                   |
| [Vitest](https://vitest.dev)                   | Testing framework                                                   |
| [Tailwind](https://tailwindcss.com/)           | Utility-first CSS framework                                         |
| [React Hook Form](https://react-hook-form.com) | Forms with easy-to-use validation                                   |
| [Husky](https://github.com/typicode/husky)     | Git hooks                                                           |
| [ESLint](https://eslint.org/)                  | TypeScript linting                                                  |
| [Prettier](https://prettier.io/)               | Code formatter                                                      |
