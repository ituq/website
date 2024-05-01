menuSmall = document.querySelector("li#menuSmall");
navSmall = document.querySelector("nav.menuSmall");
menuSmall.addEventListener("click", e=>{
  navSmall.classList.toggle("active");
  menuSmall.classList.toggle("active");
});
