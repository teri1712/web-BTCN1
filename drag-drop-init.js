let focused = false;
function onDropdownClick(event) {
  event.preventDefault();
  if (focused) {
    onDropdownBlur();
    return;
  }
  focused = true;
  const select = document.getElementById("dropdown");
  const icon_list = document.getElementById("icon-list");

  const rec = select.getBoundingClientRect();

  icon_list.style.left = rec.left + "px";
  icon_list.style.top = rec.bottom + "px";

  icon_list.style.visibility = "visible";
  select.focus();
}
function onDropdownBlur() {
  focused = false;
  const icon_list = document.getElementById("icon-list");
  icon_list.style.visibility = "hidden";
}

let currrentAnimal = "capy";

function onAnimalChanged(animal) {
  console.log(animal);
  const select = document.getElementById("dropdown");

  currrentAnimal = animal;
  if (animal === "capy") {
    select.style.background =
      "url('images/animals/capybara-small.png') no-repeat center";
  } else if (animal === "aligato") {
    select.style.background =
      "url('images/animals/crocodile-small.png') no-repeat center";
  } else {
    select.style.background =
      "url('images/animals/buffalo-small.png') no-repeat center";
  }
  select.style.backgroundColor = "white";
}
