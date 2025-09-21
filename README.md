# Finance Dashboard

A comprehensive personal financial management application built with Next.js 15, TypeScript, and Drizzle ORM.

## Features

- User authentication (email/password and GitHub OAuth)
- Dashboard overview with financial summary
- Transaction management (income/expense tracking)
- Asset management (property, vehicles, investments)
- Investment portfolio tracking
- Budget planning with limit notifications
- Financial reporting and analytics
- Data export (CSV, PDF)

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 3, Shadcn/UI, Radix UI
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **State Management**: React Query 5
- **Validation**: Zod
- **Development Tools**: ESLint 9, Prettier 3

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

4. **Set up the database**
   Make sure you have PostgreSQL running locally, then:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/src
  /app              # Next.js app router pages
    /(auth)         # Authentication pages
    /(dashboard)    # Dashboard and financial pages
    /api            # API routes
  /components       # Reusable UI components
  /lib              # Utilities and configurations
  /server           # Server-side code
    /Actions        # Server actions
    /db             # Database schemas and connection
  /styles           # Global styles
```

## Database Schema

The application uses Drizzle ORM with the following main tables:

- **users**: User accounts and profiles
- **transactions**: Financial transactions (income/expense)
- **assets**: Personal assets (property, vehicles, etc.)
- **investments**: Investment portfolio
- **budgets**: Budget planning and limits

## API Endpoints

- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions` - Retrieve user transactions
- `PUT /api/transactions?id={id}` - Update a transaction
- `DELETE /api/transactions?id={id}` - Delete a transaction

Similar endpoints exist for assets, investments, and budgets.

## Authentication

The application supports:
- Email/password authentication with verification
- GitHub OAuth
- Session management with secure cookies
- Role-based access control

## Deployment

The application can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or a custom Node.js server.

For production deployment, make sure to:
1. Set proper environment variables
2. Configure your production database
3. Set up email delivery for verification and notifications
4. Configure OAuth providers for social authentication

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Better Auth Documentation](https://www.better-auth.com/)