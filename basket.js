



let cont = document.querySelector('.cont');

fetch(`https://restaurant.stepprojects.ge/api/Baskets/GetAll`)
    .then(resp => resp.json())
    .then(resp => renderBasket(resp));

function renderBasket(arr) {
    cont.innerHTML = ''; 

    for (let el of arr) {
        let basketDiv = document.createElement('div');
        basketDiv.classList.add('basket');

        basketDiv.innerHTML = `
            <p>${el.product.name}</p>
            <p>price ${el.price}</p>
            <p>Quantity: ${el.quantity}</p>
            <img src="${el.product.image}" alt="">
        `;

        let deleteBtn = document.createElement('button');
        let plusBtn = document.createElement('button');
        let minusBtn = document.createElement('button');
        minusBtn.classList.add('minus')
        minusBtn.innerText = '-';
        plusBtn.classList.add('plus')
        plusBtn.innerText = '+';
        deleteBtn.innerText = 'Delete';


        deleteBtn.addEventListener('click', function () {
            console.log('Deleting product with ID:', el.product.id);

            fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${el.product.id}`, {
                method: 'DELETE'
            })
            .then(
                    basketDiv.remove()
               
            )
            .catch(error => console.log(error));
        });


        plusBtn.addEventListener('click', function () {
            let newQuantity = parseInt(el.quantity) + 1;
            let newPrice = parseFloat(el.price) + (el.price / el.quantity); 

            console.log('Updated quantity:', newQuantity);
            console.log('Updated price:', newPrice);

            fetch(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "quantity": newQuantity,
                    "price": newPrice,
                    "productId": el.product.id
                })
            })
            .then(
                setTimeout(function(){
                    window.location.reload()
                },5)
            )
            .catch(er => console.log(er));
        });

        minusBtn.addEventListener('click', function () {


            if(el.quantity == 1){
                fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${el.product.id}`, {
                    method: 'DELETE'
                })
                .then(
                        basketDiv.remove()
                   
                )
                .catch(error => console.log(error));
            }
            else{
                let newQuantity = parseInt(el.quantity) - 1;
                let newPrice = parseFloat(el.price) - (el.price / el.quantity); 
    
                console.log('Updated quantity:', newQuantity);
                console.log('Updated price:', newPrice);
    
                fetch(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "quantity": newQuantity,
                        "price": newPrice,
                        "productId": el.product.id
                    })
                })
                .then(
                    setTimeout(function(){
                        window.location.reload()
                    },5)
                )
                .catch(er => console.log(er));
            }



        });



        basketDiv.appendChild(deleteBtn);
        basketDiv.appendChild(plusBtn);
        basketDiv.appendChild(minusBtn);

        cont.appendChild(basketDiv);
    }
}
