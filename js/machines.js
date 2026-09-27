/* ============================================================
   Equipedia - Machine data
   ------------------------------------------------------------
   Add one object per machine. The cards on index.html are
   generated automatically from this list.

   Fields:
     name      : Display name of the machine
     code      : Short machine / asset tag (shown on the card)
     category  : Department or group (used for filter chips)
     icon      : Any emoji or character
     status    : "online" | "maintenance" | "offline"
     location  : Where the machine sits
     page      : Link to the detail page (default: machines/<auto>.html)
   ============================================================ */

window.MACHINES = [
  {
    name: "FLS",
    code: "FLS-01",
    category: "Grinding",
    icon: "\u2699\uFE0F",
    status: "online",
    location: "Mill Area",
    page: "https://pub-4aa1de0c9e814b8ca95d7ac7a50a58a0.r2.dev/index.html"
  },
  {
    name: "Loesche",
    code: "LOE-01",
    category: "Grinding",
    icon: "\uD83C\uDFED",
    status: "online",
    location: "Mill Area",
    page: "https://mahiya98.github.io/losche-documents/"
  }
];
