/* Equipedia - card rendering, search and filters */

const STATUS_LABEL = {
  online: "Running",
  maintenance: "Maintenance",
  offline: "Offline"
};

const grid = document.getElementById("grid");
const filtersEl = document.getElementById("filters");
const searchEl = document.getElementById("search");

let activeCategory = "All";

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function cardLink(machine) {
  return machine.page || "machines/" + slugify(machine.name) + ".html";
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c];
  });
}

function buildCard(machine) {
  const status = machine.status || "online";
  const statusText = STATUS_LABEL[status] || status;
  const link = cardLink(machine);
  const article = document.createElement("a");
  article.className = "card";
  article.href = link;
  if (/^https?:\/\//i.test(link)) {
    article.target = "_blank";
    article.rel = "noopener noreferrer";
  }
  article.dataset.search = (
    (machine.name || "") + " " +
    (machine.code || "") + " " +
    (machine.category || "") + " " +
    (machine.location || "")
  ).toLowerCase();
  article.dataset.category = machine.category || "";

  article.innerHTML =
    '<div class="card-top">' +
      '<div class="card-icon">' + (machine.icon || "\u2699") + "</div>" +
      '<span class="card-code">' + escapeHtml(machine.code || "") + "</span>" +
    "</div>" +
    "<h3>" + escapeHtml(machine.name) + "</h3>" +
    '<p class="meta">' + escapeHtml(machine.location || machine.category || "") + "</p>" +
    '<div class="card-footer">' +
      '<span class="badge ' + status + '">' + escapeHtml(statusText) + "</span>" +
      '<span class="card-link">Open</span>' +
    "</div>";

  return article;
}

function render(list) {
  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML = '<div class="empty-state">No machines match your search.</div>';
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach(function (m) {
    frag.appendChild(buildCard(m));
  });
  grid.appendChild(frag);
}

function buildFilters() {
  const categories = ["All"];
  MACHINES.forEach(function (m) {
    if (m.category && categories.indexOf(m.category) === -1) {
      categories.push(m.category);
    }
  });

  filtersEl.innerHTML = "";
  categories.forEach(function (cat) {
    const chip = document.createElement("button");
    chip.className = "chip" + (cat === activeCategory ? " active" : "");
    chip.textContent = cat;
    chip.addEventListener("click", function () {
      activeCategory = cat;
      Array.prototype.forEach.call(filtersEl.children, function (c) {
        c.classList.toggle("active", c === chip);
      });
      applyFilters();
    });
    filtersEl.appendChild(chip);
  });
}

function applyFilters() {
  const term = (searchEl.value || "").trim().toLowerCase();
  const filtered = MACHINES.filter(function (m) {
    const matchesCategory = activeCategory === "All" || m.category === activeCategory;
    const haystack = (
      (m.name || "") + " " + (m.code || "") + " " +
      (m.category || "") + " " + (m.location || "")
    ).toLowerCase();
    return matchesCategory && haystack.indexOf(term) !== -1;
  });
  render(filtered);
}

function renderStats() {
  document.getElementById("statTotal").textContent = MACHINES.length;
  document.getElementById("statOnline").textContent = MACHINES.filter(function (m) {
    return (m.status || "online") === "online";
  }).length;
  const cats = {};
  MACHINES.forEach(function (m) {
    if (m.category) cats[m.category] = true;
  });
  document.getElementById("statCategories").textContent = Object.keys(cats).length;
}

buildFilters();
renderStats();
render(MACHINES);
searchEl.addEventListener("input", applyFilters);
