// Rarities (same as florr). Eternal and Unique have the same power.
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

// Stationary mobs / dummies
const MOB_DEFS = [
  {name:'Target Dummy', r:42, color:'#f2f2f2', kind:'dummy'},
  {name:'Ladybug', r:28, color:'#eb4034', kind:'bug'},
  {name:'Bee', r:28, color:'#ffe763', kind:'bug'},
  {name:'Rock', r:34, color:'#8a8a8a', kind:'rock'},
  {name:'Spider', r:30, color:'#4f412a', kind:'bug'},
  {name:'Hornet', r:26, color:'#ffd363', kind:'bug'},
  {name:'Beetle', r:36, color:'#8f5db0', kind:'bug'}
];

const SLOT_COUNT = 8, WORLD = 1600, WINDOW = 3;
