
window.addEventListener("load",start)

function start (){
  const d = document,
        cShake = document.getElementById("card-shake"),  
        ccForm = d.querySelector(".card-form"), 
        cNumber = d.querySelectorAll(".card-number"), 
        ccNumber = ccForm.querySelector("#card-number"),
        cName = d.querySelectorAll(".card-name"), 
        ccName = ccForm.querySelector("#card-name"),
        ccMonth = ccForm.querySelector("#expires-month"),
        cMonth = d.querySelectorAll(".card__exp-month"),
        ccYear = ccForm.querySelector("#expires-year"), 
        cYear = d.querySelectorAll(".card__exp-year"),
        ccCCV = ccForm.querySelector("#card-cvc"), 
        cCCV = d.querySelectorAll(".card__cvc-2"),
        defaultNumberN = cNumber[0].querySelectorAll(".card__span")[0].innerHTML,  
        defaultNumberM = cMonth[0].querySelectorAll(".card__span")[0].innerHTML,  
        defaultNumberY = cYear[0].querySelectorAll(".card__span")[0].innerHTML, 
        defaultNumberC = cCCV[0].querySelectorAll(".card__span")[0].innerHTML
        defaultNumberNa = cName[0].querySelectorAll(".card__span")[0].innerHTML
      
  payment()
  
  function payment (ev){
    ev = ev || window.event

    let cardNumber, cardCCV
    addEvent(ccNumber, "focus", function (){
      cShake.classList.add("wrong-entry")
    })
    addEvent(ccNumber, "blur", function (){
      cShake.classList.remove("wrong-entry")
    })
    
    addEvent(ccMonth, "focus", function (){
      cShake.classList.add("wrong-entry")
    })
    addEvent(ccMonth, "blur", function (){
      cShake.classList.remove("wrong-entry")
    })

    addEvent(ccName, "focus", function (){
      cShake.classList.add("wrong-entry")
    })
    addEvent(ccName, "blur", function (){
      cShake.classList.remove("wrong-entry")
    })
    
    addEvent(ccYear, "focus", function (){
      cShake.classList.add("wrong-entry")
    })
    addEvent(ccYear, "blur", function (){
      cShake.classList.remove("wrong-entry")
    })
    
    addEvent(ccCCV, "focus", function (){
      cShake.classList.add("wrong-entry")
    })
    addEvent(ccCCV, "blur", function (){
      cShake.classList.remove("wrong-entry")
    })
    
    
  }

  function addEvent (elem, event, func){
    elem.addEventListener(event, func)
  } 
  
  function syncText (elCol, text){
    let collection
    for (let j=0; j < elCol.length; j++){
      collection = elCol[j].querySelectorAll(".card__span")
      if (!collection.length){
        elCol[j].innerHTML = text
      } else{
        for (let i=0; i < collection.length; i++){
          collection[i].innerHTML = text
        }
      }
    }
  } 

  function numSplit(number, indexes){
    let tempArr = number.split(''),
        parts = []
    for (var i=0, l = indexes.length; i < l; i++){
      if (tempArr.length){
        parts.push(tempArr.splice(0,indexes[i]).join('')) 
      }
    }
    return parts;
  }  
}