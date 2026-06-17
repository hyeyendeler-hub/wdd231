const contentData = {
  movies: [
    { title: "Vicious", year: 2025, vj: "vj junior", genre: "thriller", description: "A young woman must spend the night fighting for her existence as she slips down a disturbing rabbit hole contained inside a mysterious gift from a late-night visitor.", poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc4a0?w=600&h=900&fit=crop", download: "videos/vicious.mp4" },
    { title: "Kraken", year: 2026, vj: "vj icep", genre: "action", description: "An epic underwater adventure featuring naval forces and mythical sea creatures.", poster: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=600&h=900&fit=crop", download: "videos/kraken.mp4" },
    { title: "Barurot 2", year: 2026, vj: "vj ham", genre: "action", description: "The sequel to the hit action thriller continues the story of vengeance.", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop", download: "videos/barurot2.mp4" },
    { title: "Krista", year: 2024, vj: "vj ham", genre: "drama", description: "A powerful drama about love, loss, and redemption.", poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=900&fit=crop", download: "videos/krista.mp4" },
    { title: "Check-In", year: 2026, vj: "vj ham", genre: "thriller", description: "A psychological thriller set in a mysterious hotel.", poster: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=900&fit=crop", download: "videos/checkin.mp4" },
    { title: "Room Service", year: 2024, vj: "vj ham", genre: "drama", description: "An intimate story of human connection in unexpected places.", poster: "https://images.unsplash.com/photo-1582719478250-c89cae433dcb?w=600&h=900&fit=crop", download: "videos/roomservice.mp4" },
    { title: "Blades of the Guardians", year: 2026, vj: "vj junior", genre: "action", description: "Ancient warriors return to protect the modern world.", poster: "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?w=600&h=900&fit=crop", download: "videos/blades.mp4" },
    { title: "Office Romance", year: 2026, vj: "vj junior", genre: "romance", description: "Love blooms in the most unexpected workplace.", poster: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&h=900&fit=crop", download: "videos/officeromance.mp4" },
    { title: "Animal Farm", year: 2026, vj: "vj uncle t", genre: "drama", description: "A modern retelling of the classic tale.", poster: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=900&fit=crop", download: "videos/animalfarm.mp4" },
    { title: "Swapped", year: 2026, vj: "vj uncle t", genre: "comedy", description: "Body swap comedy with unexpected consequences.", poster: "https://images.unsplash.com/photo-1533488765236-9174ab77e2d8?w=600&h=900&fit=crop", download: "videos/swapped.mp4" }
  ],
  music: [
    { title: "Midnight Vibes", artist: "DJ Shadow", year: 2026, genre: "electronic", downloads: 1250, cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop", audio: "audio/midnight-vibes.mp3" },
    { title: "Afro Beats", artist: "Star Boy", year: 2025, genre: "african", downloads: 2100, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop", audio: "audio/afrobeats.mp3" },
    { title: "Heart Strings", artist: "Melody Keys", year: 2026, genre: "pop", downloads: 890, cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop", audio: "audio/heartstrings.mp3" },
    { title: "Urban Flow", artist: "MC Flow", year: 2025, genre: "hiphop", downloads: 3400, cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=600&fit=crop", audio: "audio/urbanflow.mp3" },
    { title: "Classical Dreams", artist: "Symphony Orchestra", year: 2024, genre: "classical", downloads: 560, cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=600&fit=crop", audio: "audio/classical-dreams.mp3" },
    { title: "Rock Anthems", artist: "The Outcasts", year: 2026, genre: "rock", downloads: 1890, cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&h=600&fit=crop", audio: "audio/rock-anthems.mp3" }
  ],
  series: [
    { title: "Citadel", season: "S1", episode: "E6", vj: "vj icep", year: 2023, poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc4a0?w=600&h=900&fit=crop", download: "videos/citadel-s1.mp4" },
    { title: "Citadel", season: "S2", episode: "E7", vj: "vj junior", year: 2024, poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop", download: "videos/citadel-s2.mp4" },
    { title: "Kiss Goblin", season: "S1", episode: "E12", vj: "vj lenon", year: 2025, poster: "https://images.unsplash.com/photo-1565371890620-830a8408c4e5?w=600&h=900&fit=crop", download: "videos/kissgoblin.mp4" },
    { title: "FROM", season: "S4", episode: "E7", vj: "vj emmy", year: 2026, poster: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=600&h=900&fit=crop", download: "videos/from-s4.mp4" },
    { title: "Spider-Noir", season: "S1", episode: "E8", vj: "vj junior", year: 2026, poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=900&fit=crop", download: "videos/spider-noir.mp4" }
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
  ],
  trendingVideos: [
    { title: "Midnight Vibes - Official Video", artist: "DJ Shadow", views: "125K", youtubeId: "dQw4w9WgXcQ", type: "music" },
    { title: "Afro Beats Dance Challenge", artist: "Star Boy", views: "340K", youtubeId: "dQw4w9WgXcQ", type: "music" },
    { title: "Urban Flow Remix", artist: "MC Flow", views: "89K", youtubeId: "dQw4w9WgXcQ", type: "music" },
    { title: "Heart Strings Ballad", artist: "Melody Keys", views: "210K", youtubeId: "dQw4w9WgXcQ", type: "music" }
  ],
  featuredFilms: [
    { title: "Chasing Horizons", director: "Indie Studio", genre: "Sci-Fi", youtubeId: "dQw4w9WgXcQ", type: "film" },
    { title: "Shadows in the Dark", director: "Night Owl Films", genre: "Drama", youtubeId: "dQw4w9WgXcQ", type: "film" },
    { title: "The Last Stand", director: "Action House", genre: "Thriller", youtubeId: "dQw4w9WgXcQ", type: "film" },
    { title: "Echoes of Time", director: "Dream Works", genre: "Drama", youtubeId: "dQw4w9WgXcQ", type: "film" }
  ]
};
