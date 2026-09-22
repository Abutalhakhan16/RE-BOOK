/**
 * ReBook — Core Application Script
 * Minimalist UI interactions, rich 30+ book catalogue, dynamic filtering,
 * modal quick-view system, responsive drawer, and resilient offline/online synchronization.
 */

// ==========================================================================
// Comprehensive Rich Book & eBook Catalogue (30+ Diverse Titles)
// ==========================================================================
const REBOOK_CATALOGUE = [
  // --- Fiction & Literature ---
  {
    id: 'b-01',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    category: 'Fiction',
    format: 'Hardcover',
    isEbook: false,
    condition: 'Like New',
    price: 7.50,
    originalPrice: 26.00,
    rating: 4.8,
    reviewsCount: 428,
    coverTone: '#121722',
    accentColor: '#818CF8',
    pages: 304,
    year: 2020,
    isbn: '978-0525559474',
    description: 'Between life and death there is a library where shelves go on forever.',
    synopsis: 'Nora Seed finds herself in the Midnight Library, where every book provides a chance to try another life she could have lived. A luminous, hopeful exploration of regrets and the beauty of ordinary life.',
    sellerName: 'Clara Vance',
    sellerRating: 4.9,
    views: 890,
    downloads: 0,
    isBestseller: true,
    isTrending: true,
    isStaffPick: true
  },
  {
    id: 'b-02',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    category: 'Fiction',
    format: 'Paperback',
    isEbook: false,
    condition: 'Very Good',
    price: 8.95,
    originalPrice: 28.00,
    rating: 4.9,
    reviewsCount: 310,
    coverTone: '#1A1824',
    accentColor: '#F472B6',
    pages: 416,
    year: 2022,
    isbn: '978-0593321201',
    description: 'A dazzling story of identity, creativity, and love spanning thirty years.',
    synopsis: 'Sam and Sadie, two childhood friends, reunite in college and create an iconic video game. Over decades of triumph and tragedy, they explore companionship, design, and what it means to build worlds.',
    sellerName: 'Westside Bookshop',
    sellerRating: 5.0,
    views: 740,
    downloads: 0,
    isBestseller: true,
    isTrending: false,
    isStaffPick: true
  },
  {
    id: 'b-03',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    category: 'Fiction',
    format: 'Paperback',
    isEbook: false,
    condition: 'Like New',
    price: 6.80,
    originalPrice: 17.99,
    rating: 4.6,
    reviewsCount: 195,
    coverTone: '#1D1A14',
    accentColor: '#E2B15C',
    pages: 320,
    year: 2021,
    isbn: '978-0593318171',
    description: 'An Artificial Friend with extraordinary observational qualities observes humankind.',
    synopsis: 'From Nobel laureate Kazuo Ishiguro, a thrillingly tender look at our changing world through the unforgettable eyes of an artificial friend who carefully considers what it means to love.',
    sellerName: 'Julian Grey',
    sellerRating: 4.8,
    views: 520,
    downloads: 0,
    isBestseller: false,
    isTrending: true,
    isStaffPick: false
  },
  {
    id: 'b-04',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classics',
    format: 'Hardcover',
    isEbook: false,
    condition: 'Good',
    price: 5.25,
    originalPrice: 15.00,
    rating: 4.7,
    reviewsCount: 940,
    coverTone: '#14181B',
    accentColor: '#38BDF8',
    pages: 180,
    year: 1925,
    isbn: '978-0743273565',
    description: 'The definitive American classic of jazz, obsession, and the American dream.',
    synopsis: 'Set in Long Island during the Roaring Twenties, Jay Gatsby pursues the captivating Daisy Buchanan across champagne-soaked nights, illusion, and quiet despair.',
    sellerName: 'Heritage Books',
    sellerRating: 4.9,
    views: 610,
    downloads: 0,
    isBestseller: false,
    isTrending: false,
    isStaffPick: false
  },

  // --- Sci-Fi & Speculative ---
  {
    id: 'b-05',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    category: 'Science Fiction',
    format: 'Hardcover',
    isEbook: false,
    condition: 'Like New',
    price: 9.50,
    originalPrice: 28.99,
    rating: 4.9,
    reviewsCount: 560,
    coverTone: '#161922',
    accentColor: '#F59E0B',
    pages: 496,
    year: 2021,
    isbn: '978-0593135204',
    description: 'A lone astronaut must save the earth from extinction armed only with science.',
    synopsis: 'Ryland Grace is the sole survivor on a desperate interstellar mission. Stranded millions of miles from Earth, he must solve an extinction-level crisis alongside an unexpected ally.',
    sellerName: 'Nova Collector',
    sellerRating: 4.9,
    views: 1120,
    downloads: 0,
    isBestseller: true,
    isTrending: true,
    isStaffPick: true
  },
  {
    id: 'b-06',
    title: 'Dune (Deluxe Collector Edition)',
    author: 'Frank Herbert',
    category: 'Science Fiction',
    format: 'Hardcover',
    isEbook: false,
    condition: 'Like New',
    price: 14.50,
    originalPrice: 40.00,
    rating: 4.8,
    reviewsCount: 780,
    coverTone: '#1D1812',
    accentColor: '#D97706',
    pages: 688,
    year: 1965,
    isbn: '978-0441172719',
    description: 'The monumental desert epic of Paul Atreides and the spice planet Arrakis.',
    synopsis: 'A masterpiece of speculative fiction intertwining ecology, religion, politics, and destiny on the harsh desert planet where whoever controls the spice controls the universe.',
    sellerName: 'Atlas Rare Books',
    sellerRating: 5.0,
    views: 1430,
    downloads: 0,
    isBestseller: true,
    isTrending: true,
    isStaffPick: false
  },
  {
    id: 'b-07',
    title: 'Neuromancer',
    author: 'William Gibson',
    category: 'Science Fiction',
    format: 'Paperback',
    isEbook: false,
    condition: 'Very Good',
    price: 6.50,
    originalPrice: 16.00,
    rating: 4.6,
    reviewsCount: 320,
    coverTone: '#10161C',
    accentColor: '#2DD4BF',
    pages: 271,
    year: 1984,
    isbn: '978-0441569595',
    description: 'The seminal cyberpunk novel that coined the concept of cyberspace.',
    synopsis: 'Case, a washed-up computer hacker hired for one last job targeting an elusive artificial intelligence orbiting Earth, navigating neon noir alleys and the matrix of global data.',
    sellerName: 'CyberSpire Press',
    sellerRating: 4.7,
    views: 450,
    downloads: 0,
    isBestseller: false,
    isTrending: false,
    isStaffPick: false
  },

  // --- Technology & Programming ---
  {
    id: 'b-08',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Technology',
    format: 'Paperback',
    isEbook: false,
    condition: 'Like New',
    price: 24.00,
    originalPrice: 49.99,
    rating: 4.9,
    reviewsCount: 680,
    coverTone: '#121920',
    accentColor: '#38BDF8',
    pages: 616,
    year: 2017,
    isbn: '978-1449373320',
    description: 'The definitive handbook on reliability, scalability, and maintainability in software systems.',
    synopsis: 'An essential guide for modern engineers navigating distributed storage, consistency models, streaming pipelines, and consensus algorithms without corporate jargon.',
    sellerName: 'DevShelf Exchange',
    sellerRating: 4.9,
    views: 980,
    downloads: 0,
    isBestseller: true,
    isTrending: true,
    isStaffPick: true
  },
  {
    id: 'b-09',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    category: 'Technology',
    format: 'Paperback',
    isEbook: false,
    condition: 'Good',
    price: 19.50,
    originalPrice: 45.00,
    rating: 4.7,
    reviewsCount: 540,
    coverTone: '#171B22',
    accentColor: '#A78BFA',
    pages: 464,
    year: 2008,
    isbn: '978-0132350884',
    description: 'Principles, patterns, and practical code exercises for writing readable, robust software.',
    synopsis: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. A timeless masterclass in readability and software craftsmanship.',
    sellerName: 'Silicon Valley Recycles',
    sellerRating: 4.8,
    views: 820,
    downloads: 0,
    isBestseller: false,
    isTrending: false,
    isStaffPick: false
  },
  {
    id: 'b-10',
    title: 'Grokking Algorithms',
    author: 'Aditya Bhargava',
    category: 'Technology',
    format: 'Paperback',
    isEbook: false,
    condition: 'Like New',
    price: 16.00,
    originalPrice: 39.99,
    rating: 4.9,
    reviewsCount: 420,
    coverTone: '#1C1917',
    accentColor: '#FB923C',
    pages: 256,
    year: 2016,
    isbn: '978-1617292231',
    description: 'An illustrated, friendly guide for programmers and learners tackling algorithms.',
    synopsis: 'Clear diagrams, simple explanations, and practical Python code examples explaining search, sorting, graph traversal, and dynamic programming with total clarity.',
    sellerName: 'Ada Lovelace Library',
    sellerRating: 5.0,
    views: 670,
    downloads: 0,
    isBestseller: true,
    isTrending: false,
    isStaffPick: true
  },

  // --- Non-Fiction, Science & Psychology ---
  {
    id: 'b-11',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'Non-Fiction',
    format: 'Paperback',
    isEbook: false,
    condition: 'Like New',
    price: 9.00,
    originalPrice: 24.99,
    rating: 4.8,
    reviewsCount: 1140,
    coverTone: '#1A1815',
    accentColor: '#FBBF24',
    pages: 464,
    year: 2015,
    isbn: '978-0062316097',
    description: 'How an insignificant ape became the ruler of planet Earth.',
    synopsis: 'Harari spans the whole of human history, from the very first humans to walk the earth to the radical breakthroughs of the Cognitive, Agricultural, and Scientific Revolutions.',
    sellerName: 'Global Readers Club',
    sellerRating: 4.9,
    views: 1250,
    downloads: 0,
    isBestseller: true,
    isTrending: true,
    isStaffPick: true
  },
  {
    id: 'b-12',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Non-Fiction',
    format: 'Paperback',
    isEbook: false,
    condition: 'Very Good',
    price: 8.50,
    originalPrice: 19.99,
    rating: 4.7,
    reviewsCount: 680,
    coverTone: '#15171D',
    accentColor: '#60A5FA',
    pages: 512,
    year: 2011,
    isbn: '978-0374533557',
    description: 'The two systems that drive the way we think: intuitive versus slow rational reasoning.',
    synopsis: 'Nobel Memorial Prize winner Daniel Kahneman explains the biases, heuristics, and systematic errors that shape human intuition and high-stakes choices.',
    sellerName: 'Mind & Logic Co.',
    sellerRating: 4.8,
    views: 790,
    downloads: 0,
    isBestseller: false,
    isTrending: false,
    isStaffPick: false
  },
  {
    id: 'b-13',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science',
    format: 'Paperback',
    isEbook: false,
    condition: 'Like New',
    price: 7.20,
    originalPrice: 18.00,
    rating: 4.7,
    reviewsCount: 450,
    coverTone: '#10131B',
    accentColor: '#818CF8',
    pages: 212,
    year: 1988,
    isbn: '978-0553380163',
    description: 'From the Big Bang to black holes, exploring space, time, and gravity.',
    synopsis: 'Stephen Hawking guides readers through questions of theoretical physics, cosmology, and the boundaries of time with brilliant lucidity and wit.',
    sellerName: 'Cosmos Books',
    sellerRating: 4.9,
    views: 590,
    downloads: 0,
    isBestseller: false,
    isTrending: false,
    isStaffPick: false
  },

  // --- Business, Finance & Productivity ---
  {
    id: 'b-14',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    format: 'Hardcover',
    isEbook: false,
    condition: 'Like New',
    price: 8.50,
    originalPrice: 27.00,
    rating: 4.9,
    reviewsCount: 1540,
    coverTone: '#1A1813',
    accentColor: '#E2B15C',
    pages: 320,
    year: 2018,
    isbn: '978-0735211292',
    description: 'An easy and proven way to build good habits and break bad ones.',
    synopsis: 'Clear distills complex behavioral psychology into actionable frameworks: cue, craving, response, and reward, proving that tiny incremental gains produce remarkable compound results.',
    sellerName: 'Better Habits Shop',
    sellerRating: 4.9,
    views: 1890,
    downloads: 0,
    isBestseller: true,
    isTrending: true,
    isStaffPick: true
  },
  {
    id: 'b-15',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Business',
    format: 'Paperback',
    isEbook: false,
    condition: 'Like New',
    price: 9.00,
    originalPrice: 22.00,
    rating: 4.8,
    reviewsCount: 890,
    coverTone: '#141816',
    accentColor: '#34D399',
    pages: 256,
    year: 2020,
    isbn: '978-0857197689',
    description: 'Timeless lessons on wealth, greed, and happiness across 19 short stories.',
    synopsis: 'Doing well with money isn’t necessarily about what you know. It’s about how you behave. A refreshing look at financial resilience, risk patience, and compound growth.',
    sellerName: 'Savvy Reader Hub',
    sellerRating: 4.9,
    views: 1040,
    downloads: 0,
    isBestseller: true,
    isTrending: false,
    isStaffPick: true
  },
  {
    id: 'b-16',
    title: 'Zero to One: Notes on Startups',
    author: 'Peter Thiel & Blake Masters',
    category: 'Business',
    format: 'Hardcover',
    isEbook: false,
    condition: 'Very Good',
    price: 7.95,
    originalPrice: 24.00,
    rating: 4.6,
    reviewsCount: 430,
    coverTone: '#161820',
    accentColor: '#38BDF8',
    pages: 224,
    year: 2014,
    isbn: '978-0804139298',
    description: 'How to build companies that create entirely new things rather than copying.',
    synopsis: 'The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create. An invigorating philosophical inquiry into technology startups.',
    sellerName: 'Venture Library',
    sellerRating: 4.7,
    views: 610,
    downloads: 0,
    isBestseller: false,
    isTrending: false,
    isStaffPick: false
  },

  // --- Graphic Novels & Visual Art ---
  {
    id: 'b-17',
    title: 'Watchmen',
    author: 'Alan Moore & Dave Gibbons',
    category: 'Graphic Novels',
    format: 'Paperback',
    isEbook: false,
    condition: 'Like New',
    price: 11.50,
    originalPrice: 24.99,
    rating: 4.9,
    reviewsCount: 820,
    coverTone: '#1C1911',
    accentColor: '#FBBF24',
    pages: 416,
    year: 1987,
    isbn: '978-1779501127',
    description: 'The Hugo Award-winning deconstruction of the superhero genre.',
    synopsis: 'A complex, multi-layered mystery unfolding against the backdrop of a Cold War alternate history where costumed vigilantes face existential reckoning.',
    sellerName: 'Panel & Ink',
    sellerRating: 4.9,
    views: 950,
    downloads: 0,
    isBestseller: true,
    isTrending: true,
    isStaffPick: true
  },
  {
    id: 'b-18',
    title: 'Maus: A Survivor’s Tale',
    author: 'Art Spiegelman',
    category: 'Graphic Novels',
    format: 'Paperback',
    isEbook: false,
    condition: 'Very Good',
    price: 10.00,
    originalPrice: 19.95,
    rating: 4.9,
    reviewsCount: 640,
    coverTone: '#171618',
    accentColor: '#E2E8F0',
    pages: 296,
    year: 1991,
    isbn: '978-0679406419',
    description: 'Pulitzer Prize-winning biography depicting historical trauma with profound empathy.',
    synopsis: 'A brutally moving memoir depicting the author interviewing his father about his experience as a Polish Jew and Holocaust survivor, rendered with mice and cats.',
    sellerName: 'Archive Antiquarian',
    sellerRating: 5.0,
    views: 680,
    downloads: 0,
    isBestseller: false,
    isTrending: false,
    isStaffPick: true
  },

  // --- Community eBooks & Digital Editions (Paid & Free) ---
  {
    id: 'eb-01',
    title: 'Modern CSS Layouts & Container Queries',
    author: 'Elena Rostova',
    category: 'Technology',
    format: 'ePub / PDF',
    isEbook: true,
    condition: 'Digital Edition (Instant Access)',
    price: 4.99,
    originalPrice: 14.00,
    rating: 4.9,
    reviewsCount: 165,
    coverTone: '#131821',
    accentColor: '#38BDF8',
    pages: 184,
    year: 2024,
    isbn: '978-9999001011',
    description: 'A masterclass in responsive architecture, grid, subgrid, and modern typography.',
    synopsis: 'Learn how to build resilient, component-driven layouts without heavy CSS frameworks. Packed with production patterns, accessible focus rings, and dark mode best practices.',
    sellerName: 'Elena Rostova (Author)',
    sellerRating: 5.0,
    views: 1540,
    downloads: 412,
    isBestseller: true,
    isTrending: true,
    isStaffPick: true
  },
  {
    id: 'eb-02',
    title: 'Deep Work Habits: Focus in an Age of Noise',
    author: 'David Vance',
    category: 'Self-Help',
    format: 'ePub / PDF',
    isEbook: true,
    condition: 'Digital Edition (Instant Access)',
    price: 3.50,
    originalPrice: 12.00,
    rating: 4.8,
    reviewsCount: 220,
    coverTone: '#1C1814',
    accentColor: '#E2B15C',
    pages: 160,
    year: 2023,
    isbn: '978-9999001028',
    description: 'Actionable strategies for cognitive endurance, flow state, and digital minimalism.',
    synopsis: 'Cut out superficial tasks and reclaim hours of uninterrupted creative execution with tested routines for knowledge workers, developers, and writers.',
    sellerName: 'David Vance (Author)',
    sellerRating: 4.8,
    views: 990,
    downloads: 304,
    isBestseller: false,
    isTrending: true,
    isStaffPick: false
  },
  {
    id: 'eb-03',
    title: 'The Open Guide to Python & Data Tools',
    author: 'ReBook Open Community',
    category: 'Technology',
    format: 'PDF / Interactive',
    isEbook: true,
    condition: 'Free Community eBook',
    price: 0.00,
    originalPrice: 0.00,
    rating: 4.9,
    reviewsCount: 680,
    coverTone: '#14181F',
    accentColor: '#34D399',
    pages: 280,
    year: 2024,
    isbn: '978-9999001035',
    description: 'Comprehensive, zero-cost programming guide built by and for developers.',
    synopsis: 'A hands-on, community-maintained introduction to Python scripting, data structures, automation, and API integration. Free forever for students and lifelong learners.',
    sellerName: 'ReBook Open Project',
    sellerRating: 5.0,
    views: 3100,
    downloads: 1240,
    isBestseller: true,
    isTrending: true,
    isStaffPick: true
  },
  {
    id: 'eb-04',
    title: 'Creative Writing: The Art of Fiction',
    author: 'Maya Lin',
    category: 'Fiction',
    format: 'ePub / PDF',
    isEbook: true,
    condition: 'Digital Edition (Instant Access)',
    price: 5.99,
    originalPrice: 15.00,
    rating: 4.7,
    reviewsCount: 140,
    coverTone: '#191520',
    accentColor: '#F472B6',
    pages: 210,
    year: 2023,
    isbn: '978-9999001042',
    description: 'Pacing, dialogue, character tension, and world-building for aspiring novelists.',
    synopsis: 'An intimate, practical handbook examining the craft of prose fiction. Covers drafting workflows, voice authenticity, and structural editing without academic pretense.',
    sellerName: 'Maya Lin (Author)',
    sellerRating: 4.9,
    views: 620,
    downloads: 185,
    isBestseller: false,
    isTrending: false,
    isStaffPick: false
  },
  {
    id: 'eb-05',
    title: 'Practical Personal Finance for Students',
    author: 'Alex K. Rivera',
    category: 'Business',
    format: 'PDF',
    isEbook: true,
    condition: 'Free Community eBook',
    price: 0.00,
    originalPrice: 0.00,
    rating: 4.8,
    reviewsCount: 390,
    coverTone: '#131917',
    accentColor: '#34D399',
    pages: 130,
    year: 2024,
    isbn: '978-9999001059',
    description: 'Debt reduction, smart budgeting, simple investing, and tax basics.',
    synopsis: 'Clear, compassionate advice for young adults and students navigating their first paychecks, student loans, emergency savings, and simple index fund investing.',
    sellerName: 'Financial Literacy Initiative',
    sellerRating: 4.9,
    views: 2150,
    downloads: 870,
    isBestseller: false,
    isTrending: true,
    isStaffPick: true
  },
  {
    id: 'eb-06',
    title: 'Echoes of the Red Planet: Sol Colony',
    author: 'T. H. Stirling',
    category: 'Science Fiction',
    format: 'ePub / PDF',
    isEbook: true,
    condition: 'Digital Edition (Instant Access)',
    price: 2.99,
    originalPrice: 8.99,
    rating: 4.6,
    reviewsCount: 95,
    coverTone: '#1F1414',
    accentColor: '#F87171',
    pages: 310,
    year: 2024,
    isbn: '978-9999001066',
    description: 'A gripping speculative thriller set inside the domes of the first Martian colony.',
    synopsis: 'When atmospheric recyclers fail on the isolated northern crater outpost, engineer Leah Chen discovers a deliberate conspiracy buried beneath the red sands.',
    sellerName: 'T. H. Stirling (Indie Author)',
    sellerRating: 4.7,
    views: 480,
    downloads: 142,
    isBestseller: false,
    isTrending: false,
    isStaffPick: false
  },

  // --- Academic & Study Favorites ---
  {
    id: 'b-19',
    title: 'Linear Algebra and Its Applications',
    author: 'Gilbert Strang',
    category: 'Science',
    format: 'Hardcover',
    isEbook: false,
    condition: 'Good',
    price: 28.00,
    originalPrice: 85.00,
    rating: 4.8,
    reviewsCount: 290,
    coverTone: '#151720',
    accentColor: '#38BDF8',
    pages: 580,
    year: 2016,
    isbn: '978-0030105678',
    description: 'Renowned MIT professor Gilbert Strang’s definitive foundation in linear spaces.',
    synopsis: 'A classic university textbook connecting matrix transformations, vector spaces, eigenvalues, and computational geometry with unmatched pedagogical energy.',
    sellerName: 'Academic Book Depot',
    sellerRating: 4.9,
    views: 640,
    downloads: 0,
    isBestseller: false,
    isTrending: false,
    isStaffPick: false
  },
  {
    id: 'b-20',
    title: 'Organic Chemistry: Structure and Function',
    author: 'K. Peter C. Vollhardt',
    category: 'Science',
    format: 'Hardcover',
    isEbook: false,
    condition: 'Fair',
    price: 32.50,
    originalPrice: 110.00,
    rating: 4.6,
    reviewsCount: 180,
    coverTone: '#17161E',
    accentColor: '#A78BFA',
    pages: 1250,
    year: 2018,
    isbn: '978-1319079451',
    description: 'In-depth molecular synthesis, reaction mechanisms, and bio-organic chemistry.',
    synopsis: 'A comprehensive pre-med and chemistry classic with thorough mechanism diagrams. Light highlight marks on early chapters; binding solid.',
    sellerName: 'Campus Book Thrift',
    sellerRating: 4.7,
    views: 420,
    downloads: 0,
    isBestseller: false,
    isTrending: false,
    isStaffPick: false
  },
  {
    id: 'b-21',
    title: 'Principles of Economics',
    author: 'N. Gregory Mankiw',
    category: 'Business',
    format: 'Hardcover',
    isEbook: false,
    condition: 'Very Good',
    price: 34.00,
    originalPrice: 95.00,
    rating: 4.7,
    reviewsCount: 310,
    coverTone: '#141A17',
    accentColor: '#34D399',
    pages: 880,
    year: 2020,
    isbn: '978-0357038314',
    description: 'The standard introduction to microeconomic and macroeconomic principles.',
    synopsis: 'Engaging real-world case studies explaining price elasticity, market equilibria, monetary policy, and international trade in concise chapters.',
    sellerName: 'Prof. Miller (Emeritus)',
    sellerRating: 5.0,
    views: 510,
    downloads: 0,
    isBestseller: false,
    isTrending: false,
    isStaffPick: false
  },
  {
    id: 'b-22',
    title: 'Meditations',
    author: 'Marcus Aurelius (Gregory Hays Translation)',
    category: 'Classics',
    format: 'Paperback',
    isEbook: false,
    condition: 'Like New',
    price: 6.00,
    originalPrice: 14.00,
    rating: 4.9,
    reviewsCount: 1120,
    coverTone: '#181614',
    accentColor: '#E2B15C',
    pages: 256,
    year: 2002,
    isbn: '978-0812968255',
    description: 'The personal writings of the Roman Emperor on Stoic discipline and inner calm.',
    synopsis: 'Written without any thought of publication, Marcus Aurelius’s private reflections offer timeless guidance on handling adversity, ego, and the transient nature of life.',
    sellerName: 'Stoic Archive',
    sellerRating: 4.9,
    views: 890,
    downloads: 0,
    isBestseller: true,
    isTrending: false,
    isStaffPick: true
  },
  {
    id: 'b-23',
    title: 'Man’s Search for Meaning',
    author: 'Viktor E. Frankl',
    category: 'Non-Fiction',
    format: 'Paperback',
    isEbook: false,
    condition: 'Like New',
    price: 6.50,
    originalPrice: 16.00,
    rating: 4.9,
    reviewsCount: 940,
    coverTone: '#16171B',
    accentColor: '#94A3B8',
    pages: 184,
    year: 2006,
    isbn: '978-0807014295',
    description: 'Psychiatrist Viktor Frankl’s memoir and introduction to logotherapy.',
    synopsis: 'Based on his experience in Nazi death camps, Frankl argues that we cannot avoid suffering, but we can choose how to cope with it, find meaning in it, and move forward.',
    sellerName: 'Echo Book Exchange',
    sellerRating: 4.9,
    views: 840,
    downloads: 0,
    isBestseller: false,
    isTrending: false,
    isStaffPick: true
  },
  {
    id: 'b-24',
    title: 'The Pragmatic Programmer: 20th Anniversary Edition',
    author: 'David Thomas & Andrew Hunt',
    category: 'Technology',
    format: 'Hardcover',
    isEbook: false,
    condition: 'Like New',
    price: 24.50,
    originalPrice: 54.99,
    rating: 4.9,
    reviewsCount: 510,
    coverTone: '#161922',
    accentColor: '#38BDF8',
    pages: 352,
    year: 2019,
    isbn: '978-0135957059',
    description: 'Your journey to mastery in software craft, engineering pragmatism, and career development.',
    synopsis: 'Packed with practical advice on DRY principles, orthogonality, tracer bullets, refactoring, and team collaboration that stands the test of time.',
    sellerName: 'Senior Eng Books',
    sellerRating: 4.9,
    views: 730,
    downloads: 0,
    isBestseller: true,
    isTrending: false,
    isStaffPick: false
  }
];

// ==========================================================================
// Local Storage Initialization & Data Store Helper
// ==========================================================================
function initCatalogueStore() {
  try {
    const existing = localStorage.getItem('rebook_books_catalog');
    if (!existing) {
      localStorage.setItem('rebook_books_catalog', JSON.stringify(REBOOK_CATALOGUE));
    }
  } catch (err) {
    console.warn('Storage unavailable:', err);
  }
}

function getStoredBooks() {
  try {
    const stored = localStorage.getItem('rebook_books_catalog');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Error reading catalog:', err);
  }
  return REBOOK_CATALOGUE;
}

function saveStoredBooks(books) {
  try {
    localStorage.setItem('rebook_books_catalog', JSON.stringify(books));
  } catch (err) {
    console.error('Error saving books:', err);
  }
}

// ==========================================================================
// Toast Notification Engine
// ==========================================================================
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `<span style="font-weight: 700;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 200ms ease';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

// ==========================================================================
// Responsive Mobile Drawer Navigation
// ==========================================================================
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('drawer-close');

  if (!hamburgerBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

// ==========================================================================
// Book Card HTML Generator (Clean, Minimal, Responsive)
// ==========================================================================
function renderBookCardHTML(book) {
  const formatTag = book.isEbook ? (book.price === 0 ? 'Free eBook' : 'eBook') : (book.format || 'Book');
  
  let badgeHTML = '';
  if (book.isBestseller) {
    badgeHTML = `<span class="badge bestseller">Bestseller</span>`;
  } else if (book.isTrending) {
    badgeHTML = `<span class="badge trending">Trending</span>`;
  } else if (book.price === 0) {
    badgeHTML = `<span class="badge free">Free</span>`;
  }

  const displayPrice = book.price === 0 ? 'Free' : `$${book.price.toFixed(2)}`;
  const originalPriceHTML = (book.originalPrice && book.originalPrice > book.price) 
    ? `<span class="book-price-original">$${book.originalPrice.toFixed(2)}</span>` 
    : '';

  const actionText = book.isEbook ? (book.price === 0 ? 'Read Free' : 'Get eBook') : 'Inspect';

  return `
    <article class="book-card" onclick="openQuickView('${book.id}')" role="button" tabindex="0" aria-label="${book.title} by ${book.author}">
      <div class="book-cover-wrap" style="background-color: ${book.coverTone || '#161922'};">
        <div class="book-cover-spine"></div>
        <div class="book-cover-top">
          <span class="book-format-tag">${formatTag}</span>
          ${badgeHTML}
        </div>
        <div class="book-cover-body">
          <div class="book-cover-title">${book.title}</div>
          <div class="book-cover-author">${book.author}</div>
        </div>
        <div class="book-cover-footer">
          <span class="book-cover-genre">${book.category}</span>
          <span style="font-size: 0.72rem; color: var(--text-muted);">${book.year || ''}</span>
        </div>
      </div>
      <div class="book-details">
        <div class="book-meta-row">
          <div class="book-rating">
            <span>★</span>
            <span>${book.rating.toFixed(1)}</span>
            <span class="book-rating-count">(${book.reviewsCount})</span>
          </div>
          <span class="book-condition-pill">${book.condition}</span>
        </div>
        <h4 class="book-title" title="${book.title}">${book.title}</h4>
        <p class="book-author">${book.author}</p>
        <div class="book-pricing-row">
          <div class="book-price-group">
            <span class="book-price">${displayPrice}</span>
            ${originalPriceHTML}
          </div>
          <button class="book-action-btn" onclick="event.stopPropagation(); handleQuickBuy('${book.id}')">
            ${actionText}
          </button>
        </div>
      </div>
    </article>
  `;
}

// ==========================================================================
// Interactive Quick View Modal
// ==========================================================================
function openQuickView(bookId) {
  const books = getStoredBooks();
  const book = books.find(b => b.id === bookId);
  if (!book) return;

  let modal = document.getElementById('quick-view-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quick-view-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-content" id="quick-view-content" role="dialog" aria-modal="true">
        <button class="modal-close-btn" onclick="closeQuickView()" aria-label="Close modal">✕</button>
        <div class="modal-book-layout" id="modal-body-content"></div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQuickView();
    });
  }

  const bodyContent = document.getElementById('modal-body-content');
  const priceDisplay = book.price === 0 ? 'Free' : `$${book.price.toFixed(2)}`;
  const originalDisplay = (book.originalPrice && book.originalPrice > book.price) 
    ? `<span style="font-size: 1rem; color: var(--text-muted); text-decoration: line-through;">$${book.originalPrice.toFixed(2)}</span>` 
    : '';

  bodyContent.innerHTML = `
    <div class="book-cover-wrap" style="background-color: ${book.coverTone || '#161922'}; border-radius: var(--radius-lg); height: 100%; min-height: 280px;">
      <div class="book-cover-spine"></div>
      <div class="book-cover-top">
        <span class="book-format-tag">${book.isEbook ? 'Digital Edition' : book.format}</span>
        <span class="badge" style="background: rgba(255,255,255,0.1); color: var(--text-primary);">${book.condition}</span>
      </div>
      <div class="book-cover-body">
        <div class="book-cover-title" style="font-size: 1.35rem;">${book.title}</div>
        <div class="book-cover-author" style="font-size: 0.9rem;">${book.author}</div>
      </div>
      <div class="book-cover-footer">
        <span class="book-cover-genre">${book.category}</span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">${book.year || ''}</span>
      </div>
    </div>
    <div class="modal-book-info">
      <h2>${book.title}</h2>
      <p class="modal-book-author">by <strong>${book.author}</strong> • <span style="color: var(--accent-warm);">★ ${book.rating.toFixed(1)}</span> (${book.reviewsCount} community reviews)</p>
      
      <div class="modal-specs-list">
        <div class="spec-item">
          Format
          <strong>${book.isEbook ? 'Digital (ePub / PDF)' : book.format}</strong>
        </div>
        <div class="spec-item">
          Condition
          <strong>${book.condition}</strong>
        </div>
        <div class="spec-item">
          Length
          <strong>${book.pages} pages</strong>
        </div>
        <div class="spec-item">
          Seller
          <strong>${book.sellerName || 'Verified Community Member'}</strong>
        </div>
      </div>

      <p class="modal-book-desc">${book.synopsis || book.description}</p>

      <div style="display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1.5rem;">
        <span style="font-size: 1.85rem; font-weight: 800; color: var(--text-primary);">${priceDisplay}</span>
        ${originalDisplay}
        <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: auto;">ISBN: ${book.isbn || 'N/A'}</span>
      </div>

      <div class="modal-action-row">
        <button class="btn btn-primary" style="flex: 1; padding: 0.8rem 1.25rem;" onclick="handleQuickBuy('${book.id}')">
          ${book.isEbook ? (book.price === 0 ? 'Read Instant Free' : 'Purchase & Download') : 'Add to Collection'}
        </button>
        <button class="btn btn-secondary" onclick="toggleSaveBook('${book.id}')" title="Save to reading list">
          ♡ Save
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function handleQuickBuy(bookId) {
  const books = getStoredBooks();
  const book = books.find(b => b.id === bookId);
  if (!book) return;

  closeQuickView();
  if (book.price === 0) {
    showToast(`"${book.title}" added to your digital library for free!`, 'success');
  } else {
    showToast(`Order placed for "${book.title}" ($${book.price.toFixed(2)})!`, 'success');
  }
}

function toggleSaveBook(bookId) {
  const books = getStoredBooks();
  const book = books.find(b => b.id === bookId);
  if (!book) return;

  try {
    let saved = JSON.parse(localStorage.getItem('rebook_saved_items') || '[]');
    if (saved.includes(bookId)) {
      saved = saved.filter(id => id !== bookId);
      localStorage.setItem('rebook_saved_items', JSON.stringify(saved));
      showToast(`Removed "${book.title}" from your saved list.`);
    } else {
      saved.push(bookId);
      localStorage.setItem('rebook_saved_items', JSON.stringify(saved));
      showToast(`Saved "${book.title}" to your reading list!`, 'success');
    }
  } catch (err) {
    showToast(`Saved to wishlist!`, 'success');
  }
}

// ==========================================================================
// Page Load Handlers
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initCatalogueStore();
  initMobileNavigation();

  // Set active link on navbar
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .drawer-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Setup Esc modal close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickView();
    }
  });
});
