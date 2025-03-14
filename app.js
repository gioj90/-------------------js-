

const tokenExists = localStorage.getItem('token') !== null;
let logoutin = document.querySelector(".logoutin")
let logoutin1 = document.querySelector(".logoutin1")
let formLogin = document.querySelector("#formLogin")

if(tokenExists){
    logoutin.innerText="Log Out"
        logoutin1.innerText="Log Out"
}
else{
      logoutin.innerText="Log In"
              logoutin1.innerText="Log In"
}
logoutin.addEventListener("click", function(){
    console.log("click")
    if(tokenExists){
        localStorage.removeItem("token")
        setTimeout(function(){
            window.location.reload()
        },10)
    }
    else{
          
          setTimeout(function(){
           window.location.href ="./registration.html"
        },10)
    }
    
})

logoutin1.addEventListener("click", function(){
    console.log("click")
    if(tokenExists){
        localStorage.removeItem("token")
        setTimeout(function(){
            window.location.reload()
        },10)
    }
    else{
          
          setTimeout(function(){
           window.location.href ="./registration.html"
        },10)
    }
    
})


let cont = document.querySelector('.cont');
let select = document.querySelector('.select');
let sel = document.querySelector('.sel');
let nuts = document.querySelector('.nuts');
let inpLive = document.querySelector('#inpLive');


let btn = document.querySelector('#btn');


let extramenu = document.querySelector(".extramenu")
let navigation1 =  document.querySelector(".navigation1")

let burger = document.querySelector(".burger")

burger.addEventListener("click", function(){
    extramenu.style.display == "flex" ?    extramenu.style.display = "none" :    extramenu.style.display = "flex"
})

let unfilteredArr = []
function start(arr) {
    unfilteredArr = [...arr]
    randerProduct(arr)

}


fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
    .then(response => response.json())
    .then(response => start(response))


function randerProduct(arr){
    cont.innerHTML = ''
        arr.forEach(el => {
            cont.innerHTML += 
       `<div class="box">
            <div class="card" style="background-color: #F9A84C";>
               <img src="${el.image}" alt="">
               <p>${el.name}</p>
               <p>price ${el.price}</p>
               <a href="second.html?=${el.id}">see more</a>
           </div>
        </div>
            `
        });
}


fetch(`https://restaurant.stepprojects.ge/api/Categories/GetAll`)
.then(resp => resp.json())
.then(resp => fillProduct(resp))

function fillProduct(arr){
    select.innerHTML = '';
    for(let el of arr){
        select.innerHTML += `
        <option value="${el.id}">${el.name.toUpperCase()}</option>`
    }
}

select.addEventListener('change', function(){
    fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?categoryId=${select.value}`)
    .then(resp => resp.json())
    .then(resp => randerProduct(resp))
})

sel.addEventListener('change', function(){                         
    if(sel.value == "--"){
        randerProduct(unfilteredArr)
    }
    else{
    fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${sel.value}`)
    .then(resp => resp.json())
    .then(resp => randerProduct(resp))
    }

})
    
nuts.addEventListener('change', function(){                       
    if(nuts.value == "--"){
        randerProduct(unfilteredArr)
    }
    else{
    fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?nuts=${nuts.value}`)
    .then(resp => resp.json())
    .then(resp => randerProduct(resp))
    }
    
})




inpLive.addEventListener('input', function(){
    let product = [...unfilteredArr]
    console.log(product)
    cont.innerHTML = ''
    let filteredArr = product.filter(el => el.name.toLowerCase().includes(inpLive.value));
    console.log(filteredArr)
    randerProduct(filteredArr)
})


// btn.addEventListener('click', function(){
//     cont.innerHTML = ''
//     let supportText = (inpLive.value)
   
// })

