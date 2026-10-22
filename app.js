const whatsappNumber = "254791333555";

const vehicles = [
  {
    id: "mercedes-c200-2019",
    year: 2019,
    make: "Mercedes-Benz",
    model: "C200",
    title: "2019 Mercedes-Benz C200",
    category: "sedan",
    bodyType: "Saloon",
    price: 4350000,
    priceLabel: "KES 4.35M",
    engine: "1.6L turbo petrol",
    mileage: "Mileage on request",
    coverIndex: 7,
    photoCount: 10,
    summary: "An elegant C-Class with leather trim, dual-zone climate control and a composed rear-wheel-drive setup.",
    description: "A refined saloon with a 1.6L turbo petrol engine, 9-speed automatic transmission and a considered set of comfort and parking features.",
    specs: [
      ["Engine", "1.6L Turbo Petrol"],
      ["Power", "156 HP"],
      ["Transmission", "9-Speed Automatic"],
      ["Drivetrain", "Rear-Wheel Drive"],
      ["Seating", "5 passengers"],
      ["Mileage", "Ask our team"]
    ],
    features: ["Luxury leather interior", "Dual-zone climate control", "Multifunction steering wheel", "Reverse camera", "Parking sensors", "Mercedes-Benz styling"]
  },
  {
    id: "subaru-forester-2019",
    year: 2019,
    make: "Subaru",
    model: "Forester SKE AWD",
    title: "2019 Subaru Forester SKE AWD",
    category: "suv",
    bodyType: "SUV",
    price: 3880000,
    priceLabel: "KES 3.88M",
    engine: "2.0L petrol mild hybrid",
    mileage: "55,000 km",
    coverIndex: 3,
    photoCount: 13,
    summary: "An all-wheel-drive Forester with EyeSight, a sunroof and a well-equipped cabin.",
    description: "This 2019 Forester SKE AWD is listed with 55,000 km and a 2.0L petrol mild-hybrid engine. Explore the supplied photos and ask us for more details.",
    specs: [
      ["Engine", "2.0L Petrol Mild Hybrid"],
      ["Drivetrain", "AWD"],
      ["Mileage", "55,000 km"],
      ["Year", "2019"]
    ],
    features: ["Sunroof", "Heated seats", "Powered tailgate", "EyeSight", "Blind-spot monitoring", "Headlight washers", "Fog lights", "Alloy wheels"]
  },
  {
    id: "mercedes-glc-250-2017",
    year: 2017,
    make: "Mercedes-Benz",
    model: "GLC 250 4Matic",
    title: "2017 Mercedes-Benz GLC 250 4Matic",
    category: "suv",
    bodyType: "SUV",
    price: 4400000,
    priceLabel: "KES 4.4M",
    engine: "2.0L petrol",
    mileage: "Genuine low mileage",
    coverIndex: 1,
    photoCount: 12,
    summary: "A confident 4Matic SUV with a panoramic sunroof, air suspension and heated electric seats.",
    description: "A premium GLC 250 4Matic presented with a panoramic sunroof, air suspension, heated electric seats and a powered tailgate.",
    specs: [
      ["Engine", "2.0L Petrol"],
      ["Drivetrain", "4Matic"],
      ["Mileage", "Genuine low mileage"],
      ["Year", "2017"]
    ],
    features: ["Panoramic sunroof", "Air suspension", "Heated electric seats", "Powered tailgate", "Daytime lights", "Alloy wheels"]
  },
  {
    id: "nissan-x-trail-2016",
    year: 2016,
    make: "Nissan",
    model: "X-Trail",
    title: "2016 Nissan X-Trail",
    category: "suv",
    bodyType: "SUV",
    price: 1600000,
    priceLabel: "KES 1.6M",
    engine: "2,000cc petrol",
    mileage: "90,000 km",
    coverIndex: 1,
    photoCount: 10,
    summary: "A practical X-Trail with leather interior, alloy rims and 90,000 km on the clock.",
    description: "The 2016 Nissan X-Trail is listed with a 2,000cc petrol engine, leather interior, fog lights, alloy rims and 90,000 km mileage.",
    specs: [
      ["Engine", "2,000cc Petrol"],
      ["Mileage", "90,000 km"],
      ["Year", "2016"]
    ],
    features: ["Leather interior", "Fog lights", "Alloy rims"]
  }
];

const grid = document.querySelector("#vehicle-grid");
const resultsStatus = document.querySelector("#results-status");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#vehicle-search");
const sortSelect = document.querySelector("#vehicle-sort");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const dialog = document.querySelector("#vehicle-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialogButton = document.querySelector(".dialog-close");
const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
let activeFilter = "all";
let activeVehicle = null;
let activePhotoIndex = 0;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function photoPath(vehicle, index) {
  return `assets/vehicles/${vehicle.id}/${String(index + 1).padStart(2, "0")}.jpg`;
}

function whatsappLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function enquiryMessage(vehicle, action = "share more details") {
  return `Hello Viva Motors, I'm interested in the ${vehicle.title} (${vehicle.priceLabel}). Could you ${action}?`;
}

function cardMarkup(vehicle, position) {
  const facts = [vehicle.engine, vehicle.mileage].filter(Boolean);
  const image = photoPath(vehicle, vehicle.coverIndex - 1);
  return `
    <article class="vehicle-card" style="animation-delay:${Math.min(position * 45, 180)}ms">
      <div class="vehicle-image-wrap">
        <button class="vehicle-image-button" type="button" data-open-vehicle="${escapeHTML(vehicle.id)}" aria-label="View details and photos for ${escapeHTML(vehicle.title)}">
          <img src="${image}" alt="${escapeHTML(vehicle.title)}" loading="lazy" />
        </button>
        <span class="vehicle-card-label">${escapeHTML(vehicle.bodyType)}</span>
        <span class="vehicle-open-hint" aria-hidden="true">↗</span>
      </div>
      <div class="vehicle-card-body">
        <div class="vehicle-overline"><span>${escapeHTML(String(vehicle.year))}</span><span>${escapeHTML(vehicle.make)}</span></div>
        <h3>${escapeHTML(vehicle.model)}</h3>
        <p class="vehicle-summary">${escapeHTML(vehicle.summary)}</p>
        <div class="vehicle-facts">${facts.map((fact) => `<span>${escapeHTML(fact)}</span>`).join("")}</div>
        <div class="vehicle-price-row"><span class="vehicle-price-label">Asking price</span><span class="vehicle-price">${escapeHTML(vehicle.priceLabel)}</span></div>
        <div class="vehicle-card-actions">
          <button type="button" data-open-vehicle="${escapeHTML(vehicle.id)}">View the details <span aria-hidden="true">↗</span></button>
          <a class="card-inquire" href="${whatsappLink(enquiryMessage(vehicle))}" target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>`;
}

function sortVehicles(items) {
  const sortBy = sortSelect.value;
  if (sortBy === "price-low") return [...items].sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") return [...items].sort((a, b) => b.price - a.price);
  if (sortBy === "year") return [...items].sort((a, b) => b.year - a.year || b.price - a.price);
  return items;
}

function renderVehicles() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const filtered = vehicles.filter((vehicle) => {
    const matchesFilter = activeFilter === "all" || vehicle.category === activeFilter;
    const searchable = [vehicle.title, vehicle.make, vehicle.model, vehicle.engine, vehicle.bodyType, vehicle.mileage, ...vehicle.features].join(" ").toLocaleLowerCase();
    return matchesFilter && (!query || searchable.includes(query));
  });
  const sorted = sortVehicles(filtered);

  grid.innerHTML = sorted.map(cardMarkup).join("");
  emptyState.hidden = sorted.length !== 0;
  grid.hidden = sorted.length === 0;
  resultsStatus.textContent = `Showing ${sorted.length} ${sorted.length === 1 ? "vehicle" : "vehicles"}`;
}

function renderDialog(vehicle) {
  const specs = vehicle.specs.map(([label, value]) => `
    <div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`).join("");
  const features = vehicle.features.map((feature) => `<li>${escapeHTML(feature)}</li>`).join("");
  dialogContent.innerHTML = `
    <div class="dialog-gallery">
      <img class="dialog-main-image" src="${photoPath(vehicle, activePhotoIndex)}" alt="${escapeHTML(vehicle.title)} — photo ${activePhotoIndex + 1}" />
      <span class="gallery-counter" aria-live="polite">${String(activePhotoIndex + 1).padStart(2, "0")} / ${String(vehicle.photoCount).padStart(2, "0")}</span>
      <div class="gallery-controls" aria-label="Vehicle photo gallery">
        <button type="button" data-gallery-step="-1" aria-label="Previous photo">←</button>
        <button type="button" data-gallery-step="1" aria-label="Next photo">→</button>
      </div>
    </div>
    <div class="dialog-details">
      <p class="eyebrow"><span class="eyebrow-line"></span> ${escapeHTML(vehicle.year)} · ${escapeHTML(vehicle.bodyType)}</p>
      <h2 id="dialog-title">${escapeHTML(vehicle.title)}</h2>
      <p class="dialog-price">${escapeHTML(vehicle.priceLabel)}</p>
      <p class="dialog-description">${escapeHTML(vehicle.description)}</p>
      <dl class="dialog-specs">${specs}</dl>
      <p class="feature-title">Details & features</p>
      <ul class="dialog-features">${features}</ul>
      <div class="dialog-actions">
        <a class="button button-dark" href="${whatsappLink(enquiryMessage(vehicle, "share more details and help me book a test drive"))}" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <span aria-hidden="true">↗</span></a>
        <a class="button button-outline" href="tel:+254791333555">Call Viva Motors <span aria-hidden="true">↗</span></a>
      </div>
    </div>`;
}

function openVehicle(vehicleId) {
  activeVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
  if (!activeVehicle) return;
  activePhotoIndex = activeVehicle.coverIndex - 1;
  renderDialog(activeVehicle);
  dialog.showModal();
}

function stepGallery(direction) {
  if (!activeVehicle) return;
  activePhotoIndex = (activePhotoIndex + direction + activeVehicle.photoCount) % activeVehicle.photoCount;
  const image = dialogContent.querySelector(".dialog-main-image");
  const counter = dialogContent.querySelector(".gallery-counter");
  image.src = photoPath(activeVehicle, activePhotoIndex);
  image.alt = `${activeVehicle.title} — photo ${activePhotoIndex + 1}`;
  counter.textContent = `${String(activePhotoIndex + 1).padStart(2, "0")} / ${String(activeVehicle.photoCount).padStart(2, "0")}`;
}

grid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-open-vehicle]");
  if (trigger) openVehicle(trigger.dataset.openVehicle);
});

dialogContent.addEventListener("click", (event) => {
  const step = event.target.closest("[data-gallery-step]");
  if (step) stepGallery(Number(step.dataset.galleryStep));
});

closeDialogButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderVehicles();
  });
});

searchInput.addEventListener("input", renderVehicles);
sortSelect.addEventListener("change", renderVehicles);

document.querySelector("#reset-filters").addEventListener("click", () => {
  searchInput.value = "";
  sortSelect.value = "featured";
  activeFilter = "all";
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === "all";
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderVehicles();
  searchInput.focus();
});

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  });
});

const heroFilm = document.querySelector("[data-hero-film]");
const heroFilmToggle = document.querySelector("[data-film-toggle]");
const heroFilmState = document.querySelector("[data-film-state]");
const heroFilmTime = document.querySelector("[data-film-time]");
const heroFilmProgress = document.querySelector("[data-film-progress]");
const heroFilmProgressbar = document.querySelector(".hero-film-track");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function formatFilmTime(seconds) {
  const total = Math.max(0, Math.floor(seconds || 0));
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function updateHeroFilmControls() {
  if (!heroFilm || !heroFilmToggle) return;
  const duration = Number.isFinite(heroFilm.duration) ? heroFilm.duration : 0;
  const currentTime = heroFilm.currentTime || 0;
  const progress = duration ? Math.min(100, (currentTime / duration) * 100) : 0;
  const isPlaying = !heroFilm.paused && !heroFilm.ended;

  heroFilmProgress.style.transform = `scaleX(${progress / 100})`;
  heroFilmProgressbar.setAttribute("aria-valuenow", String(Math.round(progress)));
  heroFilmTime.textContent = `${formatFilmTime(currentTime)} / ${formatFilmTime(duration)}`;
  heroFilmState.textContent = isPlaying ? "Now showing" : heroFilm.ended ? "Replay the film" : currentTime > 0 ? "Resume the film" : "Play the film";
  heroFilmToggle.setAttribute("aria-label", isPlaying ? "Pause the hero film" : heroFilm.ended ? "Replay the hero film" : "Play the hero film");
  heroFilmToggle.setAttribute("aria-pressed", String(isPlaying));
  heroFilmToggle.classList.toggle("is-playing", isPlaying);
}

if (heroFilm && heroFilmToggle) {
  ["loadedmetadata", "timeupdate", "play", "pause", "ended"].forEach((eventName) => {
    heroFilm.addEventListener(eventName, updateHeroFilmControls);
  });

  heroFilmToggle.addEventListener("click", async () => {
    if (!heroFilm.paused && !heroFilm.ended) {
      heroFilm.pause();
      return;
    }
    if (heroFilm.ended) heroFilm.currentTime = 0;
    try {
      await heroFilm.play();
    } catch {
      heroFilmState.textContent = "Film unavailable";
    }
  });

  if (reducedMotion.matches) {
    updateHeroFilmControls();
  } else {
    heroFilm.play().catch(updateHeroFilmControls);
  }

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) heroFilm.pause();
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
renderVehicles();
