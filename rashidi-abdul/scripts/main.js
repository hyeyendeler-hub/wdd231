const contentData = {
  movies: [
    { title: "Vicious", year: 2025, vj: "vj junior", genre: "thriller", description: "A young woman must spend the night fighting for her existence as she slips down a disturbing rabbit hole contained inside a mysterious gift from a late-night visitor." },
    { title: "Kraken", year: 2026, vj: "vj icep", genre: "action", description: "An epic underwater adventure featuring naval forces and mythical sea creatures." },
    { title: "Barurot 2", year: 2026, vj: "vj ham", genre: "action", description: "The sequel to the hit action thriller continues the story of vengeance." },
    { title: "Krista", year: 2024, vj: "vj ham", genre: "drama", description: "A powerful drama about love, loss, and redemption." },
    { title: "Check-In", year: 2026, vj: "vj ham", genre: "thriller", description: "A psychological thriller set in a mysterious hotel." },
    { title: "Room Service", year: 2024, vj: "vj ham", genre: "drama", description: "An intimate story of human connection in unexpected places." },
    { title: "Blades of the Guardians", year: 2026, vj: "vj junior", genre: "action", description: "Ancient warriors return to protect the modern world." },
    { title: "Office Romance", year: 2026, vj: "vj junior", genre: "romance", description: "Love blooms in the most unexpected workplace." },
    { title: "Animal Farm", year: 2026, vj: "vj uncle t", genre: "drama", description: "A modern retelling of the classic tale." },
    { title: "Swapped", year: 2026, vj: "vj uncle t", genre: "comedy", description: "Body swap comedy with unexpected consequences." }
  ],
  music: [
    { title: "Midnight Vibes", artist: "DJ Shadow", year: 2026, genre: "electronic", downloads: 1250 },
    { title: "Afro Beats", artist: "Star Boy", year: 2025, genre: "african", downloads: 2100 },
    { title: "Heart Strings", artist: "Melody Keys", year: 2026, genre: "pop", downloads: 890 },
    { title: "Urban Flow", artist: "MC Flow", year: 2025, genre: "hiphop", downloads: 3400 },
    { title: "Classical Dreams", artist: "Symphony Orchestra", year: 2024, genre: "classical", downloads: 560 },
    { title: "Rock Anthems", artist: "The Outcasts", year: 2026, genre: "rock", downloads: 1890 }
  ],
  series: [
    { title: "Citadel", season: "S1", episode: "E6", vj: "vj icep", year: 2023 },
    { title: "Citadel", season: "S2", episode: "E7", vj: "vj junior", year: 2024 },
    { title: "Kiss Goblin", season: "S1", episode: "E12", vj: "vj lenon", year: 2025 },
    { title: "FROM", season: "S4", episode: "E7", vj: "vj emmy", year: 2026 },
    { title: "Spider-Noir", season: "S1", episode: "E8", vj: "vj junior", year: 2026 }
  ],
  vjs: [
    { name: "vj junior", count: 24, avatar: "🎬" },
    { name: "vj icep", count: 18, avatar: "❄️" },
    { name: "vj ham", count: 32, avatar: "🔥" },
    { name: "vj shield", count: 15, avatar: "🛡️" },
    { name: "vj uncle t", count: 28, avatar: "🎥" },
    { name: "vj emmy", count: 12, avatar: "🌟" },
    { name: "vj lenon", count: 9, avatar: "🎤" },
    { name: "vj freddy", count: 16, avatar: "🎧" },
    { name: "vj soul", count: 21, avatar: "🎶" },
    { name: "vj ivo", count: 14, avatar: "📽️" }
  ]
};

function renderMovies(movies) {
  const grid = document.getElementById('moviesGrid');
  if (!grid) return;
  
  grid.innerHTML = movies.map(movie => `
    <div class="content-card">
      <div class="card-poster">
        <img src="https://via.placeholder.com/300x450/6366f1/ffffff?text=${encodeURIComponent(movie.title)}" alt="${movie.title}">
        <span class="card-badge">${movie.year}</span>
      </div>
      <div class="card-info">
        <h4>${movie.title}</h4>
        <div class="card-meta">
          <span>${movie.vj}</span>
          <span>${movie.genre}</span>
        </div>
        <button class="download-btn">Download Now</button>
      </div>
    </div>
  `).join('');
}

function renderMusic(music) {
  const grid = document.getElementById('musicGrid');
  if (!grid) return;
  
  grid.innerHTML = music.map(track => `
    <div class="content-card">
      <div class="card-poster">
        <img src="https://via.placeholder.com/300x300/ec4899/ffffff?text=${encodeURIComponent(track.artist)}" alt="${track.title}">
        <span class="card-badge">${track.year}</span>
      </div>
      <div class="card-info">
        <h4>${track.title}</h4>
        <div class="card-meta">
          <span>${track.artist}</span>
          <span>${track.downloads} downloads</span>
        </div>
        <button class="download-btn">Download</button>
      </div>
    </div>
  `).join('');
}

function renderSeries(series) {
  const grid = document.getElementById('seriesGrid');
  if (!grid) return;
  
  grid.innerHTML = series.map(show => `
    <div class="content-card">
      <div class="card-poster">
        <img src="https://via.placeholder.com/300x450/8b5cf6/ffffff?text=${encodeURIComponent(show.title)}" alt="${show.title}">
        <span class="card-badge">${show.year}</span>
      </div>
      <div class="card-info">
        <h4>${show.title}</h4>
        <div class="card-meta">
          <span>${show.season} ${show.episode}</span>
          <span>${show.vj}</span>
        </div>
        <button class="download-btn">Download</button>
      </div>
    </div>
  `).join('');
}

function renderVJs(vjs) {
  const grid = document.getElementById('vjsGrid');
  if (!grid) return;
  
  grid.innerHTML = vjs.map(vj => `
    <div class="vj-card">
      <div class="vj-avatar">${vj.avatar}</div>
      <div class="vj-name">${vj.name}</div>
      <div class="vj-count">${vj.count} uploads</div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderMovies(contentData.movies);
  renderMusic(contentData.music);
  renderSeries(contentData.series);
  renderVJs(contentData.vjs);
});

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', currentTheme === 'dark' ? '' : 'dark');
    localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
  });
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}