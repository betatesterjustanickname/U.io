function drawAnt(m,col){
  const x=m.x, y=m.y, r=m.r;
  ctx.lineWidth=Math.max(2,r*.14); ctx.strokeStyle=shade(m.color,-55);
  if(m.wings){
    ctx.fillStyle='rgba(255,255,255,.5)';
    [-1,1].forEach(s=>{
      ctx.beginPath();
      ctx.ellipse(x-r*.3,y+s*r*.85,r*.75,r*.4,s*.4,0,Math.PI*2);
      ctx.fill(); ctx.stroke();
    });
  }
  ctx.fillStyle=col;
  ctx.beginPath(); ctx.ellipse(x-r*.3,y,r*.85,r*.65,0,0,Math.PI*2);
  ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(x+r*.6,y,r*.5,0,Math.PI*2);
  ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x+r*.9,y-r*.25); ctx.lineTo(x+r*1.4,y-r*.6);
  ctx.moveTo(x+r*.9,y+r*.25); ctx.lineTo(x+r*1.4,y+r*.6);
  ctx.stroke();
  ctx.fillStyle='#222';
  [-1,1].forEach(s=>{
    ctx.beginPath(); ctx.arc(x+r*.75,y+s*r*.2,r*.08,0,Math.PI*2); ctx.fill();
  });
}

function drawScorpion(m,col){
  const x=m.x, y=m.y, r=m.r, dark=shade(m.color,-55);
  ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(x-r*.7,y);
  ctx.quadraticCurveTo(x-r*2,y-r*.1,x-r*1.5,y-r*1.2);
  ctx.strokeStyle=dark; ctx.lineWidth=r*.3; ctx.stroke();
  ctx.strokeStyle=col; ctx.lineWidth=r*.18; ctx.stroke();
  ctx.fillStyle='#7a3b1e';
  ctx.beginPath(); ctx.arc(x-r*1.5,y-r*1.25,r*.18,0,Math.PI*2); ctx.fill();
  ctx.lineWidth=Math.max(2,r*.14); ctx.strokeStyle=dark; ctx.fillStyle=col;
  [-1,1].forEach(s=>{
    ctx.beginPath(); ctx.moveTo(x+r*.7,y+s*r*.3);
    ctx.lineTo(x+r*1.1,y+s*r*.6); ctx.stroke();
    ctx.beginPath(); ctx.arc(x+r*1.2,y+s*r*.6,r*.28,0,Math.PI*2);
    ctx.fill(); ctx.stroke();
  });
  ctx.beginPath(); ctx.ellipse(x,y,r,r*.7,0,0,Math.PI*2);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle='#222';
  [-1,1].forEach(s=>{
    ctx.beginPath(); ctx.arc(x+r*.55,y+s*r*.2,r*.07,0,Math.PI*2); ctx.fill();
  });
  ctx.lineCap='butt';
}
