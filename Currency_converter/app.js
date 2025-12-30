const dropdowns = document.querySelectorAll(".dropdown select") ;
let btn = document.querySelector("form button") ; 
const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies" ;
const fromCurr = document.querySelector(".from select") ;
const toCurr = document.querySelector(".to select"); 
const msg = document.querySelector(".msg"); 

for(let select of dropdowns){
  for(currCode in countryList){
    let newOption = document.createElement("option") ;
    newOption.innerText = currCode ; 
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){   //this is to display USD and INR by default 
      newOption.selected = "selected" ; 
    }else if(select.name ==="to" && currCode === "INR"){
      newOption.selected = "selected" ;
    }
    select.append(newOption) ;
  }
  select.addEventListener("change", (evt)=>{
    updateFlag(evt.target) ; 
  });
}

const updateExchangeRate = async() =>{
     let amount = document.querySelector(".amount input"); 
     let amtValue = amount.value; 
     if(amtValue === "" || amtValue < 0){
        amtValue = 1; 
        amount.value = "1" ; 
     }  
    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let convertedAmount = rate * amtValue ; 

    let newMsg = `${amtValue} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}` ;
    msg.innerText = newMsg ; 
}

const updateFlag = (element)=>{
  let currCode = element.value;
  let countryCode = countryList[currCode] ; 
  let newSrcLink = `https://flagsapi.com/${countryCode}/flat/64.png` ; 
  let img =  element.parentElement.querySelector("img"); 
  img.src = newSrcLink ; 
}

btn.addEventListener("click", async(evt)=> {
   evt.preventDefault() ; //to prevent default behavior 
   updateExchangeRate() ;
})

window.addEventListener("load", ()=>{
  updateExchangeRate();
})

/* rate = json[fromCurrency][toCurrency] */
