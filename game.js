function update(dt){
  T+=dt; spin+=dt*2.6;
  let mx=0, my=0;
  if(keys['w']||keys['arrowup']) my-=1;
  if(keys['s']||keys['arrowdown']) my+=1;
  if(keys['a']||keys['arrowleft']) mx-=1;
  if(keys['d']||keys['arrowright']) mx+=1;
  if(joy){
    const dx=joy.x-joy.ox, dy=joy.y-joy.oy, d=Math.hypot(dx,dy), max=60;
    if(d>6){ const k=Math.min(d,max)/max; mx+=dx/d*k; my+=dy/d*k; }
  }
  const l=Math.hypot(mx,my); if(l>1){mx/=l;my/=l;}
  player.x=Math.max(-WORLD,Math.min(WORLD,player.x+mx*player.speed*dt));
  player.y=Math.max(-WORLD,Math.min(WORLD,player.y+my*player.speed*dt));

  const n=slots.filter(Boolean).length; let k=0;
  const dist=62;
  slots.forEach(s=>{
    if(!s) return;
    const p=PETALS.find(x=>x.id===s.id);
    const a=spin+k*2*Math.PI/n; k++;
    s.x=player.x+Math.cos(a)*dist; s.y=player.y+Math.sin(a)*dist;
    mobs.forEach((m,mi)=>{
      if(Math.hypot(s.x-m.x,s.y-m.y)>=m.r+p.radius) return;
      if(T-(s.cd[mi]||-9)<p.cooldown) return;
      s.cd[mi]=T;
      const dmg=p.damage*RAR[s.rar].mult;
      if(!m.hits.length) m.first=T;
      m.hits.push({t:T,d:dmg});
      m.total+=dmg; m.lastHit=dmg; m.flash=T;
    });
  });
  mobs.forEach(m=>{
    while(m.hits.length&&T-m.hits[0].t>WINDOW) m.hits.shift();
  });
}

function dpsOf(m){
  if(!m.hits.length) return 0;
  let sum=0; m.hits.forEach(h=>sum+=h.d);
  return sum/Math.max(0.5,Math.min(WINDOW,T-m.first));
}
