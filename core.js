window.UIO_READY=false;
const c=document.getElementById('c'),x=c.getContext('2d');
function rs(){c.width=innerWidth;c.height=innerHeight}rs();addEventListener('resize',rs);
const W=2400,H=2400;
function cl(v,a,b){return Math.max(a,Math.min(b,v))}
const TIERS=[{n:'Dust',c:'#9aa5a0'},{n:'Clay',c:'#c98f5a'},{n:'Jade',c:'#3fbf8f'},{n:'Amber',c:'#f0a030'},{n:'Void',c:'#7a4fd0'}];
const MUL=[1,2,4,8,16];
const PET={
 shard:{n:'Shard',dmg:8,hp:10,rl:2,col:'#e8f0ff',st:'#8aa0c0',r:9},
 pebble:{n:'Pebble',dmg:4,hp:40,rl:4,col:'#8a7f72',st:'#4e463c',r:13},
 spark:{n:'Spark',dmg:5,hp:6,rl:1.2,col:'#ffd84d',st:'#b8962e',r:7}
};
function mkp(k,t){const h=PET[k].hp*MUL[t];return{k:k,t:t,hp:h,mx:h,rl:0,rm:1,a:0,d:0,sc:0,fl:0,x:0,y:0,nw:1}}
let P={x:W/2,y:H/2,hp:100,max:100,kx:0,ky:0,inv:0,lx:1,ly:0};
let prim=[mkp('shard',0),mkp('shard',0),mkp('pebble',0),mkp('spark',0),mkp('spark',0)];
let sec=[mkp('shard',1),mkp('pebble',1),mkp('spark',1),mkp('shard',1),mkp('pebble',1)];
let mobs=[],fx=[],toasts=[],kills=0,tm=0,spawnT=0,R=58;
const ptrs=new Map(),keys={};
function toast(s){toasts.push({s:s,t:2});if(toasts.length>3)toasts.shift()}
function swap(){for(let i=0;i<5;i++){const a=prim[i];prim[i]=sec[i];sec[i]=a;if(prim[i])prim[i].nw=1}}
function geo(){const w=c.width,h=c.height;return{
 joy:{x:150,y:h-260,r:62},
 tal:{x:46,y:h-60,r:28},cra:{x:46,y:h-130,r:28},inv:{x:46,y:h-200,r:28},
 atk:{x:w-120,y:h-140,r:54},def:{x:w-235,y:h-90,r:42},swp:{x:w-85,y:h-260,r:34}}}
addEventListener('contextmenu',function(e){e.preventDefault()});
addEventListener('keydown',function(e){keys[e.code]=1;if(e.code==='KeyX'&&!e.repeat)swap()});
addEventListener('keyup',function(e){keys[e.code]=0});
addEventListener('pointerdown',function(e){
 const G=geo();let ty=null;
 const d=function(b){return Math.hypot(e.clientX-b.x,e.clientY-b.y)};
 if(d(G.swp)<=G.swp.r+8){swap();return}
 if(d(G.tal)<=G.tal.r+8){toast('Talents: coming soon');return}
 if(d(G.cra)<=G.cra.r+8){toast('Craft: coming soon');return}
 if(d(G.inv)<=G.inv.r+8){toast('Inventory: coming soon');return}
 if(d(G.atk)<=G.atk.r+8)ty='atk';
 else if(d(G.def)<=G.def.r+8)ty='def';
 else if(d(G.joy)<=G.joy.r*1.8)ty='joy';
 if(ty)ptrs.set(e.pointerId,{ty:ty,x:e.clientX,y:e.clientY});
});
addEventListener('pointermove',function(e){const q=ptrs.get(e.pointerId);if(q){q.x=e.clientX;q.y=e.clientY}});
addEventListener('pointerup',function(e){ptrs.delete(e.pointerId)});
addEventListener('pointercancel',function(e){ptrs.delete(e.pointerId)});
// END CORE
