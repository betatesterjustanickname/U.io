function step(dt){
 tm+=dt;
 for(const q of toasts)q.t-=dt;toasts=toasts.filter(q=>q.t>0);
 for(const q of fx)q.t-=dt;fx=fx.filter(q=>q.t>0);
 const G=geo(),ps=[...ptrs.values()];
 const atk=!!keys.Space||ps.some(q=>q.ty==='atk');
 const def=!atk&&(!!keys.ShiftLeft||!!keys.ShiftRight||ps.some(q=>q.ty==='def'));
 let vx=0,vy=0;
 const jp=ps.find(q=>q.ty==='joy');
 if(jp){const dx=jp.x-G.joy.x,dy=jp.y-G.joy.y,l=Math.hypot(dx,dy);if(l>6){const k=Math.min(1,l/G.joy.r);vx=dx/l*k;vy=dy/l*k}}
 if(keys.KeyW||keys.ArrowUp)vy-=1;
 if(keys.KeyS||keys.ArrowDown)vy+=1;
 if(keys.KeyA||keys.ArrowLeft)vx-=1;
 if(keys.KeyD||keys.ArrowRight)vx+=1;
 const vl=Math.hypot(vx,vy);
 if(vl>1){vx/=vl;vy/=vl}
 if(vl>.1){P.lx+=(vx/vl-P.lx)*Math.min(1,dt*10);P.ly+=(vy/vl-P.ly)*Math.min(1,dt*10)}
 P.inv=Math.max(0,P.inv-dt);
 P.x=cl(P.x+(vx*230+P.kx)*dt,0,W);P.y=cl(P.y+(vy*230+P.ky)*dt,0,H);
 const kd=Math.max(0,1-dt*7);P.kx*=kd;P.ky*=kd;
 P.hp=Math.min(P.max,P.hp+2*dt);
 spawnT-=dt;
 if(spawnT<=0&&mobs.length<20){
  spawnT=1;const a=Math.random()*6.28,r=500+Math.random()*300;
  mobs.push({x:cl(P.x+Math.cos(a)*r,30,W-30),y:cl(P.y+Math.sin(a)*r,30,H-30),hp:30,mx:30,r:16,kx:0,ky:0,inv:0,ca:0});
 }
 for(const m of mobs){
  m.inv-=dt;m.ca-=dt;m.x+=m.kx*dt;m.y+=m.ky*dt;m.kx*=kd;m.ky*=kd;
  const dx=P.x-m.x,dy=P.y-m.y,d=Math.hypot(dx,dy)||1;
  if(m.ca<=0&&d<450){m.x+=dx/d*85*dt;m.y+=dy/d*85*dt}
  m.x=cl(m.x,0,W);m.y=cl(m.y,0,H);
  if(d<m.r+16&&P.inv<=0){P.hp-=10;P.inv=.6;P.kx=dx/d*420;P.ky=dy/d*420;m.kx=-dx/d*260;m.ky=-dy/d*260;m.ca=.35}
 }
 R+=((atk?100:def?30:58)-R)*Math.min(1,dt*10);
 const act=prim.filter(Boolean);
 act.forEach(function(s,i){
  const T=PET[s.k];
  if(s.rl>0){s.rl-=dt;if(s.rl<=0){s.rl=0;s.hp=s.mx}}
  s.fl=Math.max(0,s.fl-dt);
  const ta=tm*2+i*6.2832/act.length;
  if(s.nw){s.a=ta;s.d=0;s.nw=0}
  let dd=ta-s.a;dd=Math.atan2(Math.sin(dd),Math.cos(dd));
  s.a+=dd*Math.min(1,dt*14);
  s.d+=(R-s.d)*Math.min(1,dt*9);
  s.sc+=((s.rl>0?0:1)-s.sc)*Math.min(1,dt*(s.rl>0?20:7));
  s.x=P.x+Math.cos(s.a)*s.d;s.y=P.y+Math.sin(s.a)*s.d;
  if(s.rl>0||s.sc<.5)return;
  const pr=(T.r+s.t*1.2)*s.sc;
  for(const m of mobs){
   if(m.inv>0)continue;
   if(Math.hypot(s.x-m.x,s.y-m.y)<m.r+pr){
    m.hp-=T.dmg*MUL[s.t];m.inv=.2;s.fl=.12;
    const ex=m.x-s.x,ey=m.y-s.y,l=Math.hypot(ex,ey)||1;
    m.kx=ex/l*170;m.ky=ey/l*170;
    s.hp-=6;if(s.hp<=0){s.hp=0;s.rl=T.rl;s.rm=T.rl}
   }
  }
 });
 const alive=[];
 for(const m of mobs){if(m.hp>0)alive.push(m);else{kills++;fx.push({x:m.x,y:m.y,t:.35})}}
 mobs=alive;
 if(P.hp<=0){P.hp=P.max;P.x=W/2;P.y=H/2;P.kx=0;P.ky=0;P.inv=1;mobs=[]}
 draw(atk,def,jp,G);
}
function circ(px,py,r,f,s,lw){x.fillStyle=f;x.beginPath();x.arc(px,py,r,0,6.2832);x.fill();if(s){x.strokeStyle=s;x.lineWidth=lw||3;x.stroke()}}
function draw(atk,def,jp,G){
 const cx=P.x-c.width/2,cy=P.y-c.height/2,X=c.width/2,Y=c.height/2;
 x.fillStyle='#1d4d38';x.fillRect(0,0,c.width,c.height);
 x.fillStyle='#2f8a5a';x.fillRect(-cx,-cy,W,H);
 x.strokeStyle='rgba(0,0,0,.1)';x.lineWidth=1;
 for(let g=0;g<=W;g+=100){x.beginPath();x.moveTo(g-cx,-cy);x.lineTo(g-cx,H-cy);x.stroke()}
 for(let g=0;g<=H;g+=100){x.beginPath();x.moveTo(-cx,g-cy);x.lineTo(W-cx,g-cy);x.stroke()}
 x.strokeStyle='#143';x.lineWidth=10;x.strokeRect(-cx,-cy,W,H);
 for(const q of fx){const f=1-q.t/.35;x.globalAlpha=1-f;x.strokeStyle='#fff';x.lineWidth=3;x.beginPath();x.arc(q.x-cx,q.y-cy,10+f*26,0,6.2832);x.stroke()}
 x.globalAlpha=1;
 for(const m of mobs){
  const mx=m.x-cx,my=m.y-cy;
  circ(mx,my,m.r,m.inv>0?'#fff':'#b5533c','#6e2a1c',3);
  circ(mx-5,my-3,3,'#000');circ(mx+5,my-3,3,'#000');
  x.fillStyle='#000';x.fillRect(mx-16,my-m.r-9,32,4);x.fillStyle='#e55';x.fillRect(mx-16,my-m.r-9,32*Math.max(0,m.hp/m.mx),4);
 }
 const flash=P.inv>0&&Math.floor(tm*20)%2;
 circ(X,Y,16,flash?'#ffb0b0':'#ffd84d','#b8962e',3);
 for(const sd of [-1,1]){
  const ex=X+sd*6,ey=Y-1;
  circ(ex,ey,2.8,'#000');
  const ox=ex+sd*5,ix=ex-sd*4;
  let oy=0,iy=0;
  if(atk){oy=ey-9;iy=ey-5}else if(def){oy=ey-5;iy=ey-9}
  if(atk||def){x.strokeStyle='#000';x.lineWidth=2;x.lineCap='round';x.beginPath();x.moveTo(ox,oy);x.lineTo(ix,iy);x.stroke()}
 }
 for(const s of prim){
  if(!s||s.sc<.03)continue;
  const T=PET[s.k],px=s.x-cx,py=s.y-cy,pr=(T.r+s.t*1.2)*s.sc;
  circ(px,py,pr,s.fl>0?'#fff':T.col,T.st,3);
  if(s.t>0){x.strokeStyle=TIERS[s.t].c;x.lineWidth=2;x.beginPath();x.arc(px,py,pr+3,0,6.2832);x.stroke()}
  if(s.hp<s.mx&&s.rl<=0){x.fillStyle='#000';x.fillRect(px-11,py-pr-8,22,4);x.fillStyle='#6f6';x.fillRect(px-11,py-pr-8,22*s.hp/s.mx,4)}
 }
 x.fillStyle='#000';x.fillRect(66,16,204,20);x.fillStyle='#6f6';x.fillRect(68,18,200*Math.max(0,P.hp/P.max),16);
 x.fillStyle='#fff';x.font='16px sans-serif';x.textAlign='left';x.fillText('Kills: '+kills,66,58);
 const s2=Math.min(46,Math.max(32,(c.width-300)/6)),x0=(c.width-5*(s2+6))/2,yP=c.height-s2-8,s3=s2*.7,yS=yP-s3-6;
 for(let i=0;i<5;i++){
  slot(x0+i*(s2+6),yP,s2,prim[i]);
  slot(x0+i*(s2+6)+(s2-s3)/2,yS,s3,sec[i]);
 }
 x.font='bold 14px sans-serif';x.textAlign='center';
 for(let i=0;i<toasts.length;i++){x.globalAlpha=Math.min(1,toasts[i].t);x.fillStyle='#fff';x.fillText(toasts[i].s,c.width/2,yS-14-i*20)}
 x.globalAlpha=1;
 for(const a of [[G.atk,atk,'ATTACK','#b33'],[G.def,def,'DEFEND','#2d6a9f'],[G.swp,false,'SWAP','#8a6a2a']]){
  x.globalAlpha=a[1]?.85:.5;circ(a[0].x,a[0].y,a[0].r,a[3],'rgba(0,0,0,.45)',3);
  x.globalAlpha=1;x.fillStyle='#fff';x.font='bold 13px sans-serif';x.textAlign='center';x.fillText(a[2],a[0].x,a[0].y+4);
 }
 for(const a of [[G.tal,'TAL'],[G.cra,'CRA'],[G.inv,'INV']]){
  x.globalAlpha=.7;circ(a[0].x,a[0].y,a[0].r,'#2a5a8a','rgba(0,0,0,.45)',3);
  x.globalAlpha=1;x.fillStyle='#fff';x.font='bold 12px sans-serif';x.textAlign='center';x.fillText(a[1],a[0].x,a[0].y+4);
 }
 x.globalAlpha=.4;circ(G.joy.x,G.joy.y,G.joy.r,'#000','rgba(255,255,255,.4)',3);
 let kx=G.joy.x,ky=G.joy.y;
 if(jp){const dx=jp.x-G.joy.x,dy=jp.y-G.joy.y,l=Math.hypot(dx,dy)||1,k=Math.min(l,G.joy.r)/l;kx+=dx*k;ky+=dy*k}
 x.globalAlpha=.85;circ(kx,ky,26,'#fff','rgba(0,0,0,.4)',3);x.globalAlpha=1;
}
function slot(sx,sy,sz,s){
 x.globalAlpha=.55;x.fillStyle='#000';x.fillRect(sx,sy,sz,sz);x.globalAlpha=1;
 x.strokeStyle=s?TIERS[s.t].c:'#666';x.lineWidth=2;x.strokeRect(sx,sy,sz,sz);
 if(!s)return;
 const T=PET[s.k];
 circ(sx+sz/2,sy+sz/2,sz*.28,T.col,T.st,2);
 if(s.rl>0){x.fillStyle='rgba(0,0,0,.6)';x.fillRect(sx,sy,sz,sz*Math.min(1,s.rl/(s.rm||1)))}
}
let last=0;
function frame(now){
 const dt=Math.min(.05,(now-(last||now))/1000);last=now;
 step(dt);requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.UIO_READY=true;
// END GAME
