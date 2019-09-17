const apiUrls = {
    development: "http://localhost:8080",
    production: "https://movie-finder-backend.herokuapp.com"
};

export default {
    url: apiUrls[process.env.NODE_ENV] || apiUrls.production
};