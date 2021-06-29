const bmiMasterData = {
    underweight: new Category(0, 18.4, 'Underweight', 'Malnutrition risk'),
    normal: new Category(18.5, 24.9, 'Normal weight', 'Low risk'),
    overweight: new Category(25, 29.9, 'Overweight', 'Enhanced risk'),
    moderatelyObese: new Category(30, 34.9, 'Moderately obese', 'Medium risk'),
    severelyObese: new Category(35, 39.9, 'Severely obese', 'High risk'),
    verySeverelyObese: new Category(40, null, 'Very severely obese', 'Very High risk')
}

function Category(rangeStart, rangeEnd, bmiCategory, healthRisk) {
    this.rangeStart = rangeStart;
    this.rangeEnd = rangeEnd;
    this.bmiCategory = bmiCategory;
    this.healthRisk = healthRisk;
    if(rangeEnd == null){
        this.doesBelongTo = function (value) {
            return (value >= rangeStart);
        }
    } else {
        this.doesBelongTo = function (value) {
            return ((value - rangeStart) * (value - rangeEnd) <= 0);
        }
    }
}

const bmiConstants = {
    bmiMasterData: bmiMasterData
}

module.exports = bmiConstants;