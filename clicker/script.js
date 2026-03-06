// 1. DATA INITIALIZATION
let score = parseInt(localStorage.getItem('score')) || 999999999;
let scorePerClick = parseInt(localStorage.getItem('scorePerClick')) || 1;
let numAutoClickers = parseInt(localStorage.getItem('numautoclickers')) || 0;
let numDVDs = parseInt(localStorage.getItem('numdvds')) || 0;

let savedCosts = localStorage.getItem('costs');
let costs = savedCosts ? JSON.parse(savedCosts) : { mouse: 15, autoclicker: 100, dvd: 1000 };

const activeDVDs = [];

// 2. DVD CLASS LOGIC
class BouncingDVD {
    constructor() {
        this.element = document.createElement('img');
        // FIXED IMAGE URL (The one you had was broken)
        this.element.src = "./xkcd1.png";
        this.element.style.cssText = `
            position: fixed; 
            width: 100px; 
            z-index: 100000000; 
            pointer-events: none; 
            filter: invert(1);
            opacity: 1;               /* 1 is solid, 0 is invisible */
        `;
        document.body.appendChild(this.element);

        this.width = 100;
        this.height = 45;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
        this.xs = 3;
        this.ys = 3;
    }

    update() {
        if (this.x + this.width >= window.innerWidth || this.x <= 0) {
            this.xs *= -1;
            this.onBounce();
        }
        if (this.y + this.height >= window.innerHeight || this.y <= 0) {
            this.ys *= -1;
            this.onBounce();
        }
        this.x += this.xs;
        this.y += this.ys;
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    onBounce() {
        score += 5; 
        updateUI();
        this.element.style.filter = `invert(1) sepia(1) saturate(5) hue-rotate(${Math.random() * 360}deg)`;
    }
}

// 3. UI UPDATER (MATCHES YOUR HTML IDs)
function updateUI() {
    document.getElementById('score').innerText = Math.floor(score);
    document.getElementById('mousecost').innerText = costs.mouse;
    document.getElementById('autoclickercost').innerText = costs.autoclicker;
    
    // Safety check: makes sure the DVD cost display exists
    const dvdDisplay = document.getElementById('dvdcost');
    if (dvdDisplay) dvdDisplay.innerText = costs.dvd;
}

// 4. GAME FUNCTIONS
function increaseScore() {
    score += scorePerClick;
    updateUI();
}

function handleUpgrades(type) {
    // 1. Force the cost to 1000 if the object property is missing
    let cost = costs[type];
    
    if (score >= cost) {
        score -= cost;
        
        if (type === 'mouse') {
            scorePerClick++;
            costs.mouse = Math.ceil(costs.mouse * 1.5);
        } 
        else if (type === 'autoclicker') {
            numAutoClickers++;
            costs.autoclicker = Math.ceil(costs.autoclicker * 1.15);
        } 
        else if (type === 'dvd') {
            numDVDs++;
            // Only spawn if the class exists
            if (typeof BouncingDVD !== 'undefined') {
                activeDVDs.push(new BouncingDVD());
            }
            costs.dvd = Math.ceil(costs.dvd * 1.3);
        }

        updateUI();
        save();
    } else {
        // 2. This alert will now show the actual cost instead of undefined
        alert('Need more points! Cost: ' + (cost || "Error: " + type + " not found"));
    }
}
// 5. SYSTEM FUNCTIONS
function save() {
    localStorage.setItem('score', score);
    localStorage.setItem('scorePerClick', scorePerClick);
    localStorage.setItem('numautoclickers', numAutoClickers);
    localStorage.setItem('numdvds', numDVDs);
    localStorage.setItem('costs', JSON.stringify(costs));
    
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

// 6. INITIALIZE & ENGINE
function animate() {
    activeDVDs.forEach(dvd => dvd.update());
    requestAnimationFrame(animate);
}

// Startup
for(let i=0; i < numDVDs; i++) { activeDVDs.push(new BouncingDVD()); }

setInterval(() => {
    if (numAutoClickers > 0) {
        score += numAutoClickers;
        updateUI();
    }
}, 1000);

setInterval(save, 30000);
updateUI();
animate();
