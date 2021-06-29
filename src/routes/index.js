const bmiRoutes = require("./bmi-calculator.routes");

const registerAllRoutes = (app) =>{
    bmiRoutes.registerRoutes(app);
}

const routes = {
    registerAllRoutes : registerAllRoutes
}

module.exports = routes;