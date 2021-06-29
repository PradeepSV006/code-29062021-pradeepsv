const bmiConstants = require("../../utils/bmi-calculator.constants")

let bmiMasterData       = bmiConstants.bmiMasterData;

let underweight         = bmiMasterData.underweight;
let normal              = bmiMasterData.normal;
let overweight          = bmiMasterData.overweight;
let moderatelyObese     = bmiMasterData.moderatelyObese;
let serverelyObese      = bmiMasterData.severelyObese;
let verySeverelyObese  = bmiMasterData.verySeverelyObese;



const getBmiResults = (request, response) => {
    let jsonInput = request.body;
    try{
        let jsonOutput = jsonInput.map((element) => {
            validateRecord(element);

            let heightInMetres = element.HeightCm / 100;
            let outputElement = { ...element, Bmi: undefined, BmiCategory: undefined, HealthRisk : undefined };
            outputElement.Bmi = (element.WeightKg / Math.pow(heightInMetres, 2)).toFixed(2); //toFixed() returns in string type 
            // outputElement.Bmi = Number((element.WeightKg / Math.pow(heightInMetres, 2)).toFixed(2));  // for output in Number type
    
            if(underweight.doesBelongTo(outputElement.Bmi)) {
                outputElement.BmiCategory = underweight.bmiCategory;
                outputElement.HealthRisk = underweight.healthRisk;
            } else if(normal.doesBelongTo(outputElement.Bmi)) {
                outputElement.BmiCategory = normal.bmiCategory;
                outputElement.HealthRisk = normal.healthRisk;
            } else if(overweight.doesBelongTo(outputElement.Bmi)) {
                outputElement.BmiCategory = overweight.bmiCategory;
                outputElement.HealthRisk = overweight.healthRisk;
            } else if(moderatelyObese.doesBelongTo(outputElement.Bmi)) {
                outputElement.BmiCategory = moderatelyObese.bmiCategory;
                outputElement.HealthRisk = moderatelyObese.healthRisk;
            } else if(serverelyObese.doesBelongTo(outputElement.Bmi)) {
                outputElement.BmiCategory = serverelyObese.bmiCategory;
                outputElement.HealthRisk = serverelyObese.healthRisk;
            } else if(verySeverelyObese.doesBelongTo(outputElement.Bmi)) {
                outputElement.BmiCategory = verySeverelyObese.bmiCategory;
                outputElement.HealthRisk = verySeverelyObese.healthRisk;
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