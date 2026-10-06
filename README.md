# Cli Steps

### install nest, add graphql, test

1. `npm install -g @nestjs/cli`
2. `nest new backend`
3. `pnpm install @nestjs/graphql @nestjs/apollo graphql @apollo/server`    
4. `pnpm approve-builds`
5. `pnpm install @as-integrations/express5 @apollo/server` // Fix Running NestJS 11+ and Apollo Server 5, which use Express v5 by default. :3

### Graphql works, now add prisma

6. `pnpm install @prisma/client`
7. `pnpm install prisma --save-dev` 
8. `npx prisma init --datasource-provider mysql` // Failed to install Prisma agent skills, had to delete .gitignore and run npx prisma dev again
9. `npx prisma dev` 

### After editing schema.prisma

10. `npx prisma migrate dev --name init` // The datasource property `url` is no longer supported in schema files.


# Thoughts

1. todo