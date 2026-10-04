(function(){
TIERS.push({n:'Ember',c:'#e8503a'},{n:'Frost',c:'#6ad8ff'},{n:'Prism',c:'#ff7ae0'},{n:'Aeon',c:'#ffffff'});
MUL.push(32,64,128,256);
const CH=[.64,.32,.16,.08,.04,.02,.01,.001];
const NEED=5,FMIN=1,FMAX=4;
let open=false,sy=0,drag=null,dragged=false,cs={k:null,t:0,n:0},anim=0,res=null,lt=0;
function I(){return window.INV}
function inR(px,py,a,b,w,h){return px>=a&&px<=a+w&&py>=b&&py<=b+h}
function L(){
 const px=10,py=10,pw=c.width-20,ph=c.height-20,rw=230;
 const gx=px+16,gy=py+56,gw=pw-rw-36,gh=ph-70;
 const sz=Math.min(54,Math.max(42,gw/8)),gap=6;
 const cols=Math.max(1,Math.floor((gw+gap)/(sz+gap)));
 const inv=I().get(),cells=[],heads=[];
 let y=gy-sy;
 for(let t=TIERS.length-1;t>=0;t--){
  const idx=[];
  for(let i=0;i<inv.length;i++)if(inv[i].t===t)idx.push(i);
  if(!idx.length)continue;
  heads.push({y:y,t:t});y+=24;
  idx.forEach(function(i,j){cells.push({x:gx+(j%cols)*(sz+gap),y:y+Math.floor(j/cols)*(sz+gap),i:i})});
  y+=Math.ceil(idx.length/cols)*(sz+gap)+10;
 }
 const rx=px+pw-rw-8,ss=34,slots=[];
 for(let i=0;i<5;i++)slots.push({x:rx+16+i*(ss+6),y:py+96});
 return{px:px,py:py,pw:pw,ph:ph,gx:gx,gy:gy,gw:gw,gh:gh,sz:sz,cells:cells,heads:heads,total:y+sy-gy,
  rx:rx,ss:ss,slots:slots,close:{x:px+pw-46,y:py+8,w:38,h:38},
  fill:{x:rx+16,y:py+150,w:90,h:40},cr:{x:rx+116,y:py+150,w:100,h:40}};
}
function back(){for(let i=0;i<cs.n;i++)I().add(cs.k,cs.t);cs.n=0}
function addOne(i){
 const it=I().get()[i];if(!it)return;
 if(it.t>=TIERS.length-1){toast('Max rarity for now');return}
 if(cs.n>0&&(cs.k!==it.k||cs.t!==it.t)){toast('Use the same petal');return}
 if(cs.n>=NEED)return;
 cs.k=it.k;cs.t=it.t;I().rem(i);cs.n++;res=null;
}
function fill(){
 if(cs.n===0){toast('Tap a petal first');return}
 while(cs.n<NEED){
  const inv=I().get();let idx=-1;
  for(let i=0;i<inv.length;i++)if(inv[i].k===cs.k&&inv[i].t===cs.t){idx=i;break}
  if(idx<0)break;
  I().rem(idx);cs.n++;
 }
}
function start(){
 if(cs.n<NEED){toast('Need '+NEED+' petals');return}
 anim=.9;res=null;
}
function finish(){
 const k=cs.k,t=cs.t;
 if(Math.random()<CH[t]){
  I().add(k,t+1);
  res={ok:1,txt:'Success! '+PET[k].n+' ('+TIERS[t+1].n+')'};
  toast('Craft success: '+PET[k].n+' '+TIERS[t+1].n);
 }else{
  const lose=FMIN+Math.floor(Math.random()*(FMAX-FMIN+1));
  for(let i=0;i<NEED-lose;i++)I().add(k,t);
  res={ok:0,txt:'Failed. Lost '+lose+' petal'+(lose>1?'s':'')};
  toast('Craft failed');
 }
 cs.n=0;
}
function tap(px,py){
 if(anim>0)return;
 const l=L();
 if(inR(px,py,l.close.x,l.close.y,l.close.w,l.close.h)){back();open=false;return}
 if(inR(px,py,l.gx,l.gy,l.gw,l.gh)){
  for(const q of l.cells)if(inR(px,py,q.x,q.y,l.sz,l.sz)){addOne(q.i);return}
  return;
 }
 if(inR(px,py,l.fill.x,l.fill.y,l.fill.w,l.fill.h)){fill();return}
 if(inR(px,py,l.cr.x,l.cr.y,l.cr.w,l.cr.h)){start();return}
 for(const s of l.slots)if(inR(px,py,s.x,s.y,l.ss,l.ss)){back();return}
}
addEventListener('pointerdown',function(e){
 if(!open){
  const G=geo();
  if(Math.hypot(e.clientX-G.cra.x,e.clientY-G.cra.y)<=G.cra.r+8){open=true;sy=0;res=null;e.stopImmediatePropagation()}
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
function btn(r,txt,on,col){
 x.globalAlpha=on?1:.45;x.fillStyle=col;x.fillRect(r.x,r.y,r.w,r.h);
 x.strokeStyle='rgba(0,0,0,.5)';x.lineWidth=3;x.strokeRect(r.x,r.y,r.w,r.h);
 x.globalAlpha=1;x.fillStyle='#fff';x.font='bold 15px sans-serif';x.textAlign='center';
 x.fillText(txt,r.x+r.w/2,r.y+r.h/2+5);
}
function panel(dt){
 if(anim>0){anim-=dt;if(anim<=0)finish()}
 const l=L(),inv=I().get();
 x.globalAlpha=.97;x.fillStyle='#3a2f55';x.fillRect(l.px,l.py,l.pw,l.ph);x.globalAlpha=1;
 x.strokeStyle='#1d1533';x.lineWidth=4;x.strokeRect(l.px,l.py,l.pw,l.ph);
 x.fillStyle='#fff';x.font='bold 22px sans-serif';x.textAlign='left';x.fillText('Craft',l.px+16,l.py+36);
 x.font='13px sans-serif';x.fillStyle='#d8cdf0';x.fillText('Tap petals to add them (5 same petals)',l.px+90,l.py+36);
 x.fillStyle='#b33';x.fillRect(l.close.x,l.close.y,l.close.w,l.close.h);
 x.strokeStyle='#fff';x.lineWidth=3;
 x.beginPath();x.moveTo(l.close.x+11,l.close.y+11);x.lineTo(l.close.x+27,l.close.y+27);x.moveTo(l.close.x+27,l.close.y+11);x.lineTo(l.close.x+11,l.close.y+27);x.stroke();
 x.save();x.beginPath();x.rect(l.gx,l.gy,l.gw,l.gh);x.clip();
 for(const h of l.heads){
  x.fillStyle=TIERS[h.t].c;x.font='bold 15px sans-serif';x.textAlign='left';x.fillText(TIERS[h.t].n,l.gx,h.y+15);
  x.fillRect(l.gx+80,h.y+10,l.gw-80,2);
 }
 for(const q of l.cells){
  const it=inv[q.i],T=PET[it.k],sz=l.sz;
  x.globalAlpha=.4;x.fillStyle=TIERS[it.t].c;x.fillRect(q.x,q.y,sz,sz);x.globalAlpha=1;
  x.strokeStyle=TIERS[it.t].c;x.lineWidth=2;x.strokeRect(q.x,q.y,sz,sz);
  circ(q.x+sz/2,q.y+sz/2-5,sz*.24,T.col,T.st,2);
  x.fillStyle='#fff';x.font='bold 10px sans-serif';x.textAlign='center';x.fillText(T.n,q.x+sz/2,q.y+sz-5);
  if(it.n>1){x.textAlign='right';x.font='bold 11px sans-serif';x.fillText('x'+it.n,q.x+sz-3,q.y+12)}
 }
 x.restore();
 if(!inv.length){x.fillStyle='#d8cdf0';x.font='14px sans-serif';x.textAlign='left';x.fillText('No petals to craft.',l.gx,l.gy+30)}
 x.fillStyle='#d8cdf0';x.font='bold 13px sans-serif';x.textAlign='left';
 x.fillText('Craft slots (tap to return)',l.rx+16,l.py+84);
 for(let i=0;i<5;i++){
  const s=l.slots[i];
  x.globalAlpha=.55;x.fillStyle='#000';x.fillRect(s.x,s.y,l.ss,l.ss);x.globalAlpha=1;
  x.strokeStyle=i<cs.n?TIERS[cs.t].c:'#778';x.lineWidth=2;x.strokeRect(s.x,s.y,l.ss,l.ss);
  if(i<cs.n){
   const T=PET[cs.k],wob=anim>0?Math.sin(performance.now()/60+i)*4:0;
   circ(s.x+l.ss/2,s.y+l.ss/2+wob,l.ss*.28,T.col,T.st,2);
  }
 }
 btn(l.fill,'FILL 5',cs.n>0&&cs.n<NEED&&anim<=0,'#2a6a9a');
 btn(l.cr,anim>0?'...':'CRAFT',cs.n>=NEED&&anim<=0,'#2f9a5a');
 x.textAlign='left';x.font='14px sans-serif';x.fillStyle='#fff';
 if(cs.n>0){
  const p=CH[cs.t];
  x.fillText(TIERS[cs.t].n+' > '+TIERS[cs.t+1].n,l.rx+16,l.py+222);
  x.fillStyle='#ffe58a';x.font='bold 16px sans-serif';
  x.fillText('Chance: '+(p*100).toFixed(p<.01?1:0)+'%',l.rx+16,l.py+246);
  x.fillStyle='#d8cdf0';x.font='12px sans-serif';
  x.fillText('Fail: lose '+FMIN+'-'+FMAX+' petals',l.rx+16,l.py+266);
 }
 if(res&&anim<=0){
  x.font='bold 15px sans-serif';x.fillStyle=res.ok?'#7dff9a':'#ff8a8a';
  x.fillText(res.txt,l.rx+16,l.py+300);
 }
}
const _d=draw;
draw=function(a,b,c2,d){
 _d(a,b,c2,d);
 if(open){const nw=performance.now(),dt=Math.min(.05,(nw-(lt||nw))/1000);lt=nw;panel(dt)}else lt=0;
};
})();
// END CRAFT
