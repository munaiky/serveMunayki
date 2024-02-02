const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get("/history", async (req, res) => {
  const dataH = await prisma.historialIncidente.findMany({
    include: {
      usuario: true,
      multimedia: true,
    },
  });
  res.send(dataH);
});

app.post("/history", async (req, res) => {
  const history = await prisma.historialIncidente.create({
    data: req.body,
  });
  res.json({
    message: "historial creado",
    data: history,
  });
});

module.exports = app;
