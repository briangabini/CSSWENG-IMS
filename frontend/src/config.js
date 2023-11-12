let DOMAIN;

if (process.env.NODE_ENV === 'production') {
    DOMAIN = "https://jpdgarage-api.vercel.app";  // Production domain
} else if (process.env.NODE_ENV === 'development') {
    DOMAIN = "https://jpdgarage-dev-api.vercel.app";  // Development domain
} else {
    DOMAIN = "http://localhost:4000";  // Local testing domain
}

export { DOMAIN };
