let uid=1000;

function startSandbox(){
  mode='sandbox'; worldSize=WORLD; player.x=0; player.y=0;
  player.hp=player.max; smobs=[]; slots.forEach(s=>s&&resetPetal(s));
}

function startSurvival(){
  mode='survival'; worldSize=SURV_WORLD; player.x=0; player.y=0;
  player.hp=player.max; smobs=[]; wave=0; waveTimer=2; deadT=0;
  slots.forEach(s=>s&&resetPetal(s));
}

function clampW(v){ return Math.max(-worldSize+30,Math.min(worldSize-30,v)); }

function spawnMob(type,x,y){
  const d=SURV_MOBS[type];
  const o={id:uid++,type,name:d.name,r:d.r,color:d.color,wings:d.wings,
    hp:d.hp,max:d.hp,damage:d.damage,speed:d.speed,x,y,ang:0,atk:0,tq:2};
  smobs.push(o); return o;
}

// PLACEHOLDER wave formula
function spawnWave(){
  wave++;
  const c={baby:3+wave*2, worker:wave>=2?wave*2-2:0,
    soldier:wave>=3?wave-2:0, queen:wave%5===0?1:0};
  Object.keys(c).forEach(t=>{
    for(let i=0;i<c[t];i++){
      const a=Math.random()*Math.PI*2, d=650+Math.random()*100;
      spawnMob(t,clampW(player.x+Math.cos(a)*d),clampW(player.y+Math.sin(a)*d));
    }
  });
}

function updateSurvival(dt){
  if(deadT>0){ deadT-=dt; if(deadT<=0) startSurvival(); return; }
  smobs=smobs.filter(m=>!m.dead);
  if(!smobs.length){
    waveTimer-=dt;
    if(waveTimer<=0){ spawnWave(); waveTimer=3; }
  }
  smobs.forEach(m=>{
    const dx=player.x-m.x, dy=player.y-m.y, d=Math.hypot(dx,dy)||1;
    m.ang=Math.atan2(dy,dx);
    if(d>m.r+player.r-4){ m.x+=dx/d*m.speed*dt; m.y+=dy/d*m.speed*dt; }
    else if(T-m.atk>=0.5){ m.atk=T; player.hp-=m.damage; }
    if(m.type==='queen'){
      m.tq-=dt;
      if(m.tq<=0){
        m.tq=4;
        if(smobs.filter(o=>o.from===m.id).length<6)
          spawnMob('worker',m.x+30,m.y+30).from=m.id;
      }
    }
  });
  if(player.hp<=0){ player.hp=0; deadT=3; }
}

function drawSMobs(){
  smobs.forEach(m=>{
    const fl=m.flash&&T-m.flash<0.08;
    ctx.save(); ctx.translate(m.x,m.y); ctx.rotate(m.ang);
    drawAnt({x:0,y:0,r:m.r,color:m.color,wings:m.wings},fl?'#ffffff':m.color);
    ctx.restore();
    const w=m.r*2, y=m.y+m.r+8;
    ctx.fillStyle='#222'; ctx.fillRect(m.x-w/2,y,w,5);
    ctx.fillStyle='#7eef6d';
    ctx.fillRect(m.x-w/2,y,w*Math.max(0,m.hp)/m.max,5);
  });
}
