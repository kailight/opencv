# Host: localhost  (Version 5.5.5-10.4.28-MariaDB)
# Date: 2026-10-09 19:30:29
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "_prisma_migrations"
#

CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
                                                    `id` varchar(36) NOT NULL,
    `checksum` varchar(64) NOT NULL,
    `finished_at` datetime(3) DEFAULT NULL,
    `migration_name` varchar(255) NOT NULL,
    `logs` text DEFAULT NULL,
    `rolled_back_at` datetime(3) DEFAULT NULL,
    `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "_prisma_migrations"
#


#
# Structure for table "skillgroup"
#

CREATE TABLE IF NOT EXISTS `skillgroups` (
                                             `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(191) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `SkillGroup_title_key` (`title`)
    ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "skillgroup"
#

REPLACE INTO `skillgroups` VALUES (1,'Programming Languages'),(2,'Frameworks'),(3,'DevOps & Infrastructure'),(4,'Databases & Storage'),(5,'Testing & Quality Assurance'),(6,'Tools'),(7,'Architectural & System Concepts'),(8,'Soft Skills / Management');

#
# Structure for table "skills"
#

CREATE TABLE IF NOT EXISTS `skills` (
                                        `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(191) NOT NULL,
    `skillgroup_id` int(11) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`),
    UNIQUE KEY `Skill_title_key` (`title`),
    KEY `idx_skills_skillgroup_id` (`skillgroup_id`),
    CONSTRAINT `fk_skills_skillgroup_id` FOREIGN KEY (`skillgroup_id`) REFERENCES `skillgroups` (`id`) ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "skills"
#

REPLACE INTO `skills` VALUES (1,'PHP',1),(2,'Javascript',1),(3,'Typescript',1),(4,'Python',1),(5,'C#',1),(6,'Ruby',1),(7,'Node.js',2),(8,'NestJS',2),(9,'Express',2),(10,'Fastify',2),(11,'H3',2),(12,'Vue',2),(13,'React',2),(14,'Angular',2),(15,'Nuxt',2),(16,'Next.js',2),(17,'Svelte',2),(18,'SolidJS',2),(19,'Docker',3),(20,'Kubernetes',3),(21,'AWS',3),(22,'TeamCity',3),(23,'CI/CD Pipelines',3),(24,'Terraform',3),(25,'AWS CDK',3),(26,'Amazon ECS / EKS',3),(27,'AWS Lambda (Serverless)',3),(28,'Amazon SNS / SQS',3),(29,'Infrastructure as Code (IaC)',3),(30,'MySQL',4),(31,'PostgreSQL',4),(32,'MongoDB',4),(33,'Redis',4),(34,'Kafka',4),(35,'RabbitMQ',4),(36,'Playwright',5),(37,'Vitest',5),(38,'Selenium',5),(39,'End-to-End (E2E) Testing',5),(40,'Socket.IO',6),(41,'ClickUp',6),(42,'Jira',6),(43,'Vite',6),(44,'Webpack',6),(45,'GraphQL',7),(46,'SOLID Principles',7),(47,'Abstraction Layers',7),(48,'Software Engineering Approach',7),(49,'Service-Oriented Architecture (SOA)',7),(50,'Domain-Driven Design (DDD)',7),(51,'CQRS & Event Sourcing',7),(52,'Database Sharding & Replication',7),(53,'Microservices & Distributed Systems',7),(54,'High-Availability (HA) Design',7),(55,'Extreme Programming (XP)',8),(56,'Agile Methodologies',8),(57,'Waterfall Model',8),(58,'Team Management',8),(59,'Legacy System Migration',8),(60,'Cloud Cost Optimization (FinOps)',8),(61,'Technical Debt Strategy',8),(62,'Engineering Mentorship & Governance',8);

#
# Structure for table "users"
#

CREATE TABLE IF NOT EXISTS `users` (
                                       `id` int(11) NOT NULL AUTO_INCREMENT,
    `firstName` varchar(191) NOT NULL,
    `lastName` varchar(191) NOT NULL,
    `nickName` varchar(191) NOT NULL,
    `email` varchar(191) DEFAULT NULL,
    `phone` varchar(191) DEFAULT NULL,
    `password` varchar(191) NOT NULL,
    `telegram` varchar(191) DEFAULT NULL,
    `city` varchar(191) DEFAULT NULL,
    `country` varchar(191) DEFAULT NULL,
    `created` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `updated` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `summary` text DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `User_email_key` (`email`),
    UNIQUE KEY `User_phone_key` (`phone`)
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "users"
#

REPLACE INTO `users` VALUES (1,'Alexander','Semyonov','Kai Light','kailight2020@gmail.com',NULL,'',NULL,'Saint Petersburg','Russia',X'323032362D31302D30362031373A35333A33322E313934',X'323032362D31302D30362031373A35333A33322E313934','Client oriented independent software engineer with 20 years of experience developing and implementing web applications on the international freelance market. Inspiring leader with a record of working with agile teams delivering complex projects with microservice architecture.\n\n● Over 20 years of professional experience in consulting, architecturing and implementing web solutions\n● Strong analytical and conceptual skills, ability to make technical decisions and be responsible for the end result\n● A leader and mentor to any member of the team, friendly to people from all over the world\n● Capability of balancing between client needs and technical solutions');

#
# Structure for table "job"
#

CREATE TABLE IF NOT EXISTS `jobs` (
                                      `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(191) NOT NULL,
    `start` datetime(3) NOT NULL,
    `finish` datetime(3) NOT NULL,
    `created` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `updated` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `description` text DEFAULT NULL,
    `user_id` int(11) NOT NULL,
    `position` varchar(191) DEFAULT NULL,
    `details` text DEFAULT NULL,
    `city` varchar(255) DEFAULT NULL,
    `country` varchar(255) DEFAULT NULL,
    `contract` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_jobs_user_id` (`user_id`),
    CONSTRAINT `fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


#
# Data for table "jobs"
#

REPLACE INTO `jobs` (`id`,`title`,`start`,`finish`,`created`,`updated`,`description`,`userId`,`position`,`details`,`city`,`country`,`contract`) VALUES (1,'Freelance Marketplaces',X'323030322D30322D30312030303A30303A30302E303030',X'323032362D31302D30312030303A30303A30302E303030',X'323032362D31302D30362032333A35353A32392E363835',X'323032362D31302D30362032333A35353A32392E363835','● Provided technical consultations to the clients \n● Communicated with clients and understanding their needs\n● Transformed clients needs into project plans and architectural solutions \n● Implemented the solutions in code\n● Created and maintained project documentation\n● Succesfully completed over 100 custom web applications ',1,'Software Engineer',NULL,NULL,NULL,'Remote'),(2,'Grooveshark',X'323030362D30352D30312030303A30303A30302E303030',X'323030362D30392D30312030303A30303A30302E303030',X'323032362D31302D30382032303A30313A30332E333133',X'323032362D31302D30382032303A30313A30332E333133','● Architecturing and implementing Web Application UI \n● Worked closely with client to execute on client’s vision',1,'Frontend Developer',NULL,'San Francisco','US','Remote'),(3,'Skytours',X'323030372D30362D30312030303A30303A30302E303030',X'323030382D30332D30312030303A30303A30302E303030',X'323032362D31302D30382032303A31363A35332E363930',X'323032362D31302D30382032303A31363A35332E363930','● Worked directly with client to clarify strategic requirements \n● Architectured MVP of the end product \n● Developed MVP of the end product ',1,'Fullstack Developer',NULL,NULL,'GE','Remote'),(4,'Tececigs',X'323031332D30362D30312030303A30303A30302E303030',X'323031342D30392D30312030303A30303A30302E303030',X'323032362D31302D30382032303A33343A33372E313034',X'323032362D31302D30382032303A33343A33372E313034','● Engineered and built parallel-to-enterprise solution to cut the costs of the enterprise software \n● Convinced a free solution as an alternative\n● Maintained alternative solution',1,'Backend Developer',NULL,'Chicago','US','Remote'),(5,'Frensius Medical Care',X'323031382D30332D30312030303A30303A30302E303030',X'323031382D30352D30312030303A30303A30302E303030',X'323032362D31302D30382032313A33323A32392E353930',X'323032362D31302D30382032313A33323A32392E353930','● Participated in planning and implementing the original solution to the end client. \n● Managed development scope, schedule, budget, and quality of the product. ',1,'System Engineer',NULL,'','US','Remote'),(6,'Tribefire',X'323031382D30352D30312030303A30303A30302E303030',X'323031382D31312D30312030303A30303A30302E303030',X'323032362D31302D30382032313A33333A33372E313637',X'323032362D31302D30382032313A33333A33372E313637','● Fulfilled the role of Software Architect, designing complex set of microservices\n● Implemented the core of the end solution in quality and coded the MVP\n● Hired and managed a team of developers to round up the product ',1,'Lead Developer / Architect',NULL,'Sydney','AU','Remote'),(7,'Evermed',X'323031392D30392D30312030303A30303A30302E303030',X'323031392D31302D30312030303A30303A30302E303030',X'323032362D31302D30382032313A34313A35342E323336',X'323032362D31302D30382032313A34313A35342E323336','● Participated in development of the lead product',1,'Frontend Developer',NULL,'New York','US','Remote'),(8,'Compilat',X'323032312D30352D30312030303A30303A30302E303030',X'323032312D31312D30312030303A30303A30302E303030',X'323032362D31302D30382032323A30373A34342E393830',X'323032362D31302D30382032323A30373A34342E393830','● Participated in improvement of the architecture of complex microservice-based product \n● Lead a team of 10 developers, participating in Agile workflow (conducted SUs, performed Code Reviews) \n● Mentored team members to take their understanding of programming approaches to the next level \n● Actively participated in quality of code improvement, technical debt prevention \n● Architectured and implemented custom Automated Testing Solution for the product\n● Performed project management functions ',1,'Fullstack Team Lead',NULL,'Prague','CZ','Remote'),(9,'Pixward Games',X'323032322D30332D30312030303A30303A30302E303030',X'323032322D30342D30312030303A30303A30302E303030',X'323032362D31302D30392031303A30353A32322E373532',X'323032362D31302D30392031303A30353A32322E373532','● Architected middle scale microservice-based product\n● Fulfilled DevOps role conducting CI flow\n● Created codebase of several microservices\n● Developed applications and programs on Solana blockchain ',1,'System Engineer',NULL,NULL,'ES','Remote'),(10,'Narra',X'323032322D30342D30312030303A30303A30302E303030',X'323032322D31302D30312030303A30303A30302E303030',X'323032362D31302D30392031313A30373A35312E303137',X'323032362D31302D30392031313A30373A35312E303137','● Transformed legacy LMS platform up to modern standards (microservices/cloud/CI) \n● Built the code base up to MVP',1,'Fullstack Developer',NULL,NULL,'JP','Remote'),(11,'Investorlift',X'323032322D31302D30312030303A30303A30302E303030',X'323032332D30322D30312030303A30303A30302E303030',X'323032362D31302D30392031313A31313A35352E333737',X'323032362D31302D30392031313A31313A35352E333737','● Supporting and maintaining legacy codebase of a product\n● Suggesting architectural improvements to reduce maintenance issues \n● Full stack coding ',1,'Fullstack Developer',NULL,NULL,'DO','Office'),(12,'Mussia Studio',X'323032332D30322D30312030303A30303A30302E303030',X'323032332D30362D30312030303A30303A30302E303030',X'323032362D31302D30392031313A31363A33382E363435',X'323032362D31302D30392031313A31363A33382E363435','● Architected Software \n● Implemented software in code',1,'CTO',NULL,NULL,'CA','Remote'),(13,'SeitUP',X'323032332D30372D30312030303A30303A30302E303030',X'323032332D31302D30312030303A30303A30302E303030',X'323032362D31302D30392031313A32323A33352E363133',X'323032362D31302D30392031313A32323A33352E363133','● Team Building \n● Team Management \n● Technical leadership \n● Technical strategy \n● Product Ownership of several products \n● CRM/CMS development',1,'CTO',NULL,NULL,'GE','Remote');

CREATE TABLE IF NOT EXISTS `users_skills` (
                                `user_id` int(11) NOT NULL,
                                `skill_id` int(11) NOT NULL,
                                PRIMARY KEY (`user_id`,`skill_id`),
                                KEY `users_skills_skill_id_fkey` (`skill_id`),
                                CONSTRAINT `users_skills_skill_id_fkey` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`) ON UPDATE CASCADE,
                                CONSTRAINT `users_skills_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "users_skills"
#

REPLACE INTO `users_skills` (`user_id`,`skill_id`) VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(1,22),(1,23),(1,24),(1,25),(1,26),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,33),(1,34),(1,35),(1,36),(1,37),(1,38),(1,39),(1,40),(1,41),(1,42),(1,43),(1,44),(1,45),(1,46),(1,47),(1,48),(1,49),(1,50),(1,51),(1,52),(1,53),(1,54),(1,55),(1,56),(1,57),(1,58),(1,59),(1,60),(1,61),(1,62);
