let focused = false;

function onDropdownClick(event) {
  event.preventDefault();
  if (focused) {
    onDropdownBlur();
    return;
  }
  focused = true;
  const $select = $("#dropdown");
  const $icon_list = $("#icon-list");

  const rec = $select[0].getBoundingClientRect();

  $icon_list.css({
    left: rec.left + "px",
    top: rec.bottom + $(window).scrollTop() + "px",
    visibility: "visible",
  });

  $select.focus();
}

function onDropdownBlur() {
  focused = false;
  const $icon_list = $("#icon-list");
  $icon_list.css("visibility", "hidden");
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

function addAnimal() {
  const id = "animal" + Date.now();
  const card = document.createElement("div");
  card.id = id;
  card.classList.add("card");

  const card_background = document.createElement("div");
  const p = document.createElement("p");
  card_background.classList.add("card-background");

  const img = document.createElement("img");
  if (currrentAnimal === "capy") {
    img.src = "images/animals/capybara-shadow.png";
    p.textContent = "capybara";
  } else if (currrentAnimal === "aligato") {
    img.src = "images/animals/crocodile-shadow.png";
    p.textContent = "crocodile";
  } else {
    img.src = "images/animals/buffalo-shadow.png";
    p.textContent = "buffalo";
  }
  img.draggable = false;

  card.appendChild(card_background);
  card_background.appendChild(img);
  card.appendChild(p);

  const card_container = document.getElementById("card-container");
  const shadow_container = document.getElementById("shadow-container");

  card_container.appendChild(card);

  const shadow = card.cloneNode(true);
  shadow.id = id + "-shadow";
  shadow.style.position = "absolute";
  shadow.style.zIndex = card_container.children.length;
  shadow.style.left = card.offsetLeft + "px";
  shadow.style.top = card.offsetTop + "px";
  shadow.intervalId = null;
  shadow_container.appendChild(shadow);

  card.onmousedown = function (e) {
    onDragTurnOn(e, id);
  };
}

let currentShadow;

function switchDragState(dragged) {
  const shadow_container = document.getElementById("shadow-container");
  const card_container = document.getElementById("card-container");

  for (let i = 0; i < card_container.children.length; i++) {
    const card = card_container.children[i];
    const card_background = card.querySelector(".card-background");
    const name = card.querySelector("p");
    card_background.style.visibility = dragged ? "hidden" : "visible";
    name.style.visibility = dragged ? "hidden" : "visible";
  }

  shadow_container.style.visibility = !dragged ? "hidden" : "visible";
}

function onDragTurnOn(event, id) {
  const shadow_container = document.getElementById("shadow-container");
  const card_container = document.getElementById("card-container");

  switchDragState(true);
  const real = card_container.querySelector("#" + id);
  real.style.border = "2px dashed grey";
  currentShadow = shadow_container.querySelector("#" + id + "-shadow");
  currentShadow.style.zIndex = 1000;

  const x = event.clientX;
  const y = event.clientY;

  const offsetLeft = currentShadow.offsetLeft;
  const offsetTop = currentShadow.offsetTop;

  currentShadow.onmousemove = function (e) {
    const xDiff = e.clientX - x;
    const yDiff = e.clientY - y;

    currentShadow.style.left = xDiff + offsetLeft + "px";
    currentShadow.style.top = yDiff + offsetTop + "px";
    let currentPos;
    for (
      currentPos = 0;
      currentPos < card_container.children.length;
      currentPos++
    ) {
      if (card_container.children[currentPos].id === id) break;
    }
    checkCanDrop(currentPos);
  };

  currentShadow.onmouseup = function (e) {
    currentShadow.onmousemove = null;
    currentShadow.onmouseup = null;
    real.style.border = "none";
    moveForwards(currentShadow);
  };
}

function checkCanDrop(currentPos) {
  const draggedRect = currentShadow.getBoundingClientRect();
  const card_container = document.getElementById("card-container");

  const total = card_container.children.length;
  let nextPos;
  for (nextPos = 0; nextPos < total; nextPos++) {
    const card = card_container.children[nextPos];
    const card_rect = card.getBoundingClientRect();
    if (
      card_rect.left <= draggedRect.left &&
      card_rect.right >= draggedRect.left &&
      card_rect.top <= draggedRect.top &&
      card_rect.bottom >= draggedRect.top
    ) {
      break;
    }
  }

  if (currentPos == nextPos || nextPos == total) return;
  const real = card_container.children[currentPos];
  if (nextPos < currentPos) {
    const ahead = card_container.children[nextPos];
    card_container.insertBefore(real, ahead);
  } else {
    if (nextPos == total - 1) {
      card_container.appendChild(real);
    } else {
      const ahead = card_container.children[nextPos + 1];
      card_container.insertBefore(real, ahead);
    }
  }

  for (let i = 0; i < total; i++) {
    if (i == nextPos) continue;
    const shadow_container = document.getElementById("shadow-container");
    const shadow = shadow_container.querySelector(
      "#" + card_container.children[i].id + "-shadow"
    );
    moveForwards(shadow);
  }
}

function moveForwards(shadow) {
  if (shadow.intervalId != null) {
    clearInterval(shadow.intervalId);
    shadow.intervalId = null;
  }

  const card_container = document.getElementById("card-container");
  const id = shadow.id.slice(0, -"-shadow".length);
  let nextPos;
  for (nextPos = 0; nextPos < card_container.children.length; nextPos++) {
    if (card_container.children[nextPos].id === id) break;
  }
  shadow.style.zIndex = nextPos + 1;

  const next = card_container.children[nextPos];
  const next_rect = next.getBoundingClientRect();
  const shadow_rect = shadow.getBoundingClientRect();

  const offsetLeft = shadow.offsetLeft;
  const offsetTop = shadow.offsetTop;

  const width = next_rect.left - shadow_rect.left;
  const height = next_rect.top - shadow_rect.top;

  let current_x = 0;
  let current_y = 0;

  if (width == 0 && height == 0) return;

  const intervalId = setInterval(moveElement, 20);
  shadow.intervalId = intervalId;
  function moveElement() {
    current_x += (20 * width) / 300;
    current_y += (20 * height) / 300;

    shadow.style.left = offsetLeft + current_x + "px";
    shadow.style.top = offsetTop + current_y + "px";
    if (Math.abs(current_x) >= Math.abs(width)) {
      shadow.style.left = next.offsetLeft + "px";
      shadow.style.top = next.offsetTop + "px";

      clearInterval(intervalId);
      shadow.intervalId = null;
      if (currentShadow === shadow) {
        switchDragState(false);
        currentShadow = null;
      }
    }
  }
}
