function seededRandom(seed) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function generateStarMap() {
    const dateInput = document.getElementById('birthdate').value;
    const seed = parseInt(dateInput.replace(/-/g, ''));
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let stars = [];
    for (let i = 0; i < 80; i++) {
        stars.push({
            x: seededRandom(seed + i) * canvas.width,
            y: seededRandom(seed + i + 100) * canvas.height,
            size: seededRandom(seed + i + 200) * 2
        });
    }

    ctx.fillStyle = '#FFFFFF';
    stars.forEach(s => { ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill(); });

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    for (let i = 0; i < stars.length - 1; i++) {
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[i+1].x, stars[i+1].y);
    }
    ctx.stroke();

    ctx.font = '16px Monospace';
    ctx.fillText(`DATE: ${dateInput}`, 20, 40);
    ctx.fillText(`DEG: ${seed.toString().slice(0, 3)}°`, 20, 60);
}
window.onload = generateStarMap;
