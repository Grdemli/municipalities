// 🚀 Flag Spotter – cleaned script (v3.1)
// – Mobile‑friendly, search, reset, map highlighting with lower‑case IDs fixed
// – Removed accidental duplicate code causing syntax errors

/*****  HOW THE MAP WORKS  ************************************************
  •   highlightMap() looks for both upper‑ and lower‑case ids.
  •   When you mark a flag as seen, its country path (or <g>) gains .country-seen.
***************************************************************************/

// ⏳ 1.  Municipal DATA  -----------------------------------------------------
const municipalities = [

{ code: "ab", name: "აბაშა", index: 21 },	
{ code: "ad", name: "ადიგენი", index: 41 },	
{ code: "am", name: "ამბროლაური", index: 5 },	
{ code: "as", name: "ასპინძა", index: 48 },	
{ code: "ak", name: "ახალქალაქი", index: 50 },	
{ code: "ac", name: "ახალციხე", index: 42 },	
{ code: "at", name: "ახმეტა", index: 12 },	
{ code: "ba", name: "ბათუმი", index: 62 },	
{ code: "bd", name: "ბაღდათი", index: 26 },	
{ code: "bo", name: "ბოლნისი", index: 54 },	
{ code: "br", name: "ბორჯომი", index: 36 },	
{ code: "ga", name: "გარდაბანი", index: 60 },	
{ code: "go", name: "გორი", index: 16 },	
{ code: "gu", name: "გურჯაანი", index: 39 },	
{ code: "de", name: "დედოფლისწყარო", index: 51 },	
{ code: "dm", name: "დმანისი", index: 52 },	
{ code: "du", name: "დუშეთი", index: 9 },	
{ code: "va", name: "ვანი", index: 30 },	
{ code: "ze", name: "ზესტაფონი", index: 25 },	
{ code: "zu", name: "ზუგდიდი", index: 10 },	
{ code: "tb", name: "თბილისი", index: [58, 59] },	
{ code: "tw", name: "თეთრიწყარო", index: 44 },	
{ code: "te", name: "თელავი", index: 24 },	
{ code: "tj", name: "თერჯოლა", index: 22 },	
{ code: "ti", name: "თიანეთი", index: 19 },	
{ code: "ka", name: "კასპი", index: 34 },	
{ code: "lg", name: "ლაგოდეხი", index: 35 },	
{ code: "la", name: "ლანჩხუთი", index: 28 },	
{ code: "le", name: "ლენტეხი", index: 1 },	
{ code: "mn", name: "მარნეული", index: 56 },	
{ code: "ma", name: "მარტვილი", index: 6 },	
{ code: "me", name: "მესტია", index: 0 },	
{ code: "mc", name: "მცხეთა", index: 61 },	
{ code: "ni", name: "ნინოწმინდა", index: 53 },	
{ code: "oz", name: "ოზურგეთი", index: 33 },	
{ code: "on", name: "ონი", index: 2 },	
{ code: "ru", name: "რუსთავი", index: 65 },	
{ code: "sj", name: "საგარეჯო", index: 38 },	
{ code: "sa", name: "სამტრედია", index: 23 },	
{ code: "sx", name: "საჩხერე", index: 17 },	
{ code: "se", name: "სენაკი", index: 15 },	
{ code: "si", name: "სიღნაღი", index: 49 },	
{ code: "ty", name: "ტყიბული", index: 14 },	
{ code: "po", name: "ფოთი", index: 63 },	
{ code: "kr", name: "ქარელი", index: 20 },	
{ code: "ke", name: "ქედა", index: 47 },	
{ code: "ko", name: "ქობულეთი", index: 37 },	
{ code: "ku", name: "ქუთაისი", index: 64 },	
{ code: "ya", name: "ყაზბეგი", index: 8 },	
{ code: "yv", name: "ყვარელი", index: 31 },	
{ code: "sh", name: "შუახევი", index: 43 },	
{ code: "ct", name: "ჩოხატაური", index: 32 },	
{ code: "ch", name: "ჩხოროწყუ", index: 4 },	
{ code: "ca", name: "ცაგერი", index: 7 },	
{ code: "wa", name: "წალენჯიხა", index: 3 },	
{ code: "wk", name: "წალკა", index: 45 },	
{ code: "wy", name: "წყალტუბო", index: 13 },	
{ code: "wi", name: "ჭიათურა", index: 18 },	
{ code: "xg", name: "ხარაგაული", index: 29 },	
{ code: "xa", name: "ხაშური", index: 27 },	
{ code: "xe", name: "ხელვაჩაური", index: 46 },	
{ code: "xb", name: "ხობი", index: 55 },	
{ code: "xn", name: "ხონი", index: 11 },	
{ code: "xu", name: "ხულო", index: 40 },	
];

// 2. STATE
let seenFlags = new Set(JSON.parse(localStorage.getItem("seenFlags") || "[]"));

// 3. RENDER GRID
function render(filter = "") {
  const list = document.getElementById("flag-list");
  list.innerHTML = "";
  municipalities
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(country => {
      const li = document.createElement("li");
      if (seenFlags.has(country.code)) li.classList.add("seen");
      li.innerHTML = `<img class="flag-img" src="assets/flags/${country.code.toLowerCase()}.svg" alt="${country.name} flag"><span class="name">${country.name}</span>`;
      li.onclick = () => toggleSeen(country.code);
      list.appendChild(li);
    });
  updateCounter();
  highlightMap();
}

function toggleSeen(code) {
  seenFlags.has(code) ? seenFlags.delete(code) : seenFlags.add(code);
  localStorage.setItem("seenFlags", JSON.stringify([...seenFlags]));
  render(document.getElementById("search").value);
}

function updateCounter() {
  const el = document.getElementById("counter");
  if (el) el.textContent = `${seenFlags.size} / ${municipalities.length} seen`;
}

// 4. MAP UTILS
function getSvgRoot() {
  const holder = document.getElementById("map");
  if (!holder) return null;
  if (holder.tagName.toLowerCase() === "object") return holder.contentDocument; // may be null until load
  return holder; // inline svg itself
}

function ensureHighlightStyle(svgRoot) {
  if (!svgRoot) return;
  const id = "flagspotter-style";
  if (!svgRoot.getElementById(id)) {
    const style = svgRoot.createElementNS("http://www.w3.org/2000/svg", "style");
    style.id = id;
    style.textContent = `.country-seen{fill:#7AC77F!important;stroke:#357c39!important;stroke-width:0.35!important;}`;
    svgRoot.documentElement ? svgRoot.documentElement.appendChild(style) : svgRoot.appendChild(style);
  }
}

function highlightMap() {
  const paths = document.querySelectorAll("#map-container svg path");

paths.forEach(p => {
  p.classList.remove("country-seen");
  p.classList.remove("occupied");
});

const occupied = Array.from({ length: 165 - 66 + 1 }, (_, i) => i + 66);

occupied.forEach(i => {
  if (paths[i]) {
    paths[i].classList.add("occupied");
  }
});

  municipalities.forEach(m => {
    if (seenFlags.has(m.code)) {

      if (Array.isArray(m.index)) {
        m.index.forEach(i => {
          if (paths[i]) paths[i].classList.add("country-seen");
        });
      } else {
        if (paths[m.index]) {
          paths[m.index].classList.add("country-seen");
        }
      }

    }
  });
}
function resetFlags() {
  if (confirm("Are you sure you want to reset your seen flags?")) {
    seenFlags.clear();
    localStorage.removeItem("seenFlags");
    render();
  }
}

// 5. INIT
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search").oninput = e => render(e.target.value);
  document.getElementById("reset-button").onclick = resetFlags;

  // --- NEW DOWNLOAD CODE ---
  document.getElementById("download-button").addEventListener("click", () => {
    const mapElement = document.getElementById("map-container");
    
    // This takes a "picture" of the map container
    html2canvas(mapElement, { backgroundColor: "#ffffff" }).then(canvas => {
      const link = document.createElement("a");
      link.download = "My-Georgia-Map.jpg"; // The name of the downloaded file
      link.href = canvas.toDataURL("image/jpeg", 0.9);
      link.click();
    });
  });

  const mapEl = document.getElementById("map");
  if (mapEl && mapEl.tagName.toLowerCase() === "object") {
    mapEl.addEventListener("load", () => {
      highlightMap();
    });
  } else {
    // inline svg already present
    highlightMap();
  }

  render();
});