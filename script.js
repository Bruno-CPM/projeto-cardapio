const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsCotainer = document.getElementById("cart-items")
const cartTotal= document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCouter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")


let cart = [];

//abrir o modal do carrinho 
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
})

//fechar o modal quando clicar fora 
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){

    let parentButton = event.target.closest(".add-to-cart-btn")

if (parentButton){
    const name = parentButton.getAttribute("data-name")
    const price = parentButton.getAttribute("data-price")
    addToCart(name, price)
  }
    
  })
//add no carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1;
        return;
     }

     cart.push({
        name,
        price,
        quantity: 1,
     })

    
     updateCartModal()
}

//atualiza o carrinho
function updateCartModal(){
    cartItemsCotainer.innerHTML = "";
    let total = 0;
    cart.forEach(item =>{
        const cartItemsElement = document.createElement("div");
        cartItemsElement.classList.add("flex", "justify-between", "md-4", "flex-col")

        cartItemsElement.innerHTML = `
        <div class="flex items-center justify-between">
           <div>
           <p class="font-medium">${item.name}</p>
           <p>qtd: ${item.quantity}</p>
           <p class="font-medium mt-2">R$ ${Number.parseFloat(item.price).toFixed(2)}</p>
           </div>
             <div>
             <button class="remove-from-cart-btn" data-name="${item.name}">
             Remover
             </button>
              <div>
          </div>
        `

        total += item.price * item.quantity;
        
        cartItemsCotainer.appendChild(cartItemsElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style:"currency",
        currency:"BRL"
    });

    cartCouter.innerHTML = cart.length;
}

//funçao apra remover o item do carrinho 

cartItemsCotainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
   const index = cart.findIndex(item => item.name === name);

   if(index !== -1){
    const item = cart[index];
    if(item.quantity > 1){
        item.quantity -=1;
        updateCartModal();
        return;
    }
    cart.splice(index, 1);
    updateCartModal();
   }

}
   addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !==""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

   })

   checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestauranteOpen();
    if(!isOpen){
       alert("RESTAURANTE FECHADO NO MOMENTO!")
       return;
    }
    if(cart.lenght === 0) return;
        
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
       }

       //enviar o pedido para api do whats 
       const cartiTEMS = cart.map((item) => {
        return (
        ` ${item.name} quantidade: (${item.quantity}) preço: R$${item.price}`
        )
       }).join("")

       const message = encodeURIcomponent(cartItem)
       const phone = "61992580478"

       window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

       cart = [];
       updateCartModal();
   })

  function checkRestauranteOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora <= 23; 
  }

  const spanItem = document.getElementById("date-span")
  const isOpen = checkRestauranteOpen();

  if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
  }else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
  }








