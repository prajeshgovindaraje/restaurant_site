import {items} from './items.js'

const itemsContainer = document.getElementById("items-container")
const checkOutListContainerEl = document.getElementById("checkout-div")
const formContainerEl = document.getElementById("form-container")
let isFormOpened = false

let orders = []



document.addEventListener('click',function(e){

    if(isFormOpened === false){
        if(e.target.id === "plus-image"){
        
            addIntoOrdersArray(e)
            renderCheckOutList()
    
    
        }
        if(e.target.id == "remove-btn"){
            removeFromOrdersArray(e)
            renderCheckOutList()
    
        }
        if(e.target.id === "complete-btn"){
            formContainerEl.classList.add("visible")
            document.body.style.overflow = 'hidden' //scroll lock
            isFormOpened = true
        }
    }
    if(e.target.id === "close-button"){
        formCloseActions()

    }
    if(e.target.id === "submit-btn"){
        if(checkValidity()){
            e.preventDefault()
            formCloseActions()
            console.log("submit clikkkked")
            checkOutListContainerEl.innerHTML = "<h2 class='thanks-text'>Thanks, Your Order is in the Way<h2>"


        }
        
    }

})


//checks the format of user input
function checkValidity(){
    const nameCheck= /[A-Za-z]/
    const numberCheck = /[0-9]/
    const name = document.getElementById("username-inp").value
    const cardNumber = document.getElementById("cardNumber-inp").value
    const cvv = document.getElementById("cvv-inp").value

    console.log(name)

    if(!nameCheck.test(name)){
        alert("enter name ")
        return false
    }
    
    else if(!numberCheck.test(cardNumber)){
    alert("enter cardNumber ")
        return false

    }

     else if(!numberCheck.test(cvv)){
        alert("enter cvv ")

        return false

    }

    return true


}


//make form invisible
function formCloseActions(){
    formContainerEl.classList.remove("visible")
        document.body.style.overflow = 'auto' //scroll unlock

         isFormOpened = false
}


//deletes item from array when 'remove' btn is pressed
function removeFromOrdersArray(e){
    console.log(e.target.dataset.name)

    orders = orders.filter(function(order){
        if(order.name != e.target.dataset.name){
            return true
        }
    })




}





//adding cliked item into a array
function addIntoOrdersArray(e){
    const tempObj = {
        name:e.target.dataset.name,
        quantity:1,
        price: Number(e.target.dataset.price)
    }
    let canAdd = true
    
    orders.forEach(function(orderItem){
        //if already existing item is clicked again. It is not added into array but quantity is increased.
        if(orderItem.name === tempObj.name){ 
            orderItem.quantity++
            orderItem.price += tempObj.price
            canAdd = false
        }

    })

    if(canAdd){
        orders.push(tempObj)
    }
}



function renderCheckOutList(){

    if(orders.length === 0 ){
        checkOutListContainerEl.innerHTML = ""
        return

    }

   let tempStr = '<p class="your-orders-text">Your Orders</p><div class="ordered-items-div">'
   let totalPrice = 0

    orders.forEach(function(orderItem){

        tempStr +=  `<div class="ordered-items-list" id="ordered-items-list">
        <div class="removable-item-div">
            <p>${orderItem.name}</p>
            <p>x${orderItem.quantity}</p>
            <button class="remove-btn" id="remove-btn" data-name=${orderItem.name}>remove</button>
        </div>
        <i class="fa-solid fa-trash"></i>
            <p>$${orderItem.price}</p>
    </div>`

        totalPrice += orderItem.price


    })

    tempStr += ` </div><div class="total-price-div">
                <p>Toal Price: </p>
                <p>$${totalPrice}</p>
            </div><button class="complete-btn" id="complete-btn">Complete order</button>`


   checkOutListContainerEl.innerHTML = tempStr


}



function renderItemList(){

    let str = ''

    items.forEach(function(item){


        str += `<div id="item-card" class="item-card">
            <img class="item-image" src=${item.images}>
            <div id="item-details" class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-ingredients">${item.ingredients}</p>
                <p class="item-price">${item.price}</p>
            </div>
            <img class="plus-image" id="plus-image" src="/images/plus.png" data-name=${item.name} data-price=${item.price}></div>`



    })

    itemsContainer.innerHTML = str

}

renderItemList()



