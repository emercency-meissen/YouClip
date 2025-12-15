/* ===== PULSE SYSTEM ===== */
const pulses = {}; // videoId -> Set(IP)

app.post("/pulse", (req, res) => {
  const userIP =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const { videoId } = req.body;

  if (!pulses[videoId]) pulses[videoId] = new Set();

  if (pulses[videoId].has(userIP)) {
    return res.json({ ok: false, pulses: pulses[videoId].size });
  }

  pulses[videoId].add(userIP);

  res.json({ ok: true, pulses: pulses[videoId].size });
});

app.get("/pulse/:id", (req, res) => {
  const id = req.params.id;
  res.json({ pulses: pulses[id]?.size || 0 });
});
