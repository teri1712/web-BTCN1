let news1_open = true;
let news2_open = true;
let news3_open = true;
let news4_open = true;

function onNewsChanged(id) {
  const news = document.getElementById(id);
  const header = news.querySelector(".news-header");
  const content = news.querySelector("p");
  const drag = header.querySelector(".drag");
  const expand = header.querySelector(".expand");

  let open;
  if (id.includes("news1")) {
    news1_open = !news1_open;
    open = news1_open;
  } else if (id.includes("news2")) {
    news2_open = !news2_open;
    open = news2_open;
  } else if (id.includes("news3")) {
    news3_open = !news3_open;
    open = news3_open;
  } else if (id.includes("news4")) {
    news4_open = !news4_open;
    open = news4_open;
  }
  if (open) {
    content.style.display = "block";
    header.style.backgroundColor = "#ff8207";
    header.style.color = "white";
    drag.querySelector("img").src = "/images/drag-white.png";
    expand.querySelector("img").src = "/images/close.png";
  } else {
    content.style.display = "none";
    header.style.backgroundColor = "#ffd9b3";
    header.style.color = "grey";
    drag.querySelector("img").src = "/images/drag-black.png";
    expand.querySelector("img").src = "/images/expand.png";
  }
}

function onNewsDragged(event, id) {
  document.body.style.cursor = "ns-resize";

  const element = document.getElementById(id);
  const shadow = element.cloneNode(true);
  shadow.style.zIndex = 1000;
  shadow.style.position = "absolute";
  shadow.style.opacity = 0.5;
  shadow.style.width = "100%";

  const x = event.clientX;
  const y = event.clientY;
  const offsetLeft = element.offsetLeft;
  const offsetTop = element.offsetTop;

  shadow.style.left = offsetLeft + "px";
  shadow.style.top = offsetTop + "px";

  element.parentElement.appendChild(shadow);

  shadow.onmousemove = function (e) {
    const xDiff = e.clientX - x;
    const yDiff = e.clientY - y;

    shadow.style.left = xDiff + offsetLeft + "px";
    shadow.style.top = yDiff + offsetTop + "px";
  };

  shadow.onmouseup = function (e) {
    inferPosition(shadow, element);
    shadow.onmousemove = null;
    shadow.onmouseup = null;
    element.parentElement.removeChild(shadow);
    document.body.style.cursor = "default";
  };
}

function inferPosition(dragged, real) {
  const side = document.querySelector(".side");
  const draggedRect = dragged.getBoundingClientRect();
  for (let i = 0; i < side.children.length; i++) {
    const news = side.children[i];
    const newsRect = news.getBoundingClientRect();
    if (news.style.position === "absolute") continue;
    if (newsRect.left > draggedRect.right || newsRect.right < draggedRect.left)
      return;
    if (newsRect.top >= draggedRect.top) {
      side.insertBefore(real, news);
      return;
    }
  }
  side.appendChild(real);
}
