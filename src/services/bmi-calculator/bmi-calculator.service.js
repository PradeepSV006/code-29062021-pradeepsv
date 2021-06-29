const bmiConstants = require("../../utils/bmi-calculator.constants")

let bmiMasterData       = bmiConstants.bmiMasterData;

let underweight         = bmiMasterData.underweight;
let normal              = bmiMasterData.normal;
let overweight          = bmiMasterData.overweight;
let moderatelyObese     = bmiMasterData.moderatelyObese;
let serverelyObese      = bmiMasterData.serverelyObese;
let veryServerelyObese  = bmiMasterData.veryServerelyObese;



const getBmiResults = (request, response) => {
    let jsonInput = request.body;
    try{
        let jsonOutput = jsonInput.map((element) => {
            validateRecord(element);

            let heightInMetres = element.HeightCm / 100;
            let outputElement = { ...element, Bmi: undefined, BmiCategory: undefined, HealthRisk : undefined };
            outputElement.Bmi = (element.WeightKg / Math.pow(heightInMetres, 2))//.toFixed(2);
    
            if(underweight.isBelongsTo(outputElement.Bmi)) {
                outputElement.BmiCategory = underweight.bmiCategory;
                outputElement.HealthRisk = underweight.healthRisk;
            } else if(normal.isBelongsTo(outputElement.Bmi)) {
                outputElement.BmiCategory = normal.bmiCategory;
                outputElement.HealthRisk = normal.healthRisk;
            } else if(overweight.isBelongsTo(outputElement.Bmi)) {
                outputElement.BmiCategory = overweight.bmiCategory;
                outputElement.HealthRisk = overweight.healthRisk;
            } else if(moderatelyObese.isBelongsTo(outputElement.Bmi)) {
                outputElement.BmiCategory = moderatelyObese.bmiCategory;
                outputElement.HealthRisk = moderatelyObese.healthRisk;
            } else if(serverelyObese.isBelongsTo(outputElement.Bmi)) {
                outputElement.BmiCategory = serverelyObese.bmiCategory;
                outputElement.HealthRisk = serverelyObese.healthRisk;
            } else if(veryServerelyObese.isBelongsTo(outputElement.Bmi)) {
                outputElement.BmiCategory = veryServerelyObese.bmiCategory;
                outputElement.HealthRisk = veryServerelyObese.healthRisk;
            }
    
            return outputElement;
        });

        response.json({
            statusCode: 200,
            result:jsonOutput
        });

    } catch (error){
        response.json({
			statusCode: 400,
			error: {
				message: error,
			}
		});
    }
    

}

const validateRecord = function(element){

	if (!(element && element.WeightKg && element.HeightCm)) {
		throw "some param(s) are missing";
	}

	let weight = Number(element.WeightKg);
	let height = Number(element.HeightCm);

	if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
		throw "weight and height must be positive numbers";
	}
}
const bmiServices = {
    getBmiResults: getBmiResults
}

module.exports = bmiServices;