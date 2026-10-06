function drawDummy(m,col){
  circle(m.x,m.y,m.r,col);
  ctx.fillStyle='#e03b3b';
  ctx.beginPath(); ctx.arc(m.x,m.y,m.r*.66,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#f2f2f2';
  ctx.beginPath(); ctx.arc(m.x,m.y,m.r*.33,0,Math.PI*2); ctx.fill();
}

function drawRock(m,col){
  ctx.beginPath();
  for(let i=0;i<7;i++){
    const a=i/7*Math.PI*2, rr=m.r*(i%2?.9:1.05);
    ctx.lineTo(m.x+Math.cos(a)*rr,m.y+Math.sin(a)*rr);
  }
  ctx.closePath(); ctx.fillStyle=col; ctx.fill();
  ctx.lineWidth=4; ctx.strokeStyle='#555'; ctx.stroke();
}

function drawBug(m,col){
  circle(m.x,m.y,m.r,col);
  ctx.fillStyle='rgba(0,0,0,.55)';
  [[-.35,-.2],[.3,-.35],[.1,.35],[-.3,.3]].forEach(o=>{
    ctx.beginPath();
    ctx.arc(m.x+o[0]*m.r,m.y+o[1]*m.r,m.r*.14,0,Math.PI*2); ctx.fill();
  });
}

function drawMobText(m){
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

function drawMob(m){
  const fl=m.flash&&T-m.flash<0.08;
  const col=fl?'#ffffff':m.color;
  const k=m.kind;
  if(k==='dummy') drawDummy(m,col);
  else if(k==='rock') drawRock(m,col);
  else if(k==='ant') drawAnt(m,col);
  else if(k==='scorpion') drawScorpion(m,col);
  else drawBug(m,col);
  drawMobText(m);
}
