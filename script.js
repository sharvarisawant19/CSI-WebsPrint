const events = [
  {
    id: "1",
    title: "Web Development Challenge",
    category: "Technical",
    club: "CSI Council",
    date: "22 Jan 2026",
    time: "2:00 PM",
    location: "Online Mode",
    description: "UI/UX skills",
    image: "webprint.jpeg"
  },
  {
    id: "2",
    title: "Cybersecurity Tech Talk",
    category: "Lecture",
    club: "IIC Council",
    date: "24 Jan 2026",
    time: "11:00 AM",
    location: "Conference Hall",
    description: "Latest cybersecurity trends.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
  },
  {
    id: "3",
    title: "Arcane Illusion 2026",
    category: "Cultural",
    club: "Student Council",
    date: "07 Mar 2026",
    time: "6:30 PM",
    location: "Juhu Campus Auditorium",
    description: "Dance, music and drama.",
    image: "arcanes.jpeg"
  },
  {
    id: "4",
    title: "Xuberance",
    category: "Sports",
    club: "Sports Council",
    date: "26 Jan 2026",
    time: "9:00 AM",
    location: "UMIT Foyer",
    Register:  "https://forms.gle/Ner1cCfu7UR5DbY3A",
    description: "Inter-college Badminton match.",
    image: "xuberrance.jpeg"
  },
  {
    id: "5",
    title: "Machine Learning Workshop",
    category: "Workshop",
    club: "Innovari Council",
    date: "23 Jan 2026",
    time: "10:00 AM",
    location: "Ground-west wing",
    description: "Covers foundational to advanced ML.",
    image: "innovari.jpeg"
  },
  {
    id: "6",
    title: "Spill the words",
    category: "Club Activity",
    club: "Writer's Club",
    date: "27 Jan 2026",
    time: "4:00 PM",
    location: "Auditorium",
    description: "Photography discussion.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  }
];

let selectedCategory = "All";
let selectedClub = "All Clubs";
let searchText = "";

init();

function init() {
  populateClubs();
  setupListeners();
  renderEvents();
}

function populateClubs() {
  const select = document.getElementById("clubSelect");
  const clubs = ["All Clubs", ...new Set(events.map(e => e.club))];
  select.innerHTML = clubs.map(c => `<option>${c}</option>`).join("");
}

function setupListeners() {
  document.getElementById("searchInput").oninput = e => {
    searchText = e.target.value.toLowerCase();
    renderEvents();
  };

  document.getElementById("clubSelect").onchange = e => {
    selectedClub = e.target.value;
    renderEvents();
  };

  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedCategory = btn.dataset.category;
      renderEvents();
    };
  });
}

function renderEvents() {
  const grid = document.getElementById("eventGrid");
  const empty = document.getElementById("emptyState");

  const filtered = events.filter(e =>
    (selectedCategory === "All" || e.category === selectedCategory) &&
    (selectedClub === "All Clubs" || e.club === selectedClub) &&
    (e.title.toLowerCase().includes(searchText) || e.club.toLowerCase().includes(searchText))
  );

  document.getElementById("eventCount").innerText =
    `${filtered.length} events found`;

  grid.innerHTML = "";

  if (!filtered.length) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  filtered.forEach(e => {
    grid.innerHTML += `
      <div class="event-card" onclick="openModal('${e.id}')">
        <img src="${e.image}">
        <div class="event-card-body">
          <h3>${e.title}</h3>
          <p>${e.club}</p>
        </div>
      </div>
    `;
  });
}

function openModal(id) {
  const e = events.find(ev => ev.id === id);
  document.getElementById("modalContent").innerHTML = `
    <h2>${e.title}</h2>
    <p><strong>Club:</strong> ${e.club}</p>
    <p><strong>Date:</strong> ${e.date}</p>
    <p><strong>Time:</strong> ${e.time}</p>
    <p><strong>Location:</strong> ${e.location}</p>
    <p>${e.description}</p>
  `;
  document.getElementById("eventModal").classList.add("active");
}

function closeModal() {
  document.getElementById("eventModal").classList.remove("active");
}
