(function(){
let items=[];
const PICK=36,STACK=70,MAXI=90,LIFE=60;
function spawn(px,py,k,t){
 for(const d of items)if(d.k===k&&d.t===t&&Math.hypot(d.x-px,d.y-py)<STACK){d.n++;d.life=LIFE;return}
 if(items.length>=MAXI)items.shift();
 items.push({x:px+(Math.random()-.5)*30,y:py+(Math.random()-.5)*30,k:k,t:t,n:1,life:LIFE,ph:Math.random()*6.28});
}
const _s=step;
step=function(dt){
 const old=mobs.slice();
 _s(dt);
 for(const m of old)if(m.hp<=0&&mobs.indexOf(m)<0){const r=INV.roll();if(r)spawn(m.x,m.y,r.k,r.t)}
 const mg=window.MAGNET||0;
 for(let i=items.length-1;i>=0;i--){
  const d=items[i];d.life-=dt;
  if(d.life<=0){items.splice(i,1);continue}
  const dx=P.x-d.x,dy=P.y-d.y,dist=Math.hypot(dx,dy)||1;
  if(mg>0&&dist<mg){const sp=260*(1-dist/mg)+120;d.x+=dx/dist*sp*dt;d.y+=dy/dist*sp*dt}
  if(dist<PICK){
   for(let j=0;j<d.n;j++)INV.add(d.k,d.t);
   toast('+ '+(d.n>1?d.n+'x ':'')+PET[d.k].n+' ('+TIERS[d.t].n+')');
   items.splice(i,1);
  }
 }
};
function drawItems(){
 const ts=performance.now()/1000;
 x.save();
 for(const d of items){
  if(Math.abs(d.x-P.x)>c.width/2+40||Math.abs(d.y-P.y)>c.height/2+40)continue;
  const T=PET[d.k],bob=Math.sin(ts*3+d.ph)*2,r=11+d.t*1.2;
  x.globalAlpha=d.life<5&&Math.floor(ts*8)%2?.4:1;
  x.fillStyle='rgba(0,0,0,.2)';x.beginPath();x.ellipse(d.x,d.y+r*.8,r*.9,r*.4,0,0,6.2832);x.fill();
  x.fillStyle=T.col;x.strokeStyle=TIERS[d.t].c;x.lineWidth=3;
  x.beginPath();x.arc(d.x,d.y+bob,r,0,6.2832);x.fill();x.stroke();
  if(d.n>1){
   x.font='bold 13px sans-serif';x.textAlign='left';x.lineWidth=3;x.strokeStyle='#000';x.fillStyle='#fff';
   x.strokeText('x'+d.n,d.x+r*.6,d.y+bob-r*.6);x.fillText('x'+d.n,d.x+r*.6,d.y+bob-r*.6);
  }
 }
 x.restore();
}
const _t=drawTris;
drawTris=function(){_t();drawItems()};
})();
// END DROPS
