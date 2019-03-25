exports.customObject= {
    firstName:"Swapnil",
    lastName:"Chaudhari",
    age:2
    //fullDetails: fullName(firstName,lastName, age)
};
exports.fullDeatails= function(customObject){
    return customObject.firstName +' '+ customObject.lastName +' aged ' + customObject.age;
}
function getCustomObject(){
    return customObject;
}