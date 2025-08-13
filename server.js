const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const remedies = {
  basic: {
    anxiety: [
      { herb: "Chamomile", usage: "Tea 2-3x daily" },
      { herb: "Lavender", usage: "Aromatherapy or tea" }
    ]
  },
  premium: {
    immunity: [
      { herb: "Elderberry", usage: "Syrup 1 tbsp daily" },
      { herb: "Echinacea", usage: "Tea at first sign of illness" }
    ]
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to HealBotanica API!");
});

app.get("/remedy", (req, res) => {
  const plan = req.query.plan?.toLowerCase();
  const condition = req.query.condition?.toLowerCase();
  const planData = remedies[plan];
  if (!planData || !condition) {
    return res.json({ error: "Please provide valid plan and condition." });
  }

  const data = planData[condition];
  if (data) {
    res.json({ condition, plan, remedies: data });
  } else {
    res.json({ error: "No remedies found." });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("HealBotanica API is live.")
);
