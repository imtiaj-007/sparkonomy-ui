# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with StrictMode
- 🔷 **TypeScript** - Strict type checking
- �� **Tailwind CSS** - Utility-first CSS framework
- �� **ESLint + Prettier** - Code quality and formatting
- �� **Husky + lint-staged** - Pre-commit hooks
- 📝 **Commitlint** - Conventional commit messages
- �� **Multi-environment** - Development/Production modes
- �� **Path aliases** - `@/` for src imports
- 🔄 **API proxy** - `/api/*` routes to backend

## Setup

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. **Clone and install dependencies**

    ```bash
    git clone <repository-url>
    cd sparkonomy-ui
    npm install
    ```

2. **Environment Configuration**

    Create environment files for each mode:

    ```bash
    # Development (staging)
    cp .env.example .env.development

    # Production
    cp .env.example .env.production
    ```

    Required environment variables:

    ```bash
    VITE_ENV=development|production
    PORT=5173
    BACKEND_URL=http://localhost:8000
    ```

3. **Development Server**

    ```bash
    npm run dev
    ```

    - Runs on `http://localhost:5173` (or configured PORT)
    - Auto-opens browser
    - API proxy: `/api/*` → `BACKEND_URL`

4. **Build for Production**
    ```bash
    npm run build
    npm run preview
    ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint:eslint` - Run ESLint
- `npm run format:check` - Check Prettier formatting
- `npm run format:fix` - Fix Prettier formatting

## Vite Configuration

### Overview

The project uses a custom Vite configuration (`vite.config.ts`) with environment validation, API proxying, and build optimizations.

### Key Features

- **Environment Validation**: Automatically validates required environment variables
- **API Proxy**: Routes `/api/*` requests to your backend server
- **Path Aliases**: `@/` maps to `src/` directory
- **Multi-mode Support**: Development and Production modes
- **Build Optimizations**: Minification and CSS optimization

### Environment Modes

```bash
# Development mode (staging)
npm run dev --mode development

# Production mode
npm run build --mode production
```

### Modifying Configuration

#### 1. **Environment Variables**

Edit the `AppEnv` interface in `vite.config.ts`:

```typescript
interface AppEnv {
    PORT: string
    BACKEND_URL: string
    VITE_ENV: TMode
    // Add new variables here
    API_KEY: string
}
```

Then add validation:

```typescript
const requiredEnvs: (keyof AppEnv)[] = [
    'PORT',
    'BACKEND_URL',
    'VITE_ENV',
    'API_KEY', // Add to validation
]
```

#### 2. **API Proxy Settings**

Modify the proxy configuration:

```typescript
proxy: {
    '/api': {
        target: env.BACKEND_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
    },
    // Add more proxy routes
    '/uploads': {
        target: env.UPLOAD_URL,
        changeOrigin: true,
    }
}
```

#### 3. **Build Options**

Customize build settings:

```typescript
build: {
    minify: true,
    cssMinify: true,
    sourcemap: envMode === 'development', // Source maps for dev
    rollupOptions: {
        output: {
            manualChunks: {
                vendor: ['react', 'react-dom'], // Split vendor chunks
            }
        }
    }
}
```

#### 4. **Server Options**

Modify development server:

```typescript
const options: ServerOptions = {
    port,
    open: true, // Auto-open browser
    host: '0.0.0.0', // Allow external connections
    proxy: {
        /* ... */
    },
}
```

#### 5. **Path Aliases**

Add more aliases:

```typescript
resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
    },
}
```

### Environment Files

Create these files in your project root:

```bash
# .env.development
VITE_ENV=development
PORT=5173
BACKEND_URL=http://localhost:8000

# .env.production
VITE_ENV=production
PORT=3000
BACKEND_URL=https://api.yourdomain.com
```

### Troubleshooting

**Environment validation errors:**

- Ensure all required variables are set in your `.env.{mode}` file
- Check that `VITE_ENV` matches your mode (development/production)

**Port conflicts:**

- Change `PORT` in your environment file
- Or use `npm run dev -- --port 3001`

**API proxy not working:**

- Verify `BACKEND_URL` is correct
- Check that your backend server is running
- Ensure the proxy path (`/api`) matches your frontend requests

**Build issues:**

- Run `npm run build` to see detailed error messages
- Check TypeScript errors with `npm run type-check`
- Verify all environment variables are set for production
