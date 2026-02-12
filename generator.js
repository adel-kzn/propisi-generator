
const canvas = document.getElementById('previewCanvas');
const ctx = canvas.getContext('2d');
const sidebar = document.getElementById('appSidebar');
const fontFile = 'primo.ttf'; 
let fontBase64 = null;

const MM_TO_PX = 11.81; 
const ROW_H = 4 * MM_TO_PX;
const GAP_H = 8 * MM_TO_PX;
const MARGIN_TOP = 20 * MM_TO_PX;
const MARGIN_LEFT = 20 * MM_TO_PX;
const MARGIN_RIGHT = 15 * MM_TO_PX;
const FONT_SIZE_PX = 116; 
const OFFSET_PX = 0; 

function toggleSidebar() { sidebar.classList.toggle('closed'); }

function getHeadAndTail(char){const code=char.charCodeAt(0);const map={0x0410:{h:100,t:8},0x0411:{h:100,t:100},0x0412:{h:100,t:100},0x0413:{h:100,t:100},0x0414:{h:100,t:8},0x0415:{h:100,t:4},0x0416:{h:100,t:4},0x0417:{h:100,t:100},0x0418:{h:100,t:1},0x0419:{h:100,t:1},0x041A:{h:100,t:1},0x041B:{h:100,t:1},0x041C:{h:100,t:1},0x041D:{h:100,t:1},0x041E:{h:100,t:100},0x041F:{h:100,t:1},0x0420:{h:100,t:100},0x0421:{h:100,t:4},0x0422:{h:100,t:1},0x0423:{h:100,t:100},0x0424:{h:100,t:100},0x0425:{h:100,t:4},0x0426:{h:100,t:6},0x0427:{h:100,t:1},0x0428:{h:100,t:1},0x0429:{h:100,t:6},0x042A:{h:100,t:100},0x042B:{h:100,t:1},0x042C:{h:100,t:100},0x042D:{h:100,t:100},0x042E:{h:100,t:100},0x042F:{h:100,t:1},0x0401:{h:100,t:4},0x0430:{h:2,t:1},0x0431:{h:2,t:100},0x0432:{h:6,t:2},0x0433:{h:7,t:1},0x0434:{h:2,t:3},0x0435:{h:5,t:4},0x0436:{h:4,t:4},0x0437:{h:4,t:3},0x0438:{h:1,t:1},0x0439:{h:1,t:1},0x043A:{h:1,t:1},0x043B:{h:3,t:1},0x043C:{h:3,t:1},0x043D:{h:1,t:1},0x043E:{h:2,t:5},0x043F:{h:1,t:1},0x0440:{h:1,t:1},0x0441:{h:2,t:4},0x0442:{h:1,t:1},0x0443:{h:1,t:3},0x0444:{h:2,t:100},0x0445:{h:4,t:4},0x0446:{h:1,t:6},0x0447:{h:8,t:1},0x0448:{h:1,t:1},0x0449:{h:1,t:6},0x044A:{h:8,t:7},0x044B:{h:1,t:1},0x044C:{h:1,t:7},0x044D:{h:4,t:100},0x044E:{h:1,t:5},0x044F:{h:3,t:1},0x0451:{h:5,t:4}};if(map[code])return map[code];if(code>=0xE000)return{h:200,t:200};return{h:0,t:0}}function insGRF(c0Code,cCode,h){if(c0Code!==0x0413&&c0Code!==0x0420&&c0Code!==0x0424)return"";if(c0Code===0x0413){if(h===0||h===100||[0x431,0x432,0x439,0x451].includes(cCode))return"\uE403";if([0x438,0x439,0x443,0x448,0x449,0x446,0x44F].includes(cCode))return"\uE401"}else if(c0Code===0x0420){if(cCode!==0x43B&&cCode!==0x43C)return"\uE402"}else if(c0Code===0x0424){if(cCode!==0x43B&&cCode!==0x43C)return"\uE401"}return""}function ins(c1,c2){if(!c1||!c2)return"";const info1=getHeadAndTail(c1);const info2=getHeadAndTail(c2);const t=info1.t,h=info2.h;const n1=c1.charCodeAt(0),n2=c2.charCodeAt(0);if(t===200||h===200)return"";if((n1===0x41F||n1===0x422)&&n2===0x432)return"\uE410";if((n1===0x41F||n1===0x422)&&n2===0x431)return"\uE411";const set1=[0x438,0x439,0x43B,0x43C,0x448];const set2=[0x438,0x439,0x446,0x448,0x449];if(set1.includes(n1)&&set2.includes(n2))return"\uE413";if([0x41D,0x41F,0x422].includes(n1)&&[0x456,0x457].includes(n2))return"\uE413";if(t===0){if(h===1||h===2||h===3||h===100)return"\uE402";if(h===4)return"\uE402\uE007";if(h===5)return"\uE402\uE005";if(h===6)return"\uE402\uE006";if(h===7)return"\uE402\uE007";if(h===8)return"\uE402\uE008"}if(t===1){if(h===0)return"\uE010\uE402";if(h===1)return"\uE011";if(h===2)return"\uE012";if(h===3)return"\uE010";if(h===4)return"\uE014";if(h===5)return"\uE015";if(h===6)return"\uE016";if(h===7)return"\uE017";if(h===8)return"\uE018";if(h===100)return"\uE010\uE403"}if(t===2){if(h===0)return"\uE020\uE402";if(h===1)return"\uE021";if(h===2)return"\uE022";if(h===3)return"\uE023";if(h===4)return"\uE024";if(h===5)return"\uE025";if(h===6)return"\uE026";if(h===7)return"\uE027";if(h===8)return"\uE028";if(h===100)return"\uE020\uE403"}if(t===3){if(h===0)return"\uE030\uE402";if(h===1)return"\uE031";if(h===2)return"\uE032";if(h===3)return"\uE033";if(h===4)return"\uE034";if(h===5)return"\uE035";if(h===6)return"\uE036";if(h===7)return"\uE037";if(h===8)return"\uE038";if(h===100)return"\uE030\uE403"}if(t===4){if(h===0)return"\uE040\uE402";if(h===1)return"\uE041";if(h===2)return"\uE042";if(h===3)return"\uE043";if(h===4)return"\uE044";if(h===5)return"\uE045";if(h===6)return"\uE046";if(h===7)return"\uE047";if(h===8)return"\uE048";if(h===100)return"\uE040\uE403"}if(t===5){if(h===0)return"\uE402";if(h===1)return"\uE051";if(h===2)return"\uE052";if(h===3)return"\uE053";if(h===4)return"\uE054";if(h===5)return"\uE055";if(h===6)return"\uE056";if(h===7)return"\uE057";if(h===8)return"\uE058";if(h===100)return"\uE403"}if(t===6){if(h===0)return"\uE060\uE402";if(h===1)return"\uE061";if(h===2)return"\uE062";if(h===3)return"\uE063";if(h===4)return"\uE064";if(h===5)return"\uE065";if(h===6)return"\uE066";if(h===7)return"\uE067";if(h===8)return"\uE068";if(h===100)return"\uE060\uE403"}if(t===7){if(h===0)return"\uE070\uE402";if(h===1)return"\uE071";if(h===2)return"\uE072";if(h===3)return"\uE073";if(h===4)return"\uE074";if(h===5)return"\uE075";if(h===6)return"\uE076";if(h===7)return"\uE077";if(h===8)return"\uE078";if(h===100)return"\uE070\uE403"}if(t===8){if(h===0)return"\uE080\uE402";if(h===1)return"\uE081";if(h===2)return"\uE082";if(h===3)return"\uE083";if(h===4)return"\uE084";if(h===5)return"\uE085";if(h===6)return"\uE086";if(h===7)return"\uE087";if(h===8)return"\uE088";if(h===100)return"\uE080\uE403"}if(t===100){if(h===0)return"\uE402";if(h===1)return"\uE402\uE402";if(h===2)return"\uE402\uE401";if(h===3)return"\uE402";if(h===4)return"\uE402\uE401\uE007";if(h===5)return"\uE402\uE005";if(h===6)return"\uE402\uE401\uE006";if(h===7)return"\uE402\uE007";if(h===8)return"\uE402\uE008";if(h===100)return"\uE403"}const grf=insGRF(n1,n2,h);if(grf)return grf;return""}function processPrimoText(text){if(!text)return"";let res="";let c1="";let c2=text[0];res+=ins(" ",c2)+c2;for(let i=1;i<text.length;i++){c1=c2;c2=text[i];res+=ins(c1,c2)+c2}res+=ins(c2," ");return res}

window.onload = async function() {
    try {
        const response = await fetch(fontFile);
        if (!response.ok) throw new Error("Нет файла");
        const blob = await response.blob();
        
        const reader = new FileReader();
        reader.onloadend = function() {
            fontBase64 = reader.result;
            document.getElementById('status').innerText = 'Готов к работе';
            
            const urlParams = new URLSearchParams(window.location.search);
            const textParam = urlParams.get('text');
            if (textParam) {
                document.getElementById('textInput').value = textParam;
            }
            
            updatePreview();
        };
        reader.readAsDataURL(blob);
    } catch (e) {
        document.getElementById('status').innerText = 'Ошибка: положите файл ' + fontFile;
    }
};

function handleInput() {
    const input = document.getElementById('textInput');
    let text = input.value;
    const replacements = {'a':'а','A':'А','B':'В','c':'с','C':'С','e':'е','E':'Е','H':'Н','k':'к','K':'К','m':'м','M':'М','o':'о','O':'О','p':'р','P':'Р','T':'Т','x':'х','X':'Х','y':'у'};
    let newText = '';
    for (let char of text) newText += replacements[char] || char;
    if (newText !== text) {
        const start = input.selectionStart;
        input.value = newText;
        input.setSelectionRange(start, start);
    }
    updatePreview();
}

function getLines(text, maxWidth) {
    ctx.font = `${FONT_SIZE_PX}px PrimoFont`; 
    const words = text.replace(/\n/g, " \n ").split(" ");
    const lines = [];
    let currentLineRaw = words[0]; 

    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        if (word === "\n") {
            lines.push(currentLineRaw);
            currentLineRaw = words[++i] || "";
            continue;
        }
        
        let potentialLineRaw = currentLineRaw + " " + word;
        let potentialLineProcessed = processPrimoText(potentialLineRaw);
        let width = ctx.measureText(potentialLineProcessed).width;
        
        if (width < maxWidth) {
            currentLineRaw = potentialLineRaw;
        } else {
            lines.push(currentLineRaw);
            currentLineRaw = word;
        }
    }
    if (currentLineRaw) lines.push(currentLineRaw);
    return lines;
}

function updatePreview() {
    if (!fontBase64) return;
    const w = canvas.width;
    const h = canvas.height;
    const type = document.getElementById('bgSelect').value;
    const rawText = document.getElementById('textInput').value;
    const styleMode = document.getElementById('textStyle').value;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
    drawBackground(w, h, type);

    if (!rawText) return;

    const f = new FontFace('PrimoFont', `url(${fontBase64})`);
    f.load().then(loadedFace => {
        document.fonts.add(loadedFace);
        const maxTextWidth = w - MARGIN_LEFT - MARGIN_RIGHT;
        const lines = getLines(rawText, maxTextWidth);
        const processedLines = lines.map(line => processPrimoText(line));
        drawTextViaSVG(processedLines, w, h, styleMode, type);
    });
}

function drawBackground(w, h, type) {
    if (type === 'white') return;

    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.strokeStyle = '#FF8080'; ctx.lineWidth = 4;
    ctx.moveTo(MARGIN_LEFT, 0); ctx.lineTo(MARGIN_LEFT, h); ctx.stroke();
    
    if (type === 'cell') {
        const cellSize = 5 * MM_TO_PX; 
        ctx.lineWidth = 1; ctx.strokeStyle = '#5096F2'; 
        ctx.beginPath();
        for (let x = 0; x < w; x += cellSize) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
        for (let y = 0; y < h; y += cellSize) { ctx.moveTo(0, y); bgCtx.lineTo(w, y); }
        ctx.stroke();
        ctx.beginPath(); ctx.strokeStyle = '#FF8080'; ctx.lineWidth = 4;
        ctx.moveTo(MARGIN_LEFT, 0); ctx.lineTo(MARGIN_LEFT, h); ctx.stroke();
        return;
    }

    if (type === 'wide_lines') {
        const lineStep = 9 * MM_TO_PX; 
        ctx.lineWidth = 2; ctx.strokeStyle = '#5096F2';
        ctx.beginPath();
        for (let y = MARGIN_TOP; y < h; y += lineStep) {
            ctx.moveTo(0, y); ctx.lineTo(w, y);
        }
        ctx.stroke();
        return;
    }

    let lineHeight = ROW_H; 
    const totalH = lineHeight + GAP_H;
    let y = MARGIN_TOP;
    
    let drawSlant = false;
    let slantStep = 0;
    
    if (type === 'propisi_often') { drawSlant = true; slantStep = 25 * MM_TO_PX; }

    while(y < h - MARGIN_TOP) {
        ctx.lineWidth = 2; ctx.strokeStyle = '#5096F2'; ctx.setLineDash([]);
        ctx.beginPath(); 
        ctx.moveTo(0, y); ctx.lineTo(w, y); 
        ctx.stroke();
        
        ctx.beginPath(); 
        ctx.moveTo(0, y + lineHeight); ctx.lineTo(w, y + lineHeight); 
        ctx.stroke();
        y += totalH;
    }
    if (drawSlant) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#D1D1D6';
        ctx.beginPath(); 
        const tan = 0.466; 
        const totalShift = h * tan;
        for (let x = -totalShift; x < w; x += slantStep) {
            ctx.moveTo(x + totalShift, 0); ctx.lineTo(x, h);
        }
        ctx.stroke();
    }
}

function drawTextViaSVG(lines, w, h, styleMode, bgType) {
    let currentLineHeight = ROW_H; 
    const fullRowH = currentLineHeight + GAP_H;
    let tspans = '';
    
    lines.forEach((line, i) => {
        let y;
        if (bgType === 'wide_lines') {
            const lineStep = 9 * MM_TO_PX;
            y = MARGIN_TOP + (i + 1) * lineStep + OFFSET_PX;
        } else {
            y = MARGIN_TOP + (i * fullRowH) + currentLineHeight + OFFSET_PX;
        }
        const safeLine = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        tspans += `<text x="${MARGIN_LEFT}" y="${y}">${safeLine}</text>`;
    });

    let svgStyle = '';
    let defs = '';

    if (styleMode === 'black') {
        svgStyle = `fill: black;`;
    } else if (styleMode === 'pale') {
        svgStyle = `fill: rgba(0,0,0,0.25);`;
    } else if (styleMode === 'outline') {
        svgStyle = `fill: white; stroke: rgba(0,0,0,0.5); stroke-width: 1px;`;
    } else if (styleMode === 'dotted') {
        defs = `
        <defs>
            <pattern id="dotPattern" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.5" fill="black" />
            </pattern>
            <style>
                @font-face { font-family: 'PrimoFont'; src: url('${fontBase64}') format('truetype'); }
                text { font-family: 'PrimoFont'; font-size: ${FONT_SIZE_PX}px; fill: url(#dotPattern); white-space: pre; }
            </style>
        </defs>`;
        svgStyle = `fill: url(#dotPattern);`;
    }

    if (styleMode !== 'dotted') {
        defs = `
        <defs>
            <style>
                @font-face { font-family: 'PrimoFont'; src: url('${fontBase64}') format('truetype'); }
                text { font-family: 'PrimoFont'; font-size: ${FONT_SIZE_PX}px; ${svgStyle} white-space: pre; }
            </style>
        </defs>`;
    }

    const svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
        ${defs}
        ${tspans}
    </svg>`;

    const img = new Image();
    img.onload = function() { ctx.drawImage(img, 0, 0); };
    const blob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    img.src = url;
}

function generatePDF() {
    if (!fontBase64) { alert("Шрифт не готов!"); return; }
    
    ctx.save();
    
    ctx.font = "30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"; 
    ctx.fillStyle = "#aaaaaa";
    
    ctx.fillText("Сгенерировано бесплатно на https://propisi.site", 60, 3450);
    
    ctx.restore();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    
    const imgData = canvas.toDataURL('image/jpeg', 0.85);
    doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    
    doc.save("propisi.pdf");
}
