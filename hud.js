function drawPortal(){
  ctx.fillStyle='rgba(120,60,200,.55)';
  ctx.fillRect(WORLD-60,-120,60,240);
  ctx.strokeStyle='#4b2a8a'; ctx.lineWidth=4;
  ctx.strokeRect(WORLD-60,-120,60,240);
  ctx.font='bold 16px Arial'; ctx.textAlign='center';
  ctx.fillStyle='#fff'; ctx.strokeStyle='#222';
  ctx.strokeText('Survival',WORLD-30,-132);
  ctx.fillText('Survival',WORLD-30,-132);
}

function hudText(t,x,y,size){
  ctx.font='bold '+size+'px Arial'; ctx.lineWidth=4; ctx.lineJoin='round';
  ctx.strokeStyle='#222'; ctx.fillStyle='#fff';
  ctx.strokeText(t,x,y); ctx.fillText(t,x,y);
}

function drawHud(){
  if(!running) return;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const w=Math.min(200,W*.45), x=12, y=12;
  ctx.fillStyle='#222'; ctx.fillRect(x,y,w,18);
  ctx.fillStyle='#7eef6d'; ctx.fillRect(x,y,w*player.hp/player.max,18);
  ctx.textAlign='left';
  hudText(Math.ceil(player.hp)+' / '+player.max,x+6,y+14,12);
  if(mode!=='survival') return;
  ctx.textAlign='center';
  hudText('Wave '+wave+'  |  Mobs: '+smobs.length,W/2,60,16);
  if(deadT>0) hudText('You died. Restarting...',W/2,H/2,28);
}
