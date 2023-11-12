const { NODE_ENV, PREVIEW_BRANCH } = process.env;

let DOMAIN;


if (PREVIEW_BRANCH === 'dev') {
    DOMAIN = "https://jpdgarage-dev-api.vercel.app";  // Development domain for preview
} else if (NODE_ENV === 'production') {
    DOMAIN = "https://jpdgarage-api.vercel.app";  // Production domain
} else {
    DOMAIN = "http://localhost:4000";  // Local testing domain
}

console.log('NODE_ENV:', NODE_ENV);
console.log('DOMAIN:', DOMAIN);

export { DOMAIN };