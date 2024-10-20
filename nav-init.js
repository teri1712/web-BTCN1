let currentMenu = "menu1";

function onMenuChanged(id) {
  currentMenu = id;
  modify("menu1");
  modify("menu2");
  modify("menu3");
  modify("menu4");
  modify("menu5");
}

function modify(id) {
  const navMenu = document.getElementById(id);
  const footerMenu = document.getElementById("footer-" + id).querySelector("p");
  const active = currentMenu === id;
  if (active) {
    navMenu.classList.add("nav-item-active");
    footerMenu.classList.add("footer-item-active");
  } else {
    navMenu.classList.remove("nav-item-active");
    footerMenu.classList.remove("footer-item-active");
  }
}
