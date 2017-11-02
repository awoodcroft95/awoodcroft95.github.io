"use strict";
let garageContents = [];
let notGarage = [];

function carMaker(name, licencePlate, wheelNumber, numberOfFaults) {
    let it = {};
    it.name = name;
    it.licencePlate = licencePlate;
    it.wheelNumber = wheelNumber;
    it.numberOfFaults = numberOfFaults;
    return it;
}

function addCarToGarage(name, licencePlate, wheelNumber, numberOfFaults, garage) {
    let car = carMaker(name, licencePlate, wheelNumber, numberOfFaults);
    garage.push(car);
}

function changeLicencePlateText(element, list) {
    let elem = document.getElementById(list);
    let carInfo = elem.options[elem.selectedIndex].value;
    let carInfoArray = spiltString(carInfo);
    document.getElementById(element).innerHTML = carInfoArray[1];
}

function spiltString(inputString) {
    return inputString.split("-");
}

function carToString(car) {
    let carString = "";
    for (let key in car) {
        carString += car[key] + "-";
    }
    return carString;
}

function outputContents() {
    let outputStr = ""
    garageContents.forEach(function (element) {
        outputStr += element.name + " " + element.licencePlate + "<br>";
    }, this);
    outputToPage("output", "outputText", outputStr);
}

function checkInCar() {
    let dropDown = document.getElementById("carSelectIn");
    let input = dropDown.value;
    let inputArray = spiltString(input);
    addCarToGarage(inputArray[0], inputArray[1], inputArray[2], inputArray[3], garageContents);
    dropDown.remove(dropDown.selectedIndex);
    carToSelection(garageContents[garageContents.length - 1], input, "carSelectOut");
}

function checkOutCar() {
    let dropDown = document.getElementById("carSelectOut")
    let input = dropDown.value;
    let inputArray = spiltString(input);
    let car;
    garageContents.forEach(function (element) {
        if (element.licencePlate === inputArray[1]) {
            car = element;
            let index = garageContents.indexOf(element);
            garageContents.splice(index, 1);
        }
    }, this);
    dropDown.remove(dropDown.selectedIndex);
    carToSelection(car, input, "carSelectIn");
}

function outputToPage(divID, paraID, outputStr) {
    let divOut = document.getElementById(divID);
    let para;
    if (para = document.getElementById(paraID)) {
        divOut.removeChild(para);
    }
    para = document.createElement("p");
    para.setAttribute("id", paraID);
    para.innerHTML = outputStr;
    divOut.appendChild(para);
}

function calculateBill(car) {
    let bill = 25;
    if (car) {
        if (car.wheelNumber <= 3) {
            bill += (4 - car.wheelNumber) * 30;
        }
        if (car.numberOfFaults > 0) {
            bill += (20 * car.numberOfFaults);
        }
        return bill;
    }
}

function billToPage() {
    let car;
    let selection = document.getElementById("carSelectOut").value;
    let inputArray = spiltString(selection);
    garageContents.forEach(function (element) {
        if (element.licencePlate === inputArray[1]) {
            car = element;
        }
    }, this);
    outputToPage("billOutput", "billPara", "£" + calculateBill(car));
}

function carToSelection(car, carString, dropDownId) {
    let dropDown = document.getElementById(dropDownId);
    let option = document.createElement("option");
    option.setAttribute("value", carString);
    option.innerHTML = car.name;
    dropDown.appendChild(option);
}

function makeNewCar() {
    let newCarName = document.getElementById("carMakeIn").value;
    let newCarPlate = document.getElementById("licencePlateIn").value;
    let newCarWheels = document.getElementById("numWheelsIn").value;
    let newCarFaults = document.getElementById("faultsIn").value;
    addCarToGarage(newCarName, newCarPlate, newCarWheels, newCarFaults, notGarage);
}

function addNewCarToOptions() {
    let newCar = notGarage.pop();
    carToSelection(newCar, carToString(newCar), "carSelectIn");
}