let searchInput = document.getElementById("searchInput");
let spinnerEle = document.getElementById("spinner");
let resultOfCountries = document.getElementById("resultCountries");

let countriesList = [];

let createAndAppendCountry = (country) => {
    let countryCard = document.createElement("div");
    countryCard.classList.add("country-card", "col-11", "col-md-5", "m-3");
    resultOfCountries.appendChild(countryCard);

    let countryFlag = document.createElement("img");
    countryFlag.src = country.flag;
    countryFlag.classList.add("country-flag");
    countryCard.appendChild(countryFlag);

    let countryInfo = document.createElement("div");
    countryInfo.classList.add("country-info");
    countryCard.appendChild(countryInfo);

    let countryNameEl = document.createElement("h1");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfo.appendChild(countryNameEl);

    let populationEl = document.createElement("p");
    populationEl.textContent = `Population: ${country.population.toLocaleString()}`;
    populationEl.classList.add("country-population");
    countryInfo.appendChild(populationEl);
};

let displaySearchResults = () => {
    resultOfCountries.textContent = "";
    let searchValue = searchInput.value.toLowerCase();

    let filteredList = countriesList.filter(country =>
        country.name.toLowerCase().includes(searchValue)
    );

    for (let country of filteredList) {
        createAndAppendCountry(country);
    }
};

let fetchCountriesData = () => {
    spinnerEle.classList.remove("d-none");
    resultOfCountries.classList.add("d-none");

    fetch("https://apis.ccbp.in/countries-data")
        .then(response => response.json())
        .then(data => {
            spinnerEle.classList.add("d-none");
            resultOfCountries.classList.remove("d-none");
            countriesList = data;
            displaySearchResults(); // Show all countries initially
        });
};

fetchCountriesData();
searchInput.addEventListener("input", displaySearchResults);