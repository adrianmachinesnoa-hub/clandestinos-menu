const DATA_FILES = {
  "picaderas": "data/picaderas.json",
  "cafes": "data/cafes.json",
  "bebidas-cervezas": "data/bebidas-cervezas.json",
  "cocteleria-postres": "data/cocteleria-postres.json"
};

let SITE = null;
let MENUS = {};

async function loadJson(path){
  const response = await fetch(path, {cache:"no-store"});
  if(!response.ok) throw new Error(`No se pudo cargar ${path}`);
  return response.json();
}

function money(value){
  const number = Number(value || 0);
  return `${SITE.currency || "$"} ${number.toLocaleString("es-CU")}`;
}

function renderSite(){
  document.title = `${SITE.title || "Clandestinos Bar Café"} — Menú`;
  document.getElementById("siteTitle").textContent = SITE.title || "";
  document.getElementById("tagline").textContent = SITE.tagline || "";
  document.getElementById("location").textContent = `📍 ${SITE.location || ""}`;
  document.getElementById("addressInfo").textContent = SITE.location || "";
  document.getElementById("menuNote").textContent = SITE.menu_note || "";

  document.getElementById("waLink").href = SITE.whatsapp || "#";
  document.getElementById("fbLink").href = SITE.facebook || "#";

  document.getElementById("hours").innerHTML = `
    <div><span>Lunes a Viernes</span><strong>${SITE.hours?.lunes_viernes || "—"}</strong></div>
    <div><span>Sábados</span><strong>${SITE.hours?.sabados || "—"}</strong></div>
    <div><span>Domingos</span><strong>${SITE.hours?.domingos || "—"}</strong></div>
  `;

  const nav = document.getElementById("categoryNav");
  const menu = document.getElementById("menu");
  nav.innerHTML = "";
  menu.innerHTML = "";

  for (const category of (SITE.categories || [])) {
    if (category.visible === false) continue;
    const items = MENUS[category.id] || [];
    const link = document.createElement("a");
    link.href = `#cat-${category.id}`;
    link.textContent = `${category.emoji || "•"} ${category.title}`;
    nav.appendChild(link);

    const section = document.createElement("section");
    section.className = "category";
    section.id = `cat-${category.id}`;

    const visibleItems = items.filter(item => SITE.show_unavailable || item.available);
    const countAvailable = items.filter(item => item.available).length;

    section.innerHTML = `
      <div class="category__head">
        <h2 class="category__title"><span>${category.emoji || "•"}</span>${category.title}</h2>
        <span class="category__count">${countAvailable} disponible${countAvailable === 1 ? "" : "s"}</span>
      </div>
      <div class="items"></div>
    `;

    const container = section.querySelector(".items");
    if (!visibleItems.length) {
      container.innerHTML = `<div class="empty">No hay productos visibles en esta categoría ahora mismo.</div>`;
    } else {
      for (const item of visibleItems) {
        const card = document.createElement("article");
        card.className = `item ${item.available ? "" : "is-unavailable"}`;
        card.innerHTML = `
          <div>
            <div class="item__name">${escapeHtml(item.name || "")}</div>
            <div class="item__meta">${escapeHtml(item.size || "")}</div>
          </div>
          <div class="item__right">
            <div class="price">${money(item.price)}</div>
            <div class="badge ${item.available ? "badge--ok" : "badge--no"}">${item.available ? "Disponible" : "Agotado"}</div>
          </div>
        `;
        container.appendChild(card);
      }
    }
    menu.appendChild(section);
  }
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}

async function init(){
  try{
    SITE = await loadJson("data/site.json");
    const results = await Promise.all(
      Object.entries(DATA_FILES).map(async ([id, file]) => [id, await loadJson(file)])
    );
    MENUS = Object.fromEntries(results);
    renderSite();
  }catch(error){
    console.error(error);
    document.getElementById("menu").innerHTML = `
      <div class="empty">
        No se pudo cargar el menú en este momento. Recarga la página o verifica la conexión.
      </div>
    `;
  }

  document.getElementById("onlyAvailable").addEventListener("change", (event) => {
    SITE.show_unavailable = !event.target.checked;
    renderSite();
    window.scrollTo({top:0, behavior:"smooth"});
  });
}

init();
