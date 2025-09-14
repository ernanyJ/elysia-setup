A boilerplate for building back-end applications with TypeScript, featuring a robust backend setup with authentication, database management, and API documentation.

## 🚀 Tech Stack

### Backend
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[Elysia](https://elysiajs.com/)** - Fast and friendly Bun web framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM for Node.js and TypeScript
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication library
- **[Prismabox](https://github.com/elysiajs/prismabox)** - Type-safe API generation from Prisma schema
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database

### Development Tools
- **Docker & Docker Compose** - Containerized development environment
- **OpenAPI/Swagger** - API documentation and testing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
sv-2.0/
 src/
 ├── index.ts              # Main application entry point
 ├── lib/
 │   └── auth.ts           # Better Auth configuration
 └── middlewares/
     └── better-auth.ts    # Elysia auth middleware
 prisma/
 ├── schema.prisma         # Database schema
 └── migrations/           # Database migrations
 generated/
 ├── prisma/               # Generated Prisma client
 └── prismabox/            # Generated type-safe API types
 docker-compose.yaml       # Database container setup
 package.json              # Dependencies and scripts
 tsconfig.json             # TypeScript configuration
└── README.md
```

## ✨ Features

- ✅ **Type-Safe API** - Auto-generated TypeScript types from Prisma schema
- ✅ **Authentication** - Complete auth system with email/password support
- ✅ **Database Management** - Prisma ORM with PostgreSQL
- ✅ **API Documentation** - Auto-generated OpenAPI/Swagger docs
- ✅ **Docker Support** - Containerized PostgreSQL database
- ✅ **Hot Reload** - Development server with file watching
- ✅ **CORS Enabled** - Ready for frontend integration
- ✅ **Production Ready** - Optimized for deployment

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/docs/installation) installed
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd sv-2.0
```

### 2. Environment Setup

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL="postgresql://dbc:dbc123@localhost:5432/dbc"
```

### 3. Start Database

```bash
cd backend
docker-compose up -d
```

### 4. Install Dependencies

```bash
bun install
```

### 5. Setup Database

```bash
# Generate Prisma client and types
bunx prisma generate

# Run database migrations
bunx prisma migrate dev
```

### 6. Start Development Server

```bash
bun run dev
```

The server will start at `http://localhost:3000`

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:3000/swagger`
- **OpenAPI JSON**: `http://localhost:3000/swagger/json`

## 🔐 Authentication

The boilerplate includes a complete authentication system with:

- Email/password registration and login
- Session management
- Protected routes with middleware
- User profile management

### Example Usage

```typescript
// Protected route example
app.get("/profile", ({ user }) => {
  return { user: user.name, email: user.email };
}, {
  auth: true // Requires authentication
});
```

## 🗄️ Database Schema

The default schema includes:

- **User** - User accounts with email verification
- **Session** - User sessions with device tracking
- **Account** - OAuth provider accounts
- **Verification** - Email verification tokens

## 🛠️ Development Commands

```bash
# Start development server with hot reload
bun run dev

# Generate Prisma client after schema changes
bunx prisma generate

# Create and apply new migration
bunx prisma migrate dev

# Reset database (development only)
bunx prisma migrate reset

# View database in Prisma Studio
bunx prisma studio
```

## 🐳 Docker Commands

```bash
# Start PostgreSQL database
docker-compose up -d

# Stop database
docker-compose down

# View database logs
docker-compose logs db

# Remove database volume (⚠️ deletes all data)
docker-compose down -v
```

## 📦 Adding New Features

### 1. Database Models

Add new models to `prisma/schema.prisma`:

```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("post")
}
```

Then run:
```bash
bunx prisma migrate dev --name add_post_model
bunx prisma generate
```

### 2. API Routes

Add new routes in `src/index.ts`:

```typescript
app.get("/posts", async () => {
  const posts = await prisma.post.findMany({
    include: { author: true }
  });
  return posts;
});
```

### 3. Authentication

The auth middleware is already configured. Use it on any route:

```typescript
app.post("/posts", async ({ body, user }) => {
  const post = await prisma.post.create({
    data: {
      ...body,
      authorId: user.id
    }
  });
  return post;
}, {
  auth: true
});
```

## 🚀 Deployment

### Environment Variables

Set these in your production environment:

```env
DATABASE_URL="your-production-database-url"
```

### Build and Deploy

```bash
# Install dependencies
bun install

# Generate Prisma client
bunx prisma generate

# Run migrations
bunx prisma migrate deploy

# Start production server
bun run src/index.ts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/sv-2.0/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

**Happy coding! 🎉**
