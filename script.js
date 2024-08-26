const menuContainer = document.querySelector(".menu");
const navBar = document.querySelector(".nav-bar");

menuContainer.addEventListener("click",()=>{
    menuContainer.classList.toggle("open");
    navBar.classList.toggle("open");
});