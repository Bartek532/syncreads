# Contribution Guidelines

RSSmarkable is an open source project, and contributions of any kind are welcome and appreciated. Open issues, bugs, and enhancements are all listed on the [issues](https://github.com/Bartek532/rssmarkable/issues) tab and labeled accordingly. Feel free to open bug tickets and make feature requests. Easy bugs and features will be tagged with the `good first issue` label.

## Issues

If you encounter a bug, please file a bug report. If you have a feature to request, please open a feature request. If you would like to work on an issue or feature, there is no need to request permission.

## Pull Requests

In order to create a pull request for RSSmarkable, follow the GitHub instructions for [Creating a pull request from a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Please link your pull request to an existing issue.

## File Structure

Description of the project files and directories.

```bash
├── .github/                      # Github related files (workflows, templates)
├── .husky/                       # Husky config
├── apps/                         # Main apps on which we are focused
│    ├── sync/                    # Nest.js backend, used ONLY for sync functionality
│    └── web/                     # Next.js web app with serverless CRUD (tRPC)
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
