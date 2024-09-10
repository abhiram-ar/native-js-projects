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
        countryList.sort((a, b)=>{
            if(a.name.common >= b.name.common) return 1;
            else return -1
        })
        countryList.forEach(country => {
            let newOption = document.createElement("option");
            let currencyCode = Object.keys(country.currencies)[0]
            if (currencyCode === "INR") newOption.selected = true;
            newOption.setAttribute("value", currencyCode)
            newOption.innerText = `${(country.flag)} ${currencyCode} - ${country.name.common}`
            from.appendChild(newOption)
        });

        countryList.forEach(country => {
            let newOption = document.createElement("option");
            newOption.setAttribute("value", Object.keys(country.currencies))
            newOption.innerText = `${(country.flag)} ${Object.keys(country.currencies)[0]} - ${country.name.common}`
            to.appendChild(newOption)
        });
    })
    .catch((errorResponse)=>{
        console.log("error while fetching country list" )
        console.log(errorResponse);
    })


convert.addEventListener("click", async ()=>{
    if(amount.value.length === 0) {
        alert("enter amount")
        return
    }

    try {
        let response = await fetch(`https://v6.exchangerate-api.com/v6/9a6bfed955a00d9f6d6e27f5/pair/${from.value}/${to.value}`)
        let data = await response.json();
        let convertionRate = data.conversion_rate
        let exchangeValue = amount.value * convertionRate
        result.innerText = `${amount.value} ${from.value} = ${exchangeValue} ${to.value}`
        result.classList.remove("hidden")
    } catch (error) {
        result.innerText = "Error fetching convertion Rate";
        console.log(error)
        result.classList.remove("hidden")
    }

})

