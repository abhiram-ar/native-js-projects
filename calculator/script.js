const display = document.getElementById("display");
const clear = document.getElementById("clear");
const deleteLastCharacter = document.getElementById("delete");
const numbersPad = document.querySelector(".number-pad-container")
const result = document.getElementById("result");
const operations = document.querySelector(".operations-container")


let expression = []
let operationPriority = {
    "-" : 1,
    "+" : 1,
    "*" : 2,
    "/" : 2,
    "^" : 3
}

const associativity = {
    '+': 'L',
    '-': 'L',
    '*': 'L',
    '/': 'L',
    '^': 'R'
};

function addToDisplay(char){
    display.value += char
}

function solve(){
    //edge case : final operant
    let finalOperant = parseOperant()
    expression.push(finalOperant);

    console.log(expression)
    
    //converting expression from infix to postfix
    let stack = []
    let postfix = []
    for (let token of expression){
        if(typeof(token) === "number"){
            postfix.push(token)
        }
        else{
           
            while(stack.length > 0 && 
                (
                    (associativity[token] === 'L' && operationPriority[token] <= operationPriority[stack[stack.length -1]]) || 
                    (associativity[token] === 'R' && operationPriority < operationPriority[stack[stack.length - 1]])
                )){
                    postfix.push(stack.pop())
                }
            stack.push(token);            
        }
    }
    while (stack.length > 0){
        postfix.push(stack.pop())
    }
    console.log(postfix);


    //evaluate postfix Expression
    stack = []
    postfix.forEach(token => {
        if(typeof(token) === "number") stack.push(token);
        else{
            let operant2 = stack.pop();
            let operant1 = stack.pop();
            let result;

            switch(token){
                case "+":
                    result = operant1 + operant2;
                    break;
                case "-":
                    result = operant1 - operant2;
                    break;
                case "*":
                    result = operant1 * operant2;
                    break;
                case "/":
                    result = operant1/ operant2;
                    break;
                case "^":
                    result = Math.pow(operant1, operant2);
                    break
                default:
                    console.log("error : invalid operation")
            }
            
            stack.push(result)
        }
    })


    let answer = stack.pop()
    display.value = answer
    expression = []
    console.log("solved : "  + answer)
}


function clearDisplay(){
    display.value = ""
}


function parseOperant(){
    let operant = parseFloat(display.value)
    display.value = ""
    return operant
}


numbersPad.addEventListener("click", (event)=>{
    if(event.target.value === undefined || event.target.id === "result") return
    event.stopPropagation()
    
    console.log(event.target.dataset.value)
    addToDisplay(event.target.dataset.value)
})

result.addEventListener("click", ()=>{
    solve()
})

operations.addEventListener("click", (event)=>{
    if(event.target.dataset.operation === undefined) return;

    let operant = parseOperant();
    expression.push(operant);
    expression.push(event.target.dataset.operation);
    console.log((expression))
})

clear.addEventListener("click", ()=>{
    expression = []
    clearDisplay()
    console.log("cleared/reset")
})

deleteLastCharacter.addEventListener("click", ()=>{
    display.value = display.value.slice(0,-1)
})