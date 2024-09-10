const showPassword = document.getElementById("password");
const copyToClipboard = document.getElementById("copy");

const lengthSlider = document.getElementById("password-length")
const selectedLength = document.getElementById("selected-length");

const includeNumbers = document.getElementById("include-numbers");
const includeletters = document.getElementById("include-letters");
const includeMixedCase = document.getElementById("include-mixed-case");
const includePuntuation = document.getElementById("include-punctuation");



let characeters = {
	numbers:"0123456789",
	letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	puntuation: "@#$%^&*()_-+=?><':;"
}





lengthSlider.addEventListener("change", generateRandomPassword)

function generateRandomPassword(){
	selectedLength.innerText = lengthSlider.value

	let password = ""
	let solutionSpace = ""

	if(includeNumbers.checked) solutionSpace = solutionSpace.concat(characeters.numbers);
	if (includeletters.checked) solutionSpace = solutionSpace.concat(characeters.letters);
	if(includeMixedCase.checked) solutionSpace = solutionSpace.concat(characeters.letters.toLowerCase());
	if(includePuntuation.checked) solutionSpace = solutionSpace.concat(characeters.puntuation)
	
	let solutionSpacelength = solutionSpace.length
	for(let i=0; i<lengthSlider.value; i++){
		let randomIndex = Math.floor(Math.random() * solutionSpacelength)
		password += solutionSpace.charAt(randomIndex)
	}

	showPassword.value = password
}


copyToClipboard.addEventListener("click", ()=>{
	navigator.clipboard.writeText(showPassword.value)
	alert("password copied to clipboard");
})


generateRandomPassword()