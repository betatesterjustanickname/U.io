function circle(x,y,r,fill){
  ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fillStyle=fill; ctx.fill();
  ctx.lineWidth=Math.max(2,r*.14);
  ctx.strokeStyle=shade(fill[0]==='#'?fill:'#888888',-55); ctx.stroke();
}

function drawMob(m){
  const fl=m.flash&&T-m.flash<0.08;
  const col=fl?'#ffffff':m.color;
  if(m.kind==='dummy'){
    circle(m.x,m.y,m.r,col);
    ctx.beginPath(); ctx.arc(m.x,m.y,m.r*.66,0,Math.PI*2);
    ctx.fillStyle='#e03b3b'; ctx.fill();
    ctx.beginPath(); ctx.arc(m.x,m.y,m.r*.33,0,Math.PI*2);
    ctx.fillStyle='#f2f2f2'; ctx.fill();
  } else if(m.kind==='rock'){
    ctx.beginPath();
    for(let i=0;i<7;i++){
      const a=i/7*Math.PI*2, rr=m.r*(i%2?.9:1.05);
      ctx.lineTo(m.x+Math.cos(a)*rr,m.y+Math.sin(a)*rr);
    }
    ctx.closePath(); ctx.fillStyle=col; ctx.fill();
    ctx.lineWidth=4; ctx.strokeStyle='#555'; ctx.stroke();
  } else {
    circle(m.x,m.y,m.r,col);
    ctx.fillStyle='rgba(0,0,0,.55)';
    [[-.35,-.2],[.3,-.35],[.1,.35],[-.3,.3]].forEach(o=>{
      ctx.beginPath();
      ctx.arc(m.x+o[0]*m.r,m.y+o[1]*m.r,m.r*.14,0,Math.PI*2); ctx.fill();
    });
  }
  ctx.textAlign='center'; ctx.lineJoin='round';
  ctx.font='bold 14px Arial'; ctx.lineWidth=4;
  ctx.strokeStyle='#222'; ctx.fillStyle='#fff';
  ctx.strokeText(m.name,m.x,m.y-m.r-8); ctx.fillText(m.name,m.x,m.y-m.r-8);
  const lines=['DPS: '+fmt(dpsOf(m)),'Total: '+fmt(m.total),'Hit: '+fmt(m.lastHit)];
  ctx.font='bold 13px Arial';
  lines.forEach((t,i)=>{
    const y=m.y+m.r+18+i*16;
    ctx.strokeText(t,m.x,y); ctx.fillText(t,m.x,y);
  });
}

function draw(){
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.fillStyle='#14683c'; ctx.fillRect(0,0,W,H);
  ctx.setTransform(dpr*zoom,0,0,dpr*zoom,
    dpr*(W/2-zoom*player.x),dpr*(H/2-zoom*player.y));
  const B=WORLD+40;
  ctx.fillStyle='#1ea761'; ctx.fillRect(-B,-B,B*2,B*2);
  ctx.strokeStyle='rgba(0,0,0,.10)'; ctx.lineWidth=2; ctx.beginPath();
  for(let v=-B;v<=B;v+=50){
    ctx.moveTo(v,-B); ctx.lineTo(v,B); ctx.moveTo(-B,v); ctx.lineTo(B,v);
  }
  ctx.stroke();
  mobs.forEach(drawMob);
  slots.forEach(s=>{
    if(!s||s.x===undefined) return;
    const p=PETALS.find(x=>x.id===s.id), c=RAR[s.rar].color;
    ctx.beginPath(); ctx.arc(s.x,s.y,p.radius,0,Math.PI*2);
    ctx.fillStyle=c; ctx.fill();
    ctx.lineWidth=3; ctx.strokeStyle=shade(c,-60); ctx.stroke();
  });
  circle(player.x,player.y,player.r,'#ffe763');
  ctx.fillStyle='#222'; ctx.beginPath();
  ctx.arc(player.x-8,player.y-5,3.2,0,7);
  ctx.arc(player.x+8,player.y-5,3.2,0,7); ctx.fill();
  ctx.beginPath(); ctx.arc(player.x,player.y+4,7,.15*Math.PI,.85*Math.PI);
  ctx.lineWidth=2.5; ctx.strokeStyle='#222'; ctx.stroke();
  drawJoystick();
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
