// 1. SAFE DATA INITIALIZATION
function getBigInt(key, fallback) {
    const val = localStorage.getItem(key);
    // Parse as float first to avoid crashing on old decimal saves
    return (val && val !== "undefined") ? BigInt(Math.floor(parseFloat(val))) : BigInt(fallback);
}

let score = getBigInt('score', 0);
let scorePerClick = getBigInt('scorePerClick', 1);
let numAutoClickers = getBigInt('numautoclickers', 0);
let numDVDs = getBigInt('numdvds', 0);

// Load costs with a default for 'book'
let savedCosts = localStorage.getItem('costs');
let costs = { mouse: 15n, autoclicker: 100n, dvd: 1000n, book: 12000n };

if (savedCosts) {
    try {
        let parsed = JSON.parse(savedCosts);
        for (let key in parsed) {
            costs[key] = BigInt(Math.floor(parseFloat(parsed[key])));
        }
    } catch(e) { console.error("Data Load Error", e); }
}

const activeDVDs = [];

// 3. UI UPDATER (With Safety Checks)
function updateUI() {
    const scoreSpan = document.getElementById('score');
    if (scoreSpan) {
        // Use toString() if toLocaleString() is acting up
        scoreSpan.innerText = score.toLocaleString();
    }

    // Update shop costs automatically
    const ids = ['mouse', 'autoclicker', 'dvd', 'book'];
    ids.forEach(id => {
        const el = document.getElementById(id + 'cost');
        if (el && costs[id]) {
            el.innerText = costs[id].toLocaleString();
        }
    });
}

// 4. GAME FUNCTIONS
function increaseScore() {
    score += scorePerClick;
    updateUI();
}

function handleUpgrades(type) {
    let cost = costs[type];
    if (score >= cost) {
        score -= cost;
        if (type === 'mouse') {
            scorePerClick += 1n;
            costs.mouse = (costs.mouse * 15n) / 10n;
        } 
        else if (type === 'autoclicker') {
            numAutoClickers += 1n;
            costs.autoclicker = (costs.autoclicker * 115n) / 100n;
        } 
        else if (type === 'dvd') {
            numDVDs += 1n; // Add bouncing DVD logic here if you still use the class
            costs.dvd = (costs.dvd * 13n) / 10n;
        }
        else if (type === 'book') {
            scorePerClick += 50n;
            costs.book = costs.book * 2n;
        }
        updateUI();
        save();
    } else {
        alert('Need more points! Cost: ' + cost.toLocaleString());
    }
}

// 5. SYSTEM FUNCTIONS
function save() {
    localStorage.setItem('score', score.toString());
    localStorage.setItem('scorePerClick', scorePerClick.toString());
    localStorage.setItem('numautoclickers', numAutoClickers.toString());
    
    let costSave = {};
    for (let key in costs) costSave[key] = costs[key].toString();
    localStorage.setItem('costs', JSON.stringify(costSave));

    const toast = document.getElementById('save-toast');
    if(toast) {
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }
}

function clearData() {
    if (confirm("Reset everything?")) {
        localStorage.clear();
        location.reload();
    }
}

function openSettings() {
    let pass = prompt("Enter the password");
    if (pass == "123") {
        let val = prompt("Enter amount of points");
        if (val) {
            score = BigInt(val.replace(/\D/g, ''));
            updateUI();
            save();
        }
    }
}

// 6. ENGINE START
setInterval(() => {
    if (numAutoClickers > 0n) {
        score += numAutoClickers;
        updateUI();
    }
}, 1000);

// Initialize the screen on load
updateUI();

  /* const links = [
    "https://imgs.xkcd.com/comics/heartbleed.png",
    "https://imgs.xkcd.com/comics/2045.png",
    "https://imgs.xkcd.com/comics/unreliable_connection.png",
    "https://imgs.xkcd.com/comics/orbital_argument.png",
    "https://imgs.xkcd.com/comics/physics_paths.png",
    "https://imgs.xkcd.com/comics/oily_house_index.png",
    "https://imgs.xkcd.com/comics/comet_visitor.png",
    "https://imgs.xkcd.com/comics/strengths_and_weaknesses.png",
    "https://imgs.xkcd.com/comics/clark_gable.jpg",
    "https://imgs.xkcd.com/comics/subliminal.png",
  ];

  // 2. Function to choose and display one
  function displayRandomLink() {
    // Generate a random index between 0 and the length of the array
    const randomIndex = Math.floor(Math.random() * links.length);
    
    // Get the iframe and change its source
    const iframe = document.getElementById("xkcd-iframe");
    iframe.style.display = "block";
    iframe.src = links[randomIndex];
  }
    */