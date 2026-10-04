(function(){
const TILE=256,tc=document.createElement('canvas');
tc.width=TILE;tc.height=TILE;
(function(){
 const g=tc.getContext('2d');g.fillStyle='#2f8a5a';g.fillRect(0,0,TILE,TILE);
 let s=12345;const rnd=function(){s=(s*16807)%2147483647;return s/2147483647};
 const el=[];
 for(let i=0;i<46;i++)el.push({t:0,x:rnd()*TILE,y:rnd()*TILE,r:10+rnd()*22,d:rnd()<.5});
 for(let i=0;i<70;i++)el.push({t:1,x:rnd()*TILE,y:rnd()*TILE,h:5+rnd()*6});
 for(let i=0;i<7;i++)el.push({t:2,x:rnd()*TILE,y:rnd()*TILE,c:['#f2e9a0','#f0b6d0','#ffffff'][i%3]});
 for(let ox=-TILE;ox<=TILE;ox+=TILE)for(let oy=-TILE;oy<=TILE;oy+=TILE)for(const e of el){
  const px=e.x+ox,py=e.y+oy;
  if(e.t===0){g.fillStyle=e.d?'rgba(20,90,50,.22)':'rgba(120,200,120,.14)';g.beginPath();g.arc(px,py,e.r,0,6.2832);g.fill()}
  else if(e.t===1){g.strokeStyle='rgba(15,70,40,.35)';g.lineWidth=2;g.lineCap='round';g.beginPath();g.moveTo(px,py);g.lineTo(px-2,py-e.h);g.moveTo(px,py);g.lineTo(px+3,py-e.h*.8);g.stroke()}
  else{g.fillStyle=e.c;g.beginPath();g.arc(px,py,3,0,6.2832);g.fill();g.fillStyle='#e8c040';g.beginPath();g.arc(px,py,1.2,0,6.2832);g.fill()}
 }
})();
const pat=x.createPattern(tc,'repeat');
let gp=[],ft=[],lt=0,shake=0,hitF=0,lastHp=null;
function rr(a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
function vis(px,py,m){return Math.abs(px-P.x)<c.width/2+m&&Math.abs(py-P.y)<c.height/2+m}
function shadow(px,py,r){x.fillStyle='rgba(0,0,0,.2)';x.beginPath();x.ellipse(px,py+r*.75,r*.95,r*.45,0,0,6.2832);x.fill()}
function burst(px,py,n,col){for(let i=0;i<n;i++){const a=Math.random()*6.2832,v=60+Math.random()*110;gp.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:.5,m:.5,r:2+Math.random()*3,c:col})}}
function pshape(px,py,r,k,col,st,rot){
 x.save();x.translate(px,py);x.rotate(rot||0);
 x.fillStyle=col;x.strokeStyle=st;x.lineWidth=3;x.lineJoin='round';x.beginPath();
 if(k==='shard'){x.moveTo(0,-r*1.35);x.lineTo(r*.8,0);x.lineTo(0,r*1.35);x.lineTo(-r*.8,0);x.closePath()}
 else if(k==='spark'){for(let i=0;i<8;i++){const a=i*.7854-1.5708,q=i%2?r*.5:r*1.25;x.lineTo(Math.cos(a)*q,Math.sin(a)*q)}x.closePath()}
 else{for(let i=0;i<8;i++){const a=i*.7854,q=r*(i%2?.9:1.05);x.lineTo(Math.cos(a)*q,Math.sin(a)*q)}x.closePath()}
 x.fill();x.stroke();x.restore();
}
slot=function(sx,sy,sz,s){
 x.globalAlpha=.55;x.fillStyle='#000';rr(sx,sy,sz,sz,8);x.fill();x.globalAlpha=1;
 x.strokeStyle=s?TIERS[s.t].c:'#667';x.lineWidth=2;rr(sx,sy,sz,sz,8);x.stroke();
 if(!s)return;
 const T=PET[s.k];
 pshape(sx+sz/2,sy+sz/2,sz*.22,s.k,T.col,T.st,0);
 if(s.rl>0){x.fillStyle='rgba(0,0,0,.6)';x.fillRect(sx+2,sy+2,sz-4,(sz-4)*Math.min(1,s.rl/(s.rm||1)))}
};
draw=function(atk,def,jp,G){
 const now=performance.now(),dt=Math.min(.05,(now-(lt||now))/1000);lt=now;
 if(lastHp!==null&&P.hp<lastHp-1){shake=.3;hitF=.35}
 lastHp=P.hp;shake=Math.max(0,shake-dt);hitF=Math.max(0,hitF-dt);
 for(const q of gp){q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=.92;q.vy*=.92;q.t-=dt}
 gp=gp.filter(q=>q.t>0);
 for(const q of ft){q.y-=34*dt;q.t-=dt}
 ft=ft.filter(q=>q.t>0);
 const sxo=shake>0?(Math.random()-.5)*30*shake:0,syo=shake>0?(Math.random()-.5)*30*shake:0;
 const cx=P.x-c.width/2,cy=P.y-c.height/2;
 x.fillStyle='#143a29';x.fillRect(0,0,c.width,c.height);
 x.save();x.translate(sxo-cx,syo-cy);
 x.fillStyle=pat;x.fillRect(0,0,W,H);
 x.strokeStyle='#0f2f20';x.lineWidth=16;x.strokeRect(0,0,W,H);
 for(const q of fx){
  if(!q.s){q.s=1;burst(q.x,q.y,12,'#d9b0ff')}
  const f=1-q.t/.35;x.globalAlpha=Math.max(0,1-f);x.strokeStyle='#fff';x.lineWidth=3;
  x.beginPath();x.arc(q.x,q.y,10+f*28,0,6.2832);x.stroke();
 }
 x.globalAlpha=1;
 for(const m of mobs){
  if(!vis(m.x,m.y,70))continue;
  if(m._h===undefined)m._h=m.hp;
  if(m.hp<m._h){ft.push({x:m.x,y:m.y-m.r-6,t:.7,s:String(Math.round(m._h-m.hp))});burst(m.x,m.y,5,'#d9b0ff');m._h=m.hp}
  const ph=m.x*.013+m.y*.011,R2=m.r;
  shadow(m.x,m.y,m.r);
  x.save();x.translate(m.x,m.y);x.rotate(tm*.6+ph);
  x.fillStyle='#5a3a78';
  for(let i=0;i<8;i++){const a=i*.7854;x.beginPath();x.moveTo(Math.cos(a-.24)*R2,Math.sin(a-.24)*R2);x.lineTo(Math.cos(a)*(m.r+8),Math.sin(a)*(m.r+8));x.lineTo(Math.cos(a+.24)*R2,Math.sin(a+.24)*R2);x.fill()}
  x.restore();
  circ(m.x,m.y,R2,m.inv>0?'#fff':'#9a68c4','#5a3a78',3);
  x.fillStyle='rgba(255,255,255,.22)';x.beginPath();x.arc(m.x-5,m.y-6,5,0,6.2832);x.fill();
  const da=Math.atan2(P.y-m.y,P.x-m.x),ca=Math.cos(da),sa=Math.sin(da);
  for(const sd of [-1,1]){
   const ex=m.x+sd*6,ey=m.y-1;
   circ(ex,ey,4.4,'#fff','#2a1840',1.5);circ(ex+ca*1.8,ey+sa*1.8,2.2,'#000');
  }
  x.fillStyle='rgba(0,0,0,.6)';rr(m.x-17,m.y-m.r-14,34,6,3);x.fill();
  x.fillStyle='#ff6a6a';rr(m.x-16,m.y-m.r-13,32*Math.max(0,m.hp/m.mx),4,2);x.fill();
 }
 const fl=P.inv>0&&Math.floor(tm*20)%2;
 shadow(P.x,P.y,16);
 x.save();x.translate(P.x,P.y);const br=1+Math.sin(tm*3)*.025;x.scale(br,br);
 circ(0,0,16,fl?'#ffb0b0':'#ffd84d','#b8962e',3);
 x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.arc(-5,-7,5,0,6.2832);x.fill();
 for(const sd of [-1,1]){
  const ex=sd*6,ey=-1;
  circ(ex,ey,2.8,'#000');
  let oy=0,iy=0;
  if(atk){oy=ey-9;iy=ey-5}else if(def){oy=ey-5;iy=ey-9}
  if(atk||def){x.strokeStyle='#000';x.lineWidth=2;x.lineCap='round';x.beginPath();x.moveTo(ex+sd*5,oy);x.lineTo(ex-sd*4,iy);x.stroke()}
 }
 x.restore();
 for(const s of prim){
  if(!s||s.sc<.03||!vis(s.x,s.y,40))continue;
  const T=PET[s.k],r=(T.r+s.t*1.2)*s.sc;
  shadow(s.x,s.y,r);
  pshape(s.x,s.y,r,s.k,s.fl>0?'#fff':T.col,T.st,s.a+tm*2);
  if(s.t>0){x.strokeStyle=TIERS[s.t].c;x.lineWidth=2;x.beginPath();x.arc(s.x,s.y,r+4,0,6.2832);x.stroke()}
  if(s.hp<s.mx&&s.rl<=0){x.fillStyle='#000';x.fillRect(s.x-11,s.y-r-9,22,4);x.fillStyle='#6f6';x.fillRect(s.x-11,s.y-r-9,22*s.hp/s.mx,4)}
 }
 for(const q of gp){x.globalAlpha=Math.max(0,q.t/q.m);circ(q.x,q.y,q.r*(q.t/q.m)+1,q.c)}
 x.globalAlpha=1;
 x.font='bold 15px sans-serif';x.textAlign='center';x.lineWidth=3;x.strokeStyle='#000';
 for(const q of ft){x.globalAlpha=Math.min(1,q.t*2);x.fillStyle='#fff';x.strokeText(q.s,q.x,q.y);x.fillText(q.s,q.x,q.y)}
 x.globalAlpha=1;x.restore();
 const vg=x.createRadialGradient(c.width/2,c.height/2,Math.min(c.width,c.height)*.35,c.width/2,c.height/2,Math.max(c.width,c.height)*.75);
 vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.35)');
 x.fillStyle=vg;x.fillRect(0,0,c.width,c.height);
 if(hitF>0){x.fillStyle='rgba(255,0,0,'+(hitF*.5)+')';x.fillRect(0,0,c.width,c.height)}
 x.fillStyle='rgba(0,0,0,.55)';rr(66,16,208,22,11);x.fill();
 const hw=Math.max(0,P.hp/P.max)*200;
 if(hw>2){x.fillStyle='#5fe07a';rr(68,18,hw,18,9);x.fill();x.fillStyle='rgba(255,255,255,.25)';rr(70,20,Math.max(0,hw-4),6,3);x.fill()}
 x.fillStyle='#fff';x.font='bold 15px sans-serif';x.textAlign='left';x.fillText('Kills: '+kills,70,60);
 const s2=Math.min(46,Math.max(32,(c.width-300)/6)),x0=(c.width-5*(s2+6))/2,yP=c.height-s2-8,s3=s2*.7,yS=yP-s3-6;
 for(let i=0;i<5;i++){slot(x0+i*(s2+6),yP,s2,prim[i]);slot(x0+i*(s2+6)+(s2-s3)/2,yS,s3,sec[i])}
 x.font='bold 14px sans-serif';x.textAlign='center';
 for(let i=0;i<toasts.length;i++){x.globalAlpha=Math.min(1,toasts[i].t);x.fillStyle='#fff';x.fillText(toasts[i].s,c.width/2,yS-14-i*20)}
 x.globalAlpha=1;
 for(const a of [[G.atk,atk,'ATTACK','#b33'],[G.def,def,'DEFEND','#2d6a9f'],[G.swp,false,'SWAP','#8a6a2a']]){
  x.globalAlpha=a[1]?.9:.55;circ(a[0].x,a[0].y,a[0].r,a[3],'rgba(0,0,0,.45)',3);
  x.fillStyle='rgba(255,255,255,.18)';x.beginPath();x.arc(a[0].x-a[0].r*.25,a[0].y-a[0].r*.3,a[0].r*.4,0,6.2832);x.fill();
  x.globalAlpha=1;x.fillStyle='#fff';x.font='bold 13px sans-serif';x.textAlign='center';x.fillText(a[2],a[0].x,a[0].y+4);
 }
 for(const a of [[G.tal,'TAL'],[G.cra,'CRA'],[G.inv,'INV']]){
  x.globalAlpha=.8;circ(a[0].x,a[0].y,a[0].r,'#2a5a8a','rgba(0,0,0,.45)',3);
  x.globalAlpha=1;x.fillStyle='#fff';x.font='bold 12px sans-serif';x.textAlign='center';x.fillText(a[1],a[0].x,a[0].y+4);
 }
 x.globalAlpha=.4;circ(G.joy.x,G.joy.y,G.joy.r,'#000','rgba(255,255,255,.4)',3);
 let kx=G.joy.x,ky=G.joy.y;
 if(jp){const dx=jp.x-G.joy.x,dy=jp.y-G.joy.y,l=Math.hypot(dx,dy)||1,k=Math.min(l,G.joy.r)/l;kx+=dx*k;ky+=dy*k}
 x.globalAlpha=.85;circ(kx,ky,26,'#fff','rgba(0,0,0,.4)',3);x.globalAlpha=1;
};
})();
// END GFX
