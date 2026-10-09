import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { SkillGroupsModule } from './skillGroups/skillGroups.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: '../client',
      exclude: ['/graphql'], // Do not intercept your GraphQL API endpoint
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Saves schema to file system
      // autoSchemaFile: true, // to keep schema in-memory
    }),
    UsersModule,
    PrismaModule,
    SkillGroupsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
