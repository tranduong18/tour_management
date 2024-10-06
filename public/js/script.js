// tour-images
const tourImages = document.querySelector(".tour-images");
if(tourImages){
    const swiper = new Swiper(".tour-images", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
    });
}
// End tour-images

// alert-add-cart-success
const alertAddCartSuccess = () => {
    const elementAlert = document.querySelector("[alert-add-cart-success]");
    console.log(elementAlert);
    if(elementAlert){
        elementAlert.classList.remove("alert-hidden");

        setTimeout(() => {
           elementAlert.classList.add("alert-hidden"); 
        }, 3000);
    }
}
// End alert-add-cart-success

// Giỏ hàng
const cart = localStorage.getItem("cart");
if(!cart){
    localStorage.setItem("cart", JSON.stringify([]));
}

const formAddToCart = document.querySelector("[form-add-to-cart]");
if(formAddToCart){
    formAddToCart.addEventListener("submit", (event) => {
        event.preventDefault();

        const tourId = parseInt(formAddToCart.getAttribute("tour-id"));
        const quantity = parseInt(formAddToCart.quantity.value);

        if(tourId && quantity > 0){
            const cart = JSON.parse(localStorage.getItem("cart"));
            
            const existTour = cart.find(item => item.tourId == tourId);

            if(existTour){
                existTour.quantity = existTour.quantity + quantity;
            }
            else{
                cart.push({
                    tourId: tourId,
                    quantity: quantity
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alertAddCartSuccess();
        }
    });
}
// Hết Giỏ hàng