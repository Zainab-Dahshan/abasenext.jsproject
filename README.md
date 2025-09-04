# PollApp - Modern Polling Application

A modern, full-stack polling application built with Next.js, TypeScript, and Prisma. Create polls, vote on them, and see real-time results.

## Features

- 🔐 **User Authentication** - Secure login and registration system
- 📊 **Create Polls** - Easy-to-use poll creation with multiple options
- 🗳️ **Vote on Polls** - Simple voting interface with real-time results
- 📈 **Real-time Results** - See vote counts and percentages instantly
- 🎨 **Modern UI** - Beautiful interface built with Shadcn components
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🔒 **Secure** - Built with modern security practices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (ready for implementation)
- **Deployment**: Vercel-ready

## Project Structure

```bash
abasenext.jsproject/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   └── polls/                # Poll-related endpoints
│   ├── auth/                     # Authentication pages
│   │   ├── login/                # Login page
│   │   └── register/             # Registration page
│   ├── polls/                    # Poll pages
│   │   ├── page.tsx              # Polls listing
│   │   └── create/               # Create poll page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   ├── auth/                     # Authentication components
│   │   ├── login-form.tsx        # Login form
│   │   └── register-form.tsx     # Registration form
│   ├── layout/                   # Layout components
│   │   └── navigation.tsx        # Navigation bar
│   ├── polls/                    # Poll-related components
│   │   ├── poll-card.tsx         # Individual poll display
│   │   └── create-poll-form.tsx  # Poll creation form
│   └── ui/                       # Shadcn UI components
│       ├── button.tsx            # Button component
│       ├── card.tsx              # Card components
│       └── input.tsx             # Input component
├── lib/                          # Utility libraries
│   ├── db.ts                     # Database client
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
├── prisma/                       # Database schema
│   └── schema.prisma             # Prisma schema
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── README.md                     # This file
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd abasenext.jsproject
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/pollapp"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user (to be implemented)

### Polls

- `GET /api/polls` - Get all polls
- `POST /api/polls` - Create a new poll
- `POST /api/polls/[id]/vote` - Vote on a poll

## Database Schema

The application uses the following main entities:

- **User** - User accounts with authentication
- **Poll** - Poll questions with metadata
- **PollOption** - Individual options for each poll
- **Vote** - User votes on poll options

## Features to Implement

- [ ] NextAuth.js integration for authentication
- [ ] User profile management
- [ ] Poll categories and tags
- [ ] Poll sharing functionality
- [ ] Real-time updates with WebSockets
- [ ] Poll analytics and insights
- [ ] Email notifications
- [ ] Mobile app (React Native)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help, please open an issue on GitHub.
