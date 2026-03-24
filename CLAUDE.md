# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **shadcn/ui** monorepo — a set of copy-paste UI components built with React, Tailwind CSS, and Radix UI. It uses **pnpm workspaces** and **Turborepo**.

### Workspaces

| Workspace | Path | Description |
|---|---|---|
| `v4` | `apps/v4` | Next.js website (ui.shadcn.com), docs, and component registry |
| `shadcn` | `packages/shadcn` | The `shadcn` CLI package (published to npm) |
| `tests` | `packages/tests` | Integration tests for the CLI |

## Commands

### Development

```bash
pnpm install                    # Install all dependencies
pnpm dev                        # Run all workspaces in parallel
pnpm --filter=v4 dev            # Run the website only (port 4000)
pnpm --filter=shadcn dev        # Run the CLI in watch mode
```

### CLI Testing

```bash
pnpm dev                        # Start dev server first (needed for local registry)
pnpm shadcn                     # Run CLI against local registry (http://localhost:4000/r)
pnpm shadcn <init|add|...> -c ~/Desktop/my-app  # Test CLI in a specific app
```

### Building

```bash
pnpm build                      # Build all workspaces
pnpm shadcn:build               # Build CLI package only
pnpm --filter=v4 build          # Build website only
```

### Testing

```bash
pnpm test                       # Full test suite (starts v4 dev server, then runs all tests)
pnpm shadcn:test                # CLI unit tests only (no server needed)
pnpm --filter=tests test        # Integration tests only
```

To run a single test file:
```bash
pnpm --filter=shadcn exec vitest run test/path/to/file.test.ts
```

### Linting & Formatting

```bash
pnpm lint                       # Lint all workspaces
pnpm lint:fix                   # Auto-fix lint issues
pnpm format:write               # Format with Prettier (excludes packages/)
pnpm typecheck                  # TypeScript type checking across all workspaces
pnpm check                      # Run lint + typecheck + format:check together
```

### Registry

```bash
pnpm registry:build             # Rebuild registry JSON + lint/format (run after component changes)
```

## Architecture

### `apps/v4` (Next.js Website)

- `app/` — Next.js App Router pages
- `components/` — Website-specific React components
- `content/docs/` — MDX documentation files (fumadocs-based)
- `registry/new-york-v4/ui/` — **Source of truth for all UI components** (TSX files)
- `registry/new-york-v4/examples/` — Component usage examples
- `registry/new-york-v4/blocks/` — Larger composable blocks
- `registry.json` — Auto-generated registry manifest (do not edit manually)

The registry build pipeline: source TSX files → `scripts/build-registry.mts` → `registry.json` + formatted files.

**When modifying components:**
1. Edit files in `registry/new-york-v4/ui/`
2. Run `pnpm registry:build` to regenerate `registry.json`
3. Update docs in `content/docs/` as needed

The website runs on port **4000**. It uses React 19, Next.js 16, and Tailwind CSS v4.

### `packages/shadcn` (CLI)

Built with TypeScript + tsup. Entry: `src/index.ts`. Key subdirectories:

- `src/commands/` — CLI command implementations (`init`, `add`, `diff`, `migrate`, etc.)
- `src/registry/` — Registry client (fetches from remote or local server)
- `src/schema/` — Zod schemas for config validation
- `src/utils/` — Shared utilities (transformers, resolvers, file ops)
- `src/mcp/` — MCP server implementation
- `test/` — Vitest unit tests; `test/fixtures/` excluded from test runs

The CLI resolves the registry URL from `REGISTRY_URL` env var (defaults to `https://ui.shadcn.com/r`). `start:dev` points it to `http://localhost:4000/r`.

### `packages/tests` (Integration Tests)

End-to-end CLI tests that exercise full `shadcn init` / `shadcn add` flows against the live dev server. Requires the v4 dev server running at port 4000.

## Commit Convention

Format: `category(scope): message`

Categories: `feat`, `fix`, `refactor`, `docs`, `build`, `test`, `ci`, `chore`

Example: `feat(components): add new prop to the avatar component`
