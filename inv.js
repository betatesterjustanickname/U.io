(function(){
let open=false,sel=-1,sy=0,drag=null,dragged=false;
let inv=[{k:'shard',t:0,n:6},{k:'pebble',t:0,n:3},{k:'spark',t:0,n:4},{k:'shard',t:2,n:1},{k:'spark',t:3,n:1},{k:'pebble',t:4,n:1}];
function add(k,t){for(const s of inv)if(s.k===k&&s.t===t){s.n++;return}inv.push({k:k,t:t,n:1})}
function rem(i){inv[i].n--;if(inv[i].n<=0)inv.splice(i,1)}
function roll(){
 if(Math.random()>.5)return null;
 const w=[70,22,6,1.5,.5];let s=0;for(const v of w)s+=v;
 let r=Math.random()*s,t=0;
 for(let i=0;i<w.length;i++){r-=w[i];if(r<=0){t=i;break}}
 const ks=Object.keys(PET);
 return{k:ks[Math.floor(Math.random()*ks.length)],t:t};
}
window.INV={get:function(){return inv},add:add,rem:rem,roll:roll};
function L(){
 const px=10,py=10,pw=c.width-20,ph=c.height-20;
 const sw=150,gx=px+16,gw=pw-sw-32,gy=py+56,gh=ph-70;
 const cs=Math.min(54,Math.max(42,gw/9)),gap=6;
 const cols=Math.max(1,Math.floor((gw+gap)/(cs+gap)));
 const cells=[],heads=[];
 let y=gy-sy;
 for(let t=TIERS.length-1;t>=0;t--){
  const idx=[];
  for(let i=0;i<inv.length;i++)if(inv[i].t===t)idx.push(i);
  if(!idx.length)continue;
  heads.push({y:y,t:t});y+=24;
  idx.forEach(function(i,j){
   cells.push({x:gx+(j%cols)*(cs+gap),y:y+Math.floor(j/cols)*(cs+gap),i:i});
  });
  y+=Math.ceil(idx.length/cols)*(cs+gap)+10;
 }
 const total=y+sy-gy;
 const ss=Math.max(30,Math.min(46,(ph-150)/5-8));
 const sx=px+pw-sw+8;
 const prim2=[],sec2=[];
 for(let i=0;i<5;i++){
  prim2.push({x:sx,y:py+80+i*(ss+8),s:ss});
  sec2.push({x:sx+ss+14,y:py+80+i*(ss+8),s:ss});
 }
 return{px:px,py:py,pw:pw,ph:ph,gx:gx,gy:gy,gw:gw,gh:gh,cs:cs,cells:cells,heads:heads,total:total,prim:prim2,sec:sec2,
  close:{x:px+pw-46,y:py+8,w:38,h:38},sx:sx,ss:ss};
}
function inR(px,py,x0,y0,w,h){return px>=x0&&px<=x0+w&&py>=y0&&py<=y0+h}
function tapSlot(arr,i){
 if(sel>=0&&inv[sel]){
  const it=inv[sel];rem(sel);sel=-1;
  const old=arr[i];if(old)add(old.k,old.t);
  arr[i]=mkp(it.k,it.t);
 }else if(arr[i]){add(arr[i].k,arr[i].t);arr[i]=null}
}
function tap(px,py){
 const l=L();
 if(inR(px,py,l.close.x,l.close.y,l.close.w,l.close.h)){open=false;sel=-1;return}
 if(inR(px,py,l.gx,l.gy,l.gw,l.gh)){
  for(const q of l.cells)if(inR(px,py,q.x,q.y,l.cs,l.cs)){sel=(sel===q.i)?-1:q.i;return}
  sel=-1;return;
 }
 for(let i=0;i<5;i++){
  if(inR(px,py,l.prim[i].x,l.prim[i].y,l.ss,l.ss)){tapSlot(prim,i);return}
  if(inR(px,py,l.sec[i].x,l.sec[i].y,l.ss,l.ss)){tapSlot(sec,i);return}
 }
}
addEventListener('pointerdown',function(e){
 if(!open){
  const G=geo();
  if(Math.hypot(e.clientX-G.inv.x,e.clientY-G.inv.y)<=G.inv.r+8){open=true;sel=-1;sy=0;e.stopImmediatePropagation()}
  return;
 }
 e.stopImmediatePropagation();
 drag={x:e.clientX,y:e.clientY,sy:sy};dragged=false;
},true);
addEventListener('pointermove',function(e){
 if(!open||!drag)return;
 e.stopImmediatePropagation();
 const dy=e.clientY-drag.y;
 if(Math.abs(dy)>8)dragged=true;
 if(dragged){const l=L();sy=cl(drag.sy-dy,0,Math.max(0,l.total-l.gh))}
},true);
addEventListener('pointerup',function(e){
 if(!open)return;
 e.stopImmediatePropagation();
 if(drag&&!dragged)tap(e.clientX,e.clientY);
 drag=null;
},true);
addEventListener('pointercancel',function(e){if(open){e.stopImmediatePropagation();drag=null}},true);
function panel(){
 const l=L();
 x.globalAlpha=.97;x.fillStyle='#1f4f7a';x.fillRect(l.px,l.py,l.pw,l.ph);x.globalAlpha=1;
 x.strokeStyle='#0f2a44';x.lineWidth=4;x.strokeRect(l.px,l.py,l.pw,l.ph);
 x.fillStyle='#fff';x.font='bold 22px sans-serif';x.textAlign='left';x.fillText('Petals',l.px+16,l.py+36);
 x.font='13px sans-serif';x.fillStyle='#cfe3f5';x.fillText('Tap a petal, then tap a slot',l.px+100,l.py+36);
 x.fillStyle='#b33';x.fillRect(l.close.x,l.close.y,l.close.w,l.close.h);
 x.strokeStyle='#fff';x.lineWidth=3;
 x.beginPath();x.moveTo(l.close.x+11,l.close.y+11);x.lineTo(l.close.x+27,l.close.y+27);x.moveTo(l.close.x+27,l.close.y+11);x.lineTo(l.close.x+11,l.close.y+27);x.stroke();
 x.save();x.beginPath();x.rect(l.gx,l.gy,l.gw,l.gh);x.clip();
 for(const h of l.heads){
  x.fillStyle=TIERS[h.t].c;x.font='bold 15px sans-serif';x.textAlign='left';x.fillText(TIERS[h.t].n,l.gx,h.y+15);
  x.fillRect(l.gx+80,h.y+10,l.gw-80,2);
 }
 for(const q of l.cells){
  const it=inv[q.i],T=PET[it.k],cs=l.cs;
  x.globalAlpha=.4;x.fillStyle=TIERS[it.t].c;x.fillRect(q.x,q.y,cs,cs);x.globalAlpha=1;
  x.strokeStyle=sel===q.i?'#fff':TIERS[it.t].c;x.lineWidth=sel===q.i?4:2;x.strokeRect(q.x,q.y,cs,cs);
  circ(q.x+cs/2,q.y+cs/2-5,cs*.24,T.col,T.st,2);
  x.fillStyle='#fff';x.font='bold 10px sans-serif';x.textAlign='center';x.fillText(T.n,q.x+cs/2,q.y+cs-5);
  if(it.n>1){x.textAlign='right';x.font='bold 11px sans-serif';x.fillText('x'+it.n,q.x+cs-3,q.y+12)}
 }
 x.restore();
 if(!inv.length){x.fillStyle='#cfe3f5';x.font='14px sans-serif';x.textAlign='left';x.fillText('Empty. Defeat mobs to find petals.',l.gx,l.gy+30)}
 x.fillStyle='#cfe3f5';x.font='bold 12px sans-serif';x.textAlign='left';
 x.fillText('Main',l.sx,l.py+72);x.fillText('Spare',l.sx+l.ss+14,l.py+72);
 for(let i=0;i<5;i++){
  slot(l.prim[i].x,l.prim[i].y,l.ss,prim[i]);
  slot(l.sec[i].x,l.sec[i].y,l.ss,sec[i]);
 }
 if(sel>=0&&inv[sel]){
  x.fillStyle='#fff';x.font='bold 13px sans-serif';x.textAlign='left';
  x.fillText(PET[inv[sel].k].n+' ('+TIERS[inv[sel].t].n+')',l.sx,l.py+l.ph-20);
 }
}
const _d=draw;
draw=function(a,b,c2,d){_d(a,b,c2,d);if(open)panel()};
})();
// END INV
