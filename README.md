# Ecocentric

A brief description of your Next.js and Supabase project, including key features and the main purpose of the application.

## Table of Contents

- [Ecocentric](#ecocentric)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Running the Project](#running-the-project)
    - [Local Development](#local-development)
    - [Production Build](#production-build)
  - [Development Workflow](#development-workflow)
    - [Common Commands](#common-commands)
    - [Guidelines](#guidelines)
  - [Contributing](#contributing)
  - [License](#license)

## Project Structure

The project is organized as a monorepo with separate frontend and backend directories:

```plaintext
/project-root
│
├── /frontend                # Next.js application
│   ├── /public              # Public assets like images and icons
│   ├── /src
│   │   ├── /app             # Main application pages and routing
│   │   ├── /config          # Configuration files and environment setups
│   │   ├── /utils           # Utility functions and helpers
│   │   ├── /components      # Reusable UI components
│   │   └── /middleware.ts   # Middleware for route protection
│   ├── next.config.mjs      # Next.js configuration file
│   ├── package.json         # Frontend dependencies and scripts
│   └── tsconfig.json        # TypeScript configuration for frontend
│
├── /backend                 # Supabase-related backend setup (details not specified)
│
├── README.md                # Project documentation
└── .env.example             # Example environment variables file
```

## Setup and Installation

### Prerequisites

- Node.js (v18 or above)
- Yarn or npm
- Supabase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jhsu98/next-mantine-supabase-starter.git
   cd next-mantine-supabase-starter
   ```

2. Install frontend dependencies:

   ```bash
   cd frontend
   # Using Yarn
   yarn install

   # Or using npm
   npm install
   ```

3. Set up Supabase:

   - Sign in to [Supabase](https://supabase.com/) and create a new project.
   - Retrieve your API keys and database URL.

4. Configure environment variables:

   - Copy the `.env.example` file to `.env.local` in the `frontend` directory:

     ```bash
     cp .env.example .env.local
     ```

   - Update `.env.local` with your Supabase credentials:

     ```env
     NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
     ```

## Running the Project

### Local Development

To run the Next.js frontend locally, use the following command from the `frontend` directory:

```bash
# Using Yarn
yarn dev

# Or using npm
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

To create a production build:

```bash
# Using Yarn
yarn build

# Or using npm
npm run build
```

To start the production server:

```bash
# Using Yarn
yarn start

# Or using npm
npm start
```

## Development Workflow

### Common Commands

- **Lint the code**:

  ```bash
  yarn lint
  ```

- **Run tests** (if set up):

  ```bash
  yarn test
  ```

- **Format code**:

  ```bash
  yarn format
  ```

### Guidelines

- Use **TypeScript** for type safety.
- Follow project coding standards and use **ESLint** for linting and **Prettier** for code formatting.

## Contributing

Contributions are welcome! Please create an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
