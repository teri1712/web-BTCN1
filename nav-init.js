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
  const navMenu = $("#" + id);
  const footerMenu = $("#footer-" + id).find("p");
  const active = currentMenu === id;
  if (active) {
    navMenu.addClass("nav-item-active");
    footerMenu.addClass("footer-item-active");
  } else {
    navMenu.removeClass("nav-item-active");
    footerMenu.removeClass("footer-item-active");
  }
}
