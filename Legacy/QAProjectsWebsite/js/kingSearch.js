'use strict';
let userInput;
let kingsList;
let hasBeenCalled = false;
let requestURL = "https://raw.githubusercontent.com/ewomackQA/JSONDataRepo/master/kings.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function () {
    kingsList = request.response;
}
function doSearch() {
    let bigDiv = document.createElement("div");
    bigDiv.setAttribute("id", "bigDiv");
    document.getElementById("kingSearch").appendChild(bigDiv);
    kingsList.forEach(function (element) {
        for (let key in element) {
            if (element[key].includes(userInput)) {
                let kingDiv = document.createElement("div");
                kingDiv.setAttribute("id", element.nm);
                document.getElementById("bigDiv").appendChild(kingDiv);
                let myH3 = document.createElement("h3");
                myH3.textContent = element["nm"];
                document.getElementById(element.nm).appendChild(myH3);
                for (let i = 0; i < 3; i++) {
                    let myPara = document.createElement("p");
                    if (i === 0) {
                        myPara.textContent = element["cty"];
                    } else if (i === 1) {
                        myPara.textContent = element["hse"];
                    } else {
                        myPara.textContent = element["yrs"];
                    }
                    document.getElementById(element.nm).appendChild(myPara);
                }
            }
        }
    }, this);
    hasBeenCalled = true;
}
function getInput() {
    userInput = document.getElementById("search1").value;
    if (hasBeenCalled) {
        let elem = document.getElementById("bigDiv");
        elem.parentNode.removeChild(elem);
    }
}