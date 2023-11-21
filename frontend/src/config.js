let DOMAIN;

const temp = "production"

if (temp === 'production') {
    DOMAIN = "https://jpdgarage-api.vercel.app";  // Production domain
} else if (temp === 'preview') {
    DOMAIN = "https://jpdgarage-dev-api.vercel.app";  // Development domain
} else {
    DOMAIN = "http://localhost:4000";  // Local testing domain
}

export { DOMAIN };