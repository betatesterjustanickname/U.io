const $ = id => document.getElementById(id);
const cv = $('c'), ctx = cv.getContext('2d');
let W, H, dpr, zoom, running = false, T = 0, last = 0, spin = 0, curRar = 0;
const player = {x:0, y:0, r:24, speed:250};
const slots = new Array(SLOT_COUNT).fill(null);
const keys = {};
let joy = null;

// Place mobs in rows: row 0 is closest to the spawn point.
const rowCount = {}, rowIdx = {};
MOB_DEFS.forEach(d => rowCount[d.row] = (rowCount[d.row]||0) + 1);
const mobs = MOB_DEFS.map(d => {
  const i = rowIdx[d.row] = (rowIdx[d.row]||0) + 1;
  return {
    ...d, x:(i-1-(rowCount[d.row]-1)/2)*170, y:-250-d.row*230,
    hits:[], total:0, lastHit:0, first:0
  };
});

function fmt(n){
  if(n<1000) return n>=100 ? String(Math.round(n)) : String(Math.round(n*10)/10);
  const u=['K','M','B','T','Qa','Qi']; let i=-1;
  while(n>=1000 && i<u.length-1){ n/=1000; i++; }
  return (Math.round(n*100)/100)+u[i];
}

function shade(hex,amt){
  const n=parseInt(hex.slice(1),16);
  let r=(n>>16)+amt, g=((n>>8)&255)+amt, b=(n&255)+amt;
  r=Math.max(0,Math.min(255,r));
  g=Math.max(0,Math.min(255,g));
  b=Math.max(0,Math.min(255,b));
  return 'rgb('+r+','+g+','+b+')';
}

function resize(){
  dpr=window.devicePixelRatio||1; W=innerWidth; H=innerHeight;
  cv.width=W*dpr; cv.height=H*dpr;
  cv.style.width=W+'px'; cv.style.height=H+'px';
  zoom=Math.max(.6,Math.min(1.2,Math.min(W,H)/650));
}
addEventListener('resize',resize);
resize();
