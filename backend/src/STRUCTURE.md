// Senior-level NestJS backend structure for src/

src/
│
├── app.module.ts
├── main.ts
│
├── common/                // Shared utilities, guards, interceptors, pipes, decorators
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   ├── pipes/
│   └── utils/
│
├── config/                // Centralized configuration (env, config.service.ts)
│   └── configuration.ts
│
├── modules/               // Feature modules (domain logic)
│   ├── news/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── news.controller.ts
│   │   ├── news.service.ts
│   │   ├── news.module.ts
│   │   ├── news-ai.service.ts
│   │   ├── news-scheduler.service.ts
│   │   ├── news.processor.ts
│   │   └── news-severity.enum.ts
│   ├── queue/
│   │   └── queue.module.ts
│   └── ... (other modules)
│
├── jobs/                  // BullMQ processors, job definitions
│   └── ...
│
├── database/              // Database config, providers, migrations
│   ├── database.module.ts
│   ├── database.providers.ts
│   └── migrations/
│
├── interfaces/            // Global interfaces and types
│   └── index.ts
│
└── shared/                // Reusable components/services (if needed)
    └── ...

// Each module (e.g., news) contains its own controller, service, DTOs, entities, and related files.
// Use 'common/' for cross-cutting concerns. Use 'config/' for configuration logic.
// Place BullMQ processors in 'jobs/' if they are shared, or inside the module if tightly coupled.
// This structure is scalable, testable, and maintainable.
