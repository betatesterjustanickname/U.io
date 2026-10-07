// Rarities. mult scales damage AND hp (x3 per tier).
// Eternal and Unique have the same power.
const RAR = [
  ['Common','#7eef6d'],['Unusual','#ffe65d'],['Rare','#4d52e3'],
  ['Epic','#861fde'],['Legendary','#de1f1f'],['Mythic','#1fdbde'],
  ['Ultra','#ff2b75'],['Super','#2bffa3'],['Eternal','#ff9a3d'],
  ['Unique','#555555']
].map((r,i)=>({name:r[0],color:r[1],mult:Math.pow(3,Math.min(i,8))}));

// ADD NEW PETALS HERE (damage / hp = Common values).
// reload = seconds, SAME for every rarity.
// hit = seconds between two hits on the same target.
const PETALS = [
  {id:'basic', name:'Basic', damage:10, hp:10, reload:2.5, radius:10, hit:0.1}
];

const PLAYER_HP = 100; // PLACEHOLDER

// Sandbox mobs (stand still, never die). damage = contact damage.
// Ant values are real, the rest are PLACEHOLDERS.
const MOB_DEFS = [
  {row:0,name:'Target Dummy',r:42,color:'#f2f2f2',kind:'dummy',damage:0},
  {row:0,name:'Ladybug',r:28,color:'#eb4034',kind:'bug',damage:10},
  {row:0,name:'Bee',r:28,color:'#ffe763',kind:'bug',damage:50},
  {row:0,name:'Rock',r:34,color:'#8a8a8a',kind:'rock',damage:10},
  {row:0,name:'Spider',r:30,color:'#4f412a',kind:'bug',damage:15},
  {row:0,name:'Hornet',r:26,color:'#ffd363',kind:'bug',damage:50},
  {row:0,name:'Beetle',r:36,color:'#8f5db0',kind:'bug',damage:35},
  {row:0,name:'Scorpion',r:32,color:'#c8a257',kind:'scorpion',damage:15},
  {row:1,name:'Baby Ant',r:18,color:'#555555',kind:'ant',damage:5},
  {row:1,name:'Worker Ant',r:24,color:'#555555',kind:'ant',damage:10},
  {row:1,name:'Soldier Ant',r:28,color:'#555555',kind:'ant',damage:18},
  {row:1,name:'Queen Ant',r:44,color:'#555555',kind:'ant',damage:25,wings:true},
  {row:2,name:'Baby Fire Ant',r:18,color:'#ec7b3c',kind:'ant',damage:5},
  {row:2,name:'Worker Fire Ant',r:24,color:'#ec7b3c',kind:'ant',damage:10},
  {row:2,name:'Soldier Fire Ant',r:28,color:'#ec7b3c',kind:'ant',damage:18},
  {row:2,name:'Queen Fire Ant',r:44,color:'#ec7b3c',kind:'ant',damage:25,wings:true},
  {row:3,name:'Baby Termite',r:18,color:'#e0b97a',kind:'ant',damage:5},
  {row:3,name:'Worker Termite',r:24,color:'#e0b97a',kind:'ant',damage:10},
  {row:3,name:'Soldier Termite',r:28,color:'#e0b97a',kind:'ant',damage:18},
  {row:3,name:'Termite Overmind',r:50,color:'#e0b97a',kind:'ant',damage:25}
];

// Survival mobs (Common rarity). speed = pixels per second (PLACEHOLDER).
const SURV_MOBS = {
  baby:{name:'Baby Ant',r:18,color:'#555555',hp:15,damage:5,speed:150},
  worker:{name:'Worker Ant',r:24,color:'#555555',hp:30,damage:10,speed:110},
  soldier:{name:'Soldier Ant',r:28,color:'#555555',hp:60,damage:18,speed:130},
  queen:{name:'Queen Ant',r:44,color:'#555555',hp:250,damage:25,speed:70,wings:true}
};

const SLOT_COUNT = 8, WORLD = 1600, SURV_WORLD = 1200, WINDOW = 3;
