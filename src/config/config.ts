const config = {
    port: 4000,
    host: "http://localhost",
    imagePath: "http://localhost:4000",
    // host:"http://18.222.184.185",
    // imagePath:"http://18.222.184.185:4000",
    database: {
        port: 27017,
        usernmae: null,
        password: null,
        host: '127.0.0.1',
        dbname: "l7exchnageWeb"
    },
    corsOptions: {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: "*",
        preflightContinue: false
    },
    jwt: {
        secret: "MatkaApp_17381919283sdajksdhuwiw@#",
        issuer: 'http://techphant.com',
        expiresIn: '5h',
    }
};

export { config };