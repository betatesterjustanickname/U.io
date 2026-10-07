function petalDef(s){ return PETALS.find(p=>p.id===s.id); }
function maxHp(s){ return petalDef(s).hp*RAR[s.rar].mult; }
function resetPetal(s){ s.hp=maxHp(s); s.alive=true; s.reload=0; s.cd={}; }

function damageTarget(t,dmg){
  if(mode==='sandbox'){
    if(!t.hits.length) t.first=T;
    t.hits.push({t:T,d:dmg}); t.total+=dmg; t.lastHit=dmg;
  } else {
    t.hp-=dmg; if(t.hp<=0) t.dead=true;
  }
  t.flash=T;
}

function updatePetals(dt){
  const n=slots.filter(Boolean).length; let k=0;
  const list=mode==='sandbox'?mobs:smobs;
  slots.forEach(s=>{
    if(!s) return;
    const p=petalDef(s);
    const a=spin+k*2*Math.PI/n; k++;
    s.x=player.x+Math.cos(a)*62; s.y=player.y+Math.sin(a)*62;
    if(!s.alive){
      s.reload-=dt;
      if(s.reload<=0){ s.alive=true; s.hp=maxHp(s); }
      return;
    }
    list.forEach(m=>{
      if(!s.alive||m.dead) return;
      if(Math.hypot(s.x-m.x,s.y-m.y)>=m.r+p.radius) return;
      if(T-(s.cd[m.id]||-9)<p.hit) return;
      s.cd[m.id]=T;
      damageTarget(m,p.damage*RAR[s.rar].mult);
      s.hp-=m.damage;
      if(s.hp<=0){ s.hp=0; s.alive=false; s.reload=p.reload; }
    });
  });
  updateSlotsUI();
}

function drawPetals(){
  slots.forEach(s=>{
    if(!s||!s.alive||s.x===undefined) return;
    const p=petalDef(s), c=RAR[s.rar].color;
    ctx.beginPath(); ctx.arc(s.x,s.y,p.radius,0,Math.PI*2);
    ctx.fillStyle=c; ctx.fill();
    ctx.lineWidth=3; ctx.strokeStyle=shade(c,-60); ctx.stroke();
    const mh=maxHp(s);
    if(s.hp<mh){
      const w=p.radius*2;
      ctx.fillStyle='#222';
      ctx.fillRect(s.x-w/2,s.y+p.radius+4,w,4);
      ctx.fillStyle='#7eef6d';
      ctx.fillRect(s.x-w/2,s.y+p.radius+4,w*s.hp/mh,4);
    }
  });
}
