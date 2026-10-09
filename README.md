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
11. `nest g module prisma`
12. `nest g service prisma --no-spec`
13. `pnpm install @prisma/adapter-mariadb` // oops forgot mysql adapter
14. `pnpm install @nestjs/serve-static` // next proxy to nuxt fe

# Useful commands
`robocopy "c:\dev\kailight\frontend\.output\public" "c:\dev\kailight\backend\client" /E`
`npx prisma db pull` // update schema from DB
`npx prisma generate` // regenerate the client
`docker build -t opencv .`
`docker run -p 3307:3306 -p 4000:80 static-fullstack-app`

# Workflow

1. created nestjs, added graphql, created user model, resolver, etc
2. added prisma, created schema
3. added nuxt, hardcoded cv a bit, querying graphql from it, moving the data to the database atm
4. created skills resolver with many-to-many connection (we are here)
5. Ran into issues with nested queries (users with skillGroups), solved
6. Added jobs (belongsTo user)
7. Ok CV displays, starting with docker

