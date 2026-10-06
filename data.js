// Rarities. Eternal and Unique have the same power.
const RAR = [
  ['Common','#7eef6d'],['Unusual','#ffe65d'],['Rare','#4d52e3'],
  ['Epic','#861fde'],['Legendary','#de1f1f'],['Mythic','#1fdbde'],
  ['Ultra','#ff2b75'],['Super','#2bffa3'],['Eternal','#ff9a3d'],
  ['Unique','#555555']
].map((r,i)=>({name:r[0],color:r[1],mult:Math.pow(3,Math.min(i,8))}));

// ADD NEW PETALS HERE. damage = base damage at Common rarity.
const PETALS = [
  {id:'basic', name:'Basic', damage:10, radius:10, cooldown:0.1}
];

// Stationary mobs. row = which row of the sandbox they stand in.
const MOB_DEFS = [
  {row:0,name:'Target Dummy',r:42,color:'#f2f2f2',kind:'dummy'},
  {row:0,name:'Ladybug',r:28,color:'#eb4034',kind:'bug'},
  {row:0,name:'Bee',r:28,color:'#ffe763',kind:'bug'},
  {row:0,name:'Rock',r:34,color:'#8a8a8a',kind:'rock'},
  {row:0,name:'Spider',r:30,color:'#4f412a',kind:'bug'},
  {row:0,name:'Hornet',r:26,color:'#ffd363',kind:'bug'},
  {row:0,name:'Beetle',r:36,color:'#8f5db0',kind:'bug'},
  {row:0,name:'Scorpion',r:32,color:'#c8a257',kind:'scorpion'},

  {row:1,name:'Baby Ant',r:18,color:'#555555',kind:'ant'},
  {row:1,name:'Worker Ant',r:24,color:'#555555',kind:'ant'},
  {row:1,name:'Soldier Ant',r:28,color:'#555555',kind:'ant'},
  {row:1,name:'Queen Ant',r:44,color:'#555555',kind:'ant',wings:true},

  {row:2,name:'Baby Fire Ant',r:18,color:'#ec7b3c',kind:'ant'},
  {row:2,name:'Worker Fire Ant',r:24,color:'#ec7b3c',kind:'ant'},
  {row:2,name:'Soldier Fire Ant',r:28,color:'#ec7b3c',kind:'ant'},
  {row:2,name:'Queen Fire Ant',r:44,color:'#ec7b3c',kind:'ant',wings:true},

  {row:3,name:'Baby Termite',r:18,color:'#e0b97a',kind:'ant'},
  {row:3,name:'Worker Termite',r:24,color:'#e0b97a',kind:'ant'},
  {row:3,name:'Soldier Termite',r:28,color:'#e0b97a',kind:'ant'},
  {row:3,name:'Termite Overmind',r:50,color:'#e0b97a',kind:'ant'}
];

const SLOT_COUNT = 8, WORLD = 1600, WINDOW = 3;
