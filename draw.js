function circle(x,y,r,fill){
  ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fillStyle=fill; ctx.fill();
  ctx.lineWidth=Math.max(2,r*.14);
  ctx.strokeStyle=shade(fill[0]==='#'?fill:'#888888',-55); ctx.stroke();
}

function draw(){
  const bg=mode==='sandbox'?['#14683c','#1ea761']:['#3b3322','#8a7650'];
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.fillStyle=bg[0]; ctx.fillRect(0,0,W,H);
  ctx.setTransform(dpr*zoom,0,0,dpr*zoom,
    dpr*(W/2-zoom*player.x),dpr*(H/2-zoom*player.y));
  const B=worldSize+40;
  ctx.fillStyle=bg[1]; ctx.fillRect(-B,-B,B*2,B*2);
  ctx.strokeStyle='rgba(0,0,0,.10)'; ctx.lineWidth=2; ctx.beginPath();
  for(let v=-B;v<=B;v+=50){
    ctx.moveTo(v,-B); ctx.lineTo(v,B); ctx.moveTo(-B,v); ctx.lineTo(B,v);
  }
  ctx.stroke();
  if(mode==='sandbox'){ mobs.forEach(drawMob); drawPortal(); }
  else drawSMobs();
  drawPetals();
  circle(player.x,player.y,player.r,'#ffe763');
  ctx.fillStyle='#222'; ctx.beginPath();
  ctx.arc(player.x-8,player.y-5,3.2,0,7);
  ctx.arc(player.x+8,player.y-5,3.2,0,7); ctx.fill();
  ctx.beginPath(); ctx.arc(player.x,player.y+4,7,.15*Math.PI,.85*Math.PI);
  ctx.lineWidth=2.5; ctx.strokeStyle='#222'; ctx.stroke();
  drawJoystick();
  drawHud();
}

function drawJoystick(){
  ctx.setTransform(dpr,0,0,dpr,0,0);
  if(!joy) return;
  let dx=joy.x-joy.ox, dy=joy.y-joy.oy; const d=Math.hypot(dx,dy), max=60;
  if(d>max){dx=dx/d*max;dy=dy/d*max;}
  ctx.beginPath(); ctx.arc(joy.ox,joy.oy,max,0,Math.PI*2);
  ctx.fillStyle='rgba(0,0,0,.18)'; ctx.fill();
  ctx.beginPath(); ctx.arc(joy.ox+dx,joy.oy+dy,26,0,Math.PI*2);
  ctx.fillStyle='rgba(255,255,255,.45)'; ctx.fill();
}
