# Fluxo — Etapa 1
Base visual (dados fictícios) de gestão financeira pessoal/empresarial.
Comandos: `pnpm install` · `pnpm dev` · `pnpm typecheck` · `pnpm lint` · `pnpm build`
Estrutura: `apps/web` (Next.js 14), `packages/{core,types,validation}`.
Etapa 2: Supabase/PostgreSQL, autenticação e persistência.

## Etapa 2: Supabase + Open Finance
1. Crie um projeto no Supabase e rode `supabase/migrations/001_init.sql` no SQL Editor.
2. Copie `apps/web/.env.example` para `apps/web/.env.local` e preencha as chaves.
3. Open Finance via Pluggy (pluggy.ai): pegue Client ID/Secret e preencha `PLUGGY_*`.
4. `pnpm dev`, crie conta em /login e conecte um banco na página Contas (sandbox ativo).
