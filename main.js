function loop(t){
  const dt=Math.min(.05,(t-last)/1000||0); last=t;
  if(running) update(dt);
  draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
