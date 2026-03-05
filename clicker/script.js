// Load data from localStorage or use defaults
let score = parseInt(localStorage.getItem('score')) || 0;
let scorePerClick = parseInt(localStorage.getItem('scorePerClick')) || 1;
let numAutoClickers = parseInt(localStorage.getItem('numautoclickers')) || 0;

// Load the costs object or use default if it doesn't exist
let savedCosts = localStorage.getItem('costs');
let costs = savedCosts ? JSON.parse(savedCosts) : { mouse: 15 , autoclicker: 100};
document.getElementById('mousecost').innerText = costs['mouse'];

// Initial UI Update to show loaded data
document.getElementById('score').innerText = score;
document.getElementById('mousecost').innerText = costs.mouse;
document.getElementById('autoclickercost').innerText = costs.autoclicker;

function increaseScore() {
    score += scorePerClick;
    document.getElementById('score').innerText = score;
}


function showSaveNotification() {
    const toast = document.getElementById('save-toast');
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2000);
}

function save() {
    // Save all three pieces of data
    localStorage.setItem('score', score.toString());
    localStorage.setItem('scorePerClick', scorePerClick.toString());
    localStorage.setItem('costs', JSON.stringify(costs)); // Save the whole object
    localStorage.setItem('numautoclickers', numAutoClickers);
    
    showSaveNotification();
}

setInterval(save, 30000);

function buyUpgrade(type) {
    let cost = costs[type];
    if (type == 'mouse') {
        if (score >= cost) {
            score -= cost;
            costs[type] = Math.ceil(costs[type] * 1.5); 
            scorePerClick++;

            // Update UI
            document.getElementById('score').innerText = score;
            document.getElementById(type + 'cost').innerText = costs[type];
            
            // Optional: Save immediately on purchase
            save();
        } 
        else {
            alert('Not enough points! You need ' + cost);
        }
    }
    else if (type == 'autoclicker') {
        if (score >= cost) {
            score -= cost;
            costs[type] = Math.ceil(costs[type] * 1.15); 

            // Update UI
            document.getElementById('score').innerText = score;
            document.getElementById(type + 'cost').innerText = costs[type];
            
            // Optional: Save immediately on purchase
            numAutoClickers++;
            save();
        } 
        else {
            alert('Not enough points! You need ' + cost);
        }
    }
    
}

function handleUpgrades(type) {
    buyUpgrade(type);
}

function clearData() {
    if (confirm("Are you sure you want to clear all data?")) {
        localStorage.clear();
        
        // Reset local variables to defaults
        score = 0;
        scorePerClick = 1;
        costs = { mouse: 15, autoclicker: 100};

        // Update UI
        document.getElementById('score').innerText = 0;
        document.getElementById('mousecost').innerText = 15;
        document.getElementById('autoclickercost').innerText = 100;
    }
}

let autoclickTimer;

// 2. This function handles the logic
function startAutoClicker() {
    if (numAutoClickers > 0) {
        score += numAutoClickers;
        document.getElementById('score').innerText = score;
    }
}

// 3. Start the interval ONCE when the script loads
autoclickTimer = setInterval(startAutoClicker, 1000);