
document.addEventListener("DOMContentLoaded", function() {
    const letters = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
    const grid = document.getElementById('grid');
    
    if (!grid) return;
    
    grid.innerHTML = '';

    letters.split('').forEach(char => {
        const a = document.createElement('a');
        
        const singleLine = `${char} ${char.toLowerCase()}  ${char} ${char.toLowerCase()}  ${char} ${char.toLowerCase()}  ${char} ${char.toLowerCase()}  ${char} ${char.toLowerCase()}`;
        
        const fullPageText = new Array(12).fill(singleLine).join('\n');
        
        a.href = `generator.html?text=${encodeURIComponent(fullPageText)}`;
        
        a.className = 'letter-card';
        a.innerHTML = `
            <div class="letter-big">${char}</div>
            <div class="letter-desc">Печать</div>
        `;
        grid.appendChild(a);
    });
});
