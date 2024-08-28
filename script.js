const menuContainer = document.querySelector(".menu");
const navBar = document.querySelector(".nav-bar");
const overlay = document.querySelector(".overlay");

const bookmarkContainer = document.querySelector(".bookmark-container");

const backProjectButton = document.getElementById("back-project-button");
const backProjectContainer = document.querySelector(".back-project-container");
const backProjectCloseButton = document.getElementById("closing-menu-button");

const supportHeaders = document.querySelectorAll(".support_header");

const continueButton = document.querySelectorAll(".check-button");
const thanksContainer = document.querySelector(".thanks-container");
const gotItButton = document.getElementById("got-it-button");

function isPositiveNumber(value) {
    const positiveNumberRegex = /^\d+(\.\d+)?$/;
    return positiveNumberRegex.test(value);
}


menuContainer.addEventListener("click",()=>{
    menuContainer.classList.toggle("open");
    navBar.classList.toggle("open");
    overlay.classList.toggle("active");
});

bookmarkContainer.addEventListener("click",()=>{
    const bookmarkStatus = bookmarkContainer.querySelector("#bookmark-status");

    bookmarkContainer.classList.toggle("active");
    if(bookmarkStatus.textContent==="Bookmark"){
        bookmarkStatus.textContent="Bookmarked";
    }
    else{
        bookmarkStatus.textContent="Bookmark";
    }
});

backProjectButton.addEventListener("click",()=>{
    backProjectContainer.classList.add("active");
    overlay.classList.add("active");
});

backProjectCloseButton.addEventListener("click",()=>{
    backProjectContainer.classList.remove("active");
    overlay.classList.remove("active");
});

supportHeaders.forEach(header=>{
    header.addEventListener("click",()=>{
        const radioButton = header.querySelector("input[type=radio]");
        const activeEnterPledgeContainers = document.querySelectorAll(".enter-pledge-container.active");
        const currentSupportContainer = header.parentElement;
        const currentEnterPledgeContainer = currentSupportContainer.querySelector(".enter-pledge-container");

        radioButton.checked=true;
        activeEnterPledgeContainers.forEach(container=>{
            const supportContainer = container.parentElement;

            container.classList.remove("active"); /* To remove the recent active containers */
            supportContainer.style.borderColor="";
            supportContainer.style.borderWidth="";
        });
        if(!currentSupportContainer.classList.contains("out-of-stock")){
            currentEnterPledgeContainer.classList.add("active");
            
            currentSupportContainer.style.borderColor=("var(--moderate-cyan)");
            currentSupportContainer.style.borderWidth="2px"
        }

    });
});

continueButton.forEach(button=>{
    button.addEventListener("click",()=>{
        const currentInput = button.parentElement.querySelector("input");
        if(!isPositiveNumber(currentInput.value)){
            alert("Please enter a valid number");
        }
        else{
            const currentContainer = button.closest(".support-container");
            const productsLeft = currentContainer.querySelector(".products");
            const totalBacked = document.getElementById("total-backed");
            const totalBackers = document.getElementById("total-backers");

            if(productsLeft){
                const productsLeftOnAboutProject = document.getElementById(`${productsLeft.classList[1]}`);
                productsLeft.textContent=`${Number(productsLeft.textContent)-1}`;
                productsLeftOnAboutProject.textContent = productsLeft.textContent;
            }

            totalBacked.textContent = `${Number(totalBacked.textContent.replace(/[$,]/g, ''))+Number(currentInput.value)}`;
            totalBackers.textContent = `${Number(totalBackers.textContent.replace(/,/g, '')) + 1}`;

            backProjectContainer.classList.remove("active");
            thanksContainer.classList.add("active");
        }
    });
});

gotItButton.addEventListener("click",()=>{
    thanksContainer.classList.remove("active");
});