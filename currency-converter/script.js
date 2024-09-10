const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const convert = document.getElementById("convert")
const result = document.getElementById("result");




async function getCountryList(){
    let response = await fetch("https://restcountries.com/v3.1/all?fields=name,currencies,flag")
    let data = await response.json()
    return data
} 

getCountryList()
.then((countryList)=>{
    console.log(countryList)
    countryList.forEach(country => {
        let newOption = document.createElement("option");
        newOption.innerText = `${(country.flag)} ${Object.keys(country.currencies)[0]} - ${country.name.common}`

        from.appendChild(newOption)
    });

    countryList.forEach(country => {
        let newOption = document.createElement("option");
        newOption.innerText = `${(country.flag)} ${Object.keys(country.currencies)[0]} - ${country.name.common}`
        to.appendChild(newOption)
    });
})
.catch((errorResponse)=>{
    console.log("error while fetching country list" )
    console.log(errorResponse);
})


convert.addEventListener("click", ()=>{
    console.log(from.value)
    //let response = fetch("https://v6.exchangerate-api.com/v6/9a6bfed955a00d9f6d6e27f5/pair/INR/USD")
})

