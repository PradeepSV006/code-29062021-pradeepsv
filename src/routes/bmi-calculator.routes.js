const bmiCalcService = require("../services/bmi-calculator/bmi-calculator.service")

const registerRoutes = (app) => {
    app.post("/getBmiResults", bmiCalcService.getBmiResults)
}

const bmiRoutes = {
    registerRoutes : registerRoutes
} 

module.exports = bmiRoutes;
