const videoId = "video-1";

async function loadPulse(){
  const r = await fetch(API + "/pulse/" + videoId);
  const d = await r.json();
  pulseCount.textContent = d.pulses;
}

async function pulse(){
  const r = await fetch(API + "/pulse",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ videoId })
  });
  const d = await r.json();
  pulseCount.textContent = d.pulses;
}

loadPulse();
