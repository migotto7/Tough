const urlParams = new URLSearchParams(window.location.search);
const bootId = urlParams.get("bootId");

fetch("../../data/products/boots.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    fillProductInfo(getCurrentBoot(data));
  })
  .catch((error) => console.error("Error fetching JSON data:", error));

const fillProductInfo = (bootData) => {
  document.querySelector(".product-title").textContent = bootData.title;
  document.querySelector(".product-preview img").setAttribute("src", bootData["image-url"]);
  document.querySelector(".product-details h2").textContent = "Sobre esse item:";
  document.querySelector(".product-details p:nth-of-type(1)").textContent = bootData.description;
  document.querySelector(".product-details ul li:nth-of-type(1) span").textContent = bootData.Color;
  document.querySelector(".product-details ul li:nth-of-type(2) span").textContent = bootData.Disponibilidade;
  document.querySelector(".product-details ul li:nth-of-type(3) span").textContent = bootData.Categoria;
  document.querySelector(".product-price .last-price span").textContent = bootData.oldPrice;
  document.querySelector(".product-price .new-price span").textContent = bootData.NewPrice;
}


const getCurrentBoot = (boots) => {
  let currentBoot;
  for (const boot of boots){
    console.log({bootId: boot.id})
    console.log({bootsId: +bootId})
    if (boot.id === +bootId) return currentBoot = boot;
  }
}