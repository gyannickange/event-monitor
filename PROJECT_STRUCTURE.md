# Project Structure

## Backend (`backend/`)

```
backend/
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json
├── src/
│   ├── app.module.ts
│   ├── data-source.ts
│   ├── main.ts
│   ├── STRUCTURE.md
│   ├── articles/
│   │   ├── articles.controller.ts
│   │   ├── articles.module.ts
│   │   ├── articles.processor.ts
│   │   ├── articles.service.ts
│   │   ├── ai/
│   │   │   └── articles.service.ts
│   │   ├── dto/
│   │   │   └── create-articles.dto.ts
│   │   ├── entities/
│   │   │   └── articles.entity.ts
│   ├── categories/
│   │   ├── categories.controller.ts
│   │   ├── categories.enum.ts
│   │   └── categories.module.ts
│   ├── common/
│   │   ├── config/
│   │   │   └── configuration.ts
│   │   ├── constants/
│   │   │   └── index.ts
│   │   └── enums/
│   │       ├── environment.enum.ts
│   │       └── error-codes.enum.ts
│   ├── jobs/
│   │   └── articles-scheduler.service.ts
│   ├── migrations/
│   │   └── 1747700807049-CreateArticlesTable.ts
│   └── queue/
│       └── queue.module.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
```

## Frontend (`frontend/`)

```
frontend/
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── hero-bg.jpg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── articles/
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── components/
│   │   ├── articles-list.tsx
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   └── loader.tsx
│   ├── types/
│   │   ├── article.ts
│   │   └── category.ts
│   └── utils/
│       ├── article-category.ts
│       └── date-format.ts
```
