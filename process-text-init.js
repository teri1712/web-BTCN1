let menu_open = false;
let current_text_color = "#ff0000";
let current_background = "#ffff00";
let current_bold = false;
let current_italic = false;
let current_underline = false;

const paragraph_full =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu nisl et urna efficitur aliquam. In rutrum tortor urna, sed aliquam lacus faucibus vel. Integer sit amet elementum purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Ut eleifend sodales magna, vel vehicula neque laoreet et. Nam malesuada, sem aliquam laoreet imperdiet, velit massa gravida erat, vel aliquam justo ipsum vel mauris. Pellentesque feugiat neque vitae augue pellentesque consequat. Nullam venenatis diam ac diam dignissim tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur condimentum magna sem, vitae consectetur ex ornare at. Duis ullamcorper elit augue, ornare convallis turpis viverra a. Pellentesque vitae magna maximus, rhoncus nisi quis, elementum lectus. Duis cursus, est nec consequat ultricies, lacus ante volutpat elit, eget tincidunt mauris velit nec odio. Nunc suscipit ligula quam, id consequat nisl molestie varius. Maecenas a nisl lacus. Maecenas suscipit augue id fermentum pharetra.";

function onClickToolMenu() {
  const menu = $(".sample-text-selection").first();
  const tool_button = $("#tool");
  const rect = tool_button[0].getBoundingClientRect();
  console.log(rect);
  menu_open = !menu_open;
  if (menu_open) {
    menu.css({
      left:
        (rect.left + rect.right - menu[0].getBoundingClientRect().width) / 2 -
        20 +
        "px",
      top: rect.bottom + "px",
      visibility: "visible",
    });
  } else {
    menu.css("visibility", "hidden");
  }
}

function performHighlight() {
  const regexField = $("#regex-field");
  const regexPattern = regexField.val();
  if (regexPattern.length === 0) return;
  let regex;

  try {
    regex = new RegExp(regexPattern, "gi");
  } catch (e) {
    alert(e.message);
    return;
  }

  const paragraphElement = $("#paragraph-content");
  const paragraph = paragraphElement.text();
  const matches = paragraph.match(regex);

  if (matches) {
    let spanned = paragraph;
    matches.forEach((match) => {
      const span = `<span style="
        color: ${current_text_color};
        background-color: ${current_background};
        text-decoration: ${current_underline ? "underline" : "none"};
        font-weight: ${current_bold ? "bold" : "normal"};
        font-style: ${current_italic ? "italic" : "normal"};
    ">${match}</span>`;
      spanned = spanned.replace(new RegExp(`(${match})(?![^<]*>)`, "gi"), span);
    });
    paragraphElement.html(spanned);
  }
}

function performReset() {
  const paragraphElement = $("#paragraph-content");
  paragraphElement.html(paragraph_full);
}

function performDelete() {
  const regexField = $("#regex-field");
  const regexPattern = regexField.val();
  if (regexPattern.length === 0) return;

  let regex;

  try {
    regex = new RegExp(regexPattern, "gi");
  } catch (e) {
    alert(e.message);
    return;
  }

  const paragraphElement = $("#paragraph-content");
  const paragraph = paragraphElement.text();
  const matches = paragraph.match(regex);

  if (matches) {
    let result = paragraph;
    matches.forEach((match) => {
      result = result.replace(new RegExp(match, "g"), ""); // Replace match with empty string
    });
    paragraphElement.html(result);
  }
}

function onBoldChanged() {
  const sample = $("#sample-text");
  current_bold = !current_bold;
  sample.css("font-weight", current_bold ? "bold" : "normal");
}

function onItalicChanged() {
  const sample = $("#sample-text");
  current_italic = !current_italic;
  sample.css("font-style", current_italic ? "italic" : "normal");
}

function onUnderlineChanged() {
  const sample = $("#sample-text");
  current_underline = !current_underline;
  sample.css("text-decoration", current_underline ? "underline" : "none");
}

function onTextColorChanged() {
  const sample = $("#sample-text");
  const color_picker = $("#text-color");
  current_text_color = color_picker.val();
  sample.css("color", current_text_color);
}

function onBackgroundColorChanged() {
  const sample = $("#sample-text");
  const color_picker = $("#text-background");
  current_background = color_picker.val();
  sample.css("background-color", current_background);
}
