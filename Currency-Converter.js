const BASE_URL =
"https://latest.currency-api.pages.dev/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("select[name='from']");
const toCurr = document.querySelector("select[name='to']");
const msg = document.querySelector(".msg");

/* Fill dropdowns */
for(let select of dropdowns){
  for(let currCode in countryList){

    let option = document.createElement("option");
    option.innerText = currCode;
    option.value = currCode;

    if(select.name==="from" && currCode==="USD"){
      option.selected=true;
    }
    if(select.name==="to" && currCode==="INR"){
      option.selected=true;
    }

    select.append(option);
  }

  select.addEventListener("change",(e)=>{
    updateFlag(e.target);
    updateExchangeRate();
  });
}

/* Update flag */
function updateFlag(element){
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

/* Fetch rate */
async function updateExchangeRate(){

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if(amtVal==="" || amtVal<1){
    amtVal=1;
    amount.value="1";
  }

  const URL =
  `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();

  let rate =
  data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmount = (amtVal * rate).toFixed(2);

  msg.innerText =
  `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

/* Button */
btn.addEventListener("click",(e)=>{
  e.preventDefault();
  updateExchangeRate();
});

/* Auto load */
window.addEventListener("load",updateExchangeRate);