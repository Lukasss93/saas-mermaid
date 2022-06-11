import dotenv from "dotenv";
dotenv.config();

const config = {
    app: {
        name: 'saas-mermaid',
        version: '1.5',
    },
    
    server: {
        port: Number(process.env.PORT) || 8087,
    },
    
    cache: {
        ttl: Number(process.env.CACHE_TTL) || 86400,
    },
}

export default config;