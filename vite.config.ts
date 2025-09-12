import { defineConfig, loadEnv, type ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'

type TMode = 'development' | 'production'

interface AppEnv {
    PORT: string
    BACKEND_URL: string
    VITE_ENV: TMode
}

function validateEnv(envMode: TMode, env: AppEnv): void {
    const requiredEnvs: (keyof AppEnv)[] = ['PORT', 'BACKEND_URL', 'VITE_ENV']

    for (const key of requiredEnvs) {
        if (!env[key]) {
            throw new Error(
                `${key} is missing in the .env.${envMode} file. Please fix!`
            )
        }
    }
}

function normalizePort(port: string): number {
    const portValue: number = parseInt(port)

    if (isNaN(portValue)) {
        throw new Error(`Invalid port value: ${port}`)
    }
    return portValue
}

export default defineConfig(({ mode }) => {
    const envMode: TMode = mode as TMode
    const env: AppEnv = loadEnv(envMode, process.cwd(), '') as unknown as AppEnv

    validateEnv(envMode, env)

    const port: number = normalizePort(env.PORT)
    const options: ServerOptions = {
        port,
        open: true,
        proxy: {
            '/api': {
                target: env.BACKEND_URL,
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    }

    return {
        plugins: [react()],
        server: options,
        preview: options,
        build: {
            minify: true,
            cssMinify: true,
        },
    }
})
