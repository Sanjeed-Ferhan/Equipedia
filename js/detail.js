/* Equipedia - machine detail page.
   The page declares which machine it shows via <body data-machine="CODE">
   (the machine code, e.g. BLR-01). Content is filled from js/machines.js. */

(function () {
  const body = document.body;
  const code = body.dataset.machine;
  const machine = (window.MACHINES || []).find(function (m) {
    return String(m.code).toLowerCase() === String(code).toLowerCase();
  });

  const nameEl = document.getElementById("mName");
  const codeEl = document.getElementById("mCode");
  const iconEl = document.getElementById("mIcon");
  const statusEl = document.getElementById("mStatus");

  const STATUS_LABEL = { online: "Running", maintenance: "Maintenance", offline: "Offline" };

  if (!machine) {
    if (nameEl) nameEl.textContent = "Machine not found";
    if (codeEl) codeEl.textContent = code || "";
    return;
  }

  document.title = machine.name + " \u2014 Equipedia";
  if (nameEl) nameEl.textContent = machine.name;
  if (codeEl) codeEl.textContent = machine.code;
  if (iconEl) iconEl.textContent = machine.icon || "\u2699";
  if (statusEl) {
    const status = machine.status || "online";
    statusEl.textContent = STATUS_LABEL[status] || status;
    statusEl.className = "badge " + status;
  }

  const specs = [
    ["Asset Code", machine.code],
    ["Department", machine.category],
    ["Location", machine.location],
    ["Status", STATUS_LABEL[machine.status || "online"]]
  ];
  const specHost = document.getElementById("mSpecs");
  if (specHost) {
    specHost.innerHTML = specs.map(function (row) {
      return '<div class="spec"><div class="k">' + row[0] + '</div><div class="v">' +
        (row[1] == null ? "\u2014" : row[1]) + "</div></div>";
    }).join("");
  }
})();
