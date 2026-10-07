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
  if(deadT>0){ mx=0; my=0; }
  const l=Math.hypot(mx,my); if(l>1){mx/=l;my/=l;}
  const B=worldSize;
  player.x=Math.max(-B,Math.min(B,player.x+mx*player.speed*dt));
  player.y=Math.max(-B,Math.min(B,player.y+my*player.speed*dt));

  // Portal on the right edge of the sandbox
  if(mode==='sandbox'&&player.x>=WORLD-60&&Math.abs(player.y)<120){
    startSurvival(); return;
  }
  updatePetals(dt);
  if(mode==='sandbox'){
    mobs.forEach(m=>{
      while(m.hits.length&&T-m.hits[0].t>WINDOW) m.hits.shift();
    });
  } else updateSurvival(dt);
}

function dpsOf(m){
  if(!m.hits.length) return 0;
  let sum=0; m.hits.forEach(h=>sum+=h.d);
  return sum/Math.max(0.5,Math.min(WINDOW,T-m.first));
}
