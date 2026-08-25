// Sample embedded static airport data (replaces API fetch)
const sampleAirports = [
    { name: "John F Kennedy International Airport", iata: "JFK", city: "New York", region: "North America" },
    { name: "London Heathrow Airport", iata: "LHR", city: "London", region: "Europe" },
    { name: "Singapore Changi Airport", iata: "SIN", city: "Singapore", region: "Asia" },
    { name: "Tokyo Haneda Airport", iata: "HND", city: "Tokyo", region: "Asia" },
    { name: "Dubai International Airport", iata: "DXB", city: "Dubai", region: "Africa & Middle East" },
    { name: "Hartsfield–Jackson Atlanta", iata: "ATL", city: "Atlanta", region: "North America" }
];

const sampleNews = [
    { title: "New Terminal 3 Opens at Singapore Changi", summary: "Singapore Changi expands passenger capacity with state-of-the-art check-in tech.", date: "Aug 20, 2026" },
    { title: "Heathrow Expansion Update", summary: "Latest updates on runway development plans and sustainability targets.", date: "Aug 18, 2026" },
    { title: "Traveler Review: Atlanta Hartsfield-Jackson", summary: "An in-depth review of layover options, lounges, and transit efficiency.", date: "Aug 15, 2026" }
];

document.addEventListener("DOMContentLoaded", () => {
    renderAirports(sampleAirports);
    renderNews(sampleNews);
    setupSearch();
});

function renderAirports(airports) {
    const grid = document.getElementById("airportGrid");
    grid.innerHTML = airports.map(a => `
        <div class="card airport-card">
            <h3>${a.name} <span class="iata-badge">${a.iata}</span></h3>
            <p>${a.city}, ${a.region}</p>
        </div>
    `).join('');
}

function renderNews(news) {
    const grid = document.getElementById("newsGrid");
    grid.innerHTML = news.map(n => `
        <div class="card news-card">
            <h3>${n.title}</h3>
            <p>${n.summary}</p>
            <div class="date">${n.date}</div>
        </div>
    `).join('');
}

function setupSearch() {
    const input = document.getElementById("searchInput");
    const dropdown = document.getElementById("searchResults");

    input.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) { dropdown.style.display = "none"; return; }

        const matches = sampleAirports.filter(a => 
            a.name.toLowerCase().includes(query) || 
            a.iata.toLowerCase().includes(query) || 
            a.city.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
            dropdown.innerHTML = matches.map(m => `
                <div class="search-item" onclick="setSearch('${m.iata}')">
                    <strong>${m.iata}</strong> - ${m.name} (${m.city})
                </div>
            `).join('');
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    });
}

function setSearch(code) {
    document.getElementById("searchInput").value = code;
    document.getElementById("searchResults").style.display = "none";
    const filtered = sampleAirports.filter(a => a.iata.toLowerCase() === code.toLowerCase() || a.city.toLowerCase().includes(code.toLowerCase()));
    if(filtered.length > 0) renderAirports(filtered);
}

function filterRegion(regionName) {
    document.getElementById("airportGridTitle").innerText = `${regionName} Airports`;
    const filtered = sampleAirports.filter(a => a.region === regionName);
    renderAirports(filtered.length ? filtered : sampleAirports);
}
