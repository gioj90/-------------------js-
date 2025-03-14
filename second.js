

let cont = document.querySelector('.cont');

let productId = window.location.search.split("=")[1]

let btn = document.querySelector('.btn');




let newProduct = []


btn.addEventListener('click',function(e) {
    e.preventDefault()
    let btnData = {
        quantity: 1,
        price: 10,
        productId: productId
        
    }
    fetch(`https://restaurant.stepprojects.ge/api/Baskets/AddToBasket`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(btnData)
      }).then(resp => resp.json())
      .then(resp => {
        newProduct.push(resp)
      })
      console.log(newProduct) 
})




fetch(`https://restaurant.stepprojects.ge/api/Products/GetAll`)
.then(resp => resp.json())
.then(resp => randerProduct(resp))



 

function randerProduct(productObj) {
    let productObject = productObj.filter(el => el.id == productId)
    cont.innerHTML = `
    <div class="cont">
                
                <p>${productObject[0].name}</p>
                <p>${productObject[0].price}</p>
                <p>${productObject[0].vegeterian}</p>
                <p>${productObject[0].spiciness}</p>
                <img src="${productObject[0].image}" alt="">
                <a href="index.html?=${productObject.id}"><i class="fa-solid fa-backward"></i> go back</a>
        </div>
    `;
    
}




 
