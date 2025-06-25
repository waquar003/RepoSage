# RepoSage

RepoSage is an innovative AI-powered development assistant that revolutionizes how developers interact with their codebase. By seamlessly integrating with GitHub repositories, RepoSage provides intelligent insights and instant answers to questions about your code, making development workflows more efficient and productive.

## Core Features

RepoSage enhances your development experience through:

- **AI-Powered Code Understanding**: Ask natural language questions about your codebase and receive accurate, contextual answers using Google's Gemini AI
- **GitHub Integration**: Seamless connection with your GitHub repositories for immediate access to your code
- **Intelligent Meeting Processing**: Process and analyze meeting transcripts with AI-driven insights using AssemblyAI
- **Real-time Updates**: Webhook-based asynchronous processing ensures reliable performance even for complex operations
- **Media Management**: Integrated Cloudinary support for efficient media file handling
- **User Authentication**: Secure authentication system powered by Clerk
- **Payment Processing**: Integrated Stripe payment system for premium features
- **User-Friendly Interface**: Intuitive sidebar navigation and clean design for effortless project management

## Getting Started

### Prerequisites

Before installing RepoSage, ensure you have:
- Node.js (Latest LTS version recommended)
- PostgreSQL database
- npm or yarn package manager
- Accounts with the following services:
  - Clerk (for authentication)
  - GitHub (for repository access)
  - Google Cloud Platform (for Gemini AI)
  - Cloudinary (for media management)
  - AssemblyAI (for meeting processing)
  - Stripe (for payments)

### Installation

1. Clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/RepoSage.git
cd RepoSage
```

2. Install the required dependencies:
```bash
npm install
```

3. Set up your environment variables by creating a `.env` file. You can use the `.env.example` file as a template:
```env
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/RepoSage"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL='/sync-user'

# GitHub Integration
GITHUB_TOKEN='ghp_your_github_token'

# AI Services
GEMINI_API_KEY='your_gemini_api_key'

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key

# Assembly AI
ASSEMBLY_API_KEY=your_assembly_api_key

# Stripe Payment Integration
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Set up your database:
```bash
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

### Environment Variables Setup Guide

Each environment variable serves a specific purpose in the application:

1. **Database Configuration**
   - `DATABASE_URL`: Your PostgreSQL connection string. Update the credentials and database name as needed.

2. **Clerk Authentication**
   - Set up a Clerk account and create a new application
   - Copy the required keys from your Clerk dashboard
   - The sign-in and sign-up URLs are preconfigured for the default authentication flow

3. **GitHub Integration**
   - Create a GitHub Personal Access Token with appropriate repository permissions
   - Prefix your token with 'ghp_' as shown in the example

4. **AI Services**
   - Set up a Google Cloud Project and enable the Gemini API
   - Get your API key from the Google Cloud Console

5. **Cloudinary Setup**
   - Create a Cloudinary account
   - Copy your cloud name, API key, and secret from the dashboard
   - Both public and private keys are needed for different aspects of media handling

6. **AssemblyAI Configuration**
   - Sign up for an AssemblyAI account
   - Get your API key from the dashboard

7. **Stripe Integration**
   - Create a Stripe account
   - Get your API keys from the Stripe dashboard
   - Set up webhooks and copy the webhook secret

8. **Application URL**
   - Set to localhost:3000 for development
   - Update to your production URL when deploying

Remember to never commit your `.env` file to version control. The `.env.example` file serves as a template and should be kept up-to-date with any new variables added to the project.


## Development Patterns

RepoSage follows T3 Stack best practices:

- **API Routes**: Defined using tRPC routers in `src/server/api/routers`
- **Database Schema**: Managed through Prisma schema in `prisma/schema.prisma`
- **Type Safety**: Leveraged through TypeScript and tRPC's inference
- **Frontend Components**: Built with React and Tailwind CSS in `src/components`
- **State Management**: Handled through React Query via tRPC
- **Authentication**: Implemented using Clerk with custom workflows