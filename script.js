// active hamburger menu

let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.addEventListener("click",()=>{
  menuIcon.classList.toggle("active");
  navlist.classList.toggle("active");
  document.body.classList.toggle("open");
});

//remove navlist

navlist.addEventListener("click", ()=>{
  navlist.classList.remove("active");
  menuIcon.classList.remove("active");
  document.body.classList.remove("open");
})


//rotate text js 
/*let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char, i) =>
  `<b style="transform: rotate(${i * 6.3}deg)">${char}</b>`
).join("");*/


//switch between about button*/

const buttons = document.querySelectorAll(".about-btn button");
const contents = document.querySelectorAll(".content");

buttons.forEach((button, index) => {
  button.addEventListener("click",() =>{
    contents.forEach(content => content.style.display = "none");
    contents[index].style.display = "block";
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});


function changeContent(section) {
  // Cache toutes les sections de contenu
  const contents = document.querySelectorAll('.content');
  contents.forEach(content => content.style.display = 'none');
  
  // Supprime la classe "active" de tous les boutons
  const buttons = document.querySelectorAll('.about-btn button');
  buttons.forEach(button => button.classList.remove('active'));

  // Affiche la section de contenu sélectionnée
  const selectedContent = document.querySelector(`.${section}`);
  if (selectedContent) {
    selectedContent.style.display = 'block';
  }

  // Ajoute la classe "active" au bouton correspondant en utilisant l'attribut data-section
  const activeButton = Array.from(buttons).find(button => button.getAttribute('data-section') === section);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("contactModal");
  const closeBtn = document.querySelector(".close");

  // Sélectionne les 3 boutons
  const openBtns = [
    document.getElementById("openModalBtn"),
    document.getElementById("hireMeBtn"),
    document.getElementById("letschat")
  ];

  // Ajoute un listener à chacun des boutons
  openBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        modal.style.display = "block";
      });
    }
  });

  // Bouton de fermeture
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Fermer en cliquant à l'extérieur
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});





