(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("core-theme", theme);
    } catch (err) {
      /* private mode */
    }
    if (toggle) {
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
    applyTheme(currentTheme());
  }

  var dialog = document.getElementById("lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;

  var shot = dialog.querySelector("img");
  var caption = dialog.querySelector(".lightbox-caption");
  var links = Array.prototype.slice.call(document.querySelectorAll(".gallery a"));
  var index = 0;

  function show(next) {
    if (!links.length) return;
    index = (next + links.length) % links.length;
    var link = links[index];
    var figure = link.closest("figure");
    var source = link.querySelector("img");
    shot.src = link.getAttribute("href");
    shot.alt = source ? source.alt : "";
    caption.textContent = figure ? figure.querySelector("figcaption").innerText : "";
    if (!dialog.open) dialog.showModal();
  }

  links.forEach(function (link, i) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      show(i);
    });
  });

  dialog.querySelector("[data-prev]").addEventListener("click", function () {
    show(index - 1);
  });
  dialog.querySelector("[data-next]").addEventListener("click", function () {
    show(index + 1);
  });
  dialog.querySelector("[data-close]").addEventListener("click", function () {
    dialog.close();
  });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(index + 1);
    }
  });
})();
