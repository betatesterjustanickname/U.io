function drawTris(){
 const S=170,R=58,CR=10;
 const i0=Math.max(0,Math.floor((P.x-c.width/2-S)/S)),i1=Math.min(Math.floor(W/S),Math.ceil((P.x+c.width/2+S)/S));
 const j0=Math.max(0,Math.floor((P.y-c.height/2-S)/S)),j1=Math.min(Math.floor(H/S),Math.ceil((P.y+c.height/2+S)/S));
 x.lineJoin='round';
 x.fillStyle='#37935f';
 x.strokeStyle='#37935f';
 x.lineWidth=CR*2;
 for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++){
  const cx=(i+.5)*S,cy=(j+.5)*S;
  if(cx>W||cy>H)continue;
  const tilt=(20+((i*7+j*13)%11))*Math.PI/180;
  const rot=((i+j)%2?Math.PI:0)+tilt;
  x.beginPath();
  for(let k=0;k<3;k++){
   const a=rot+k*2.0944-1.5708;
   x.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);
  }
  x.closePath();
  x.fill();x.stroke();
 }
}
// END TRIS
