function renderSlots(){
  const el=$('slots'); el.innerHTML='';
  slots.forEach((s,i)=>{
    const d=document.createElement('div'); d.className='slot';
    if(s){
      const r=RAR[s.rar];
      d.innerHTML='<div class="pt" style="background:'+r.color+
        ';border-color:'+shade(r.color,-50)+'"></div>';
      d.onclick=()=>{slots[i]=null;renderSlots();};
    }
    el.appendChild(d);
  });
}

function renderInv(){
  const tabs=$('tabs'); tabs.innerHTML='';
  RAR.forEach((r,i)=>{
    const t=document.createElement('div');
    t.className='tab'+(i===curRar?' on':'');
    t.style.background=r.color; t.textContent=r.name;
    t.onclick=()=>{curRar=i;renderInv();};
    tabs.appendChild(t);
  });
  const g=$('grid'); g.innerHTML='';
  const r=RAR[curRar];
  PETALS.forEach(p=>{
    const it=document.createElement('div'); it.className='item';
    it.innerHTML='<div class="pt" style="background:'+r.color+
      ';border-color:'+shade(r.color,-50)+'"></div>'+p.name;
    it.onclick=()=>equip(p.id,curRar);
    g.appendChild(it);
  });
}

function equip(id,rar){
  let i=slots.findIndex(s=>!s); if(i<0) i=SLOT_COUNT-1;
  slots[i]={id,rar,cd:{}}; renderSlots();
}

$('playBtn').onclick=()=>{
  $('menu').classList.add('hidden'); $('hud').classList.remove('hidden');
  running=true;
};
$('menuBtn').onclick=()=>{
  running=false; $('hud').classList.add('hidden');
  $('inv').classList.add('hidden'); $('menu').classList.remove('hidden');
};
$('invBtn').onclick=()=>{ renderInv(); $('inv').classList.remove('hidden'); };
$('invClose').onclick=()=>$('inv').classList.add('hidden');
$('resetBtn').onclick=()=>mobs.forEach(m=>{
  m.hits=[]; m.total=0; m.lastHit=0; m.first=0;
});
renderSlots();

addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;});
addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false;});
cv.addEventListener('pointerdown',e=>{
  if(!running||joy) return;
  joy={id:e.pointerId,ox:e.clientX,oy:e.clientY,x:e.clientX,y:e.clientY};
  cv.setPointerCapture(e.pointerId);
});
cv.addEventListener('pointermove',e=>{
  if(joy&&joy.id===e.pointerId){joy.x=e.clientX;joy.y=e.clientY;}
});
const endJoy=e=>{ if(joy&&joy.id===e.pointerId) joy=null; };
cv.addEventListener('pointerup',endJoy);
cv.addEventListener('pointercancel',endJoy);
