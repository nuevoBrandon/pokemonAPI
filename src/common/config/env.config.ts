export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    database:process.env.DATABASE,
    port:process.env.PORT || 3000
})