const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get("/pattern", async (req, res) => {
  const patternData = await prisma.pattern.findMany({
    include: {
      tagpatern: true,
    },
  });
  res.send(patternData);
});

app.post("/pattern", async (req, res) => {
  try {
    const patternData = await prisma.pattern.create({
      data: req.body,
    });
    res.json({
      message: "creado exitosamiente",
      data: patternData,
    });
  } catch (error) {
    res.status(500).json({ error: "error al crear datos" + error });
  }
});

app.put("/pattern/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const patternData = await prisma.pattern.update({
      where: {
        id,
      },
      data: req.body,
    });
    res.json({
      message: "actualizado de forma correcta ",
      data: patternData,
    });
  } catch (error) {
    res.status(500).json({ error: "error actualizar datos" + error });
  }
});

app.delete("/pattern/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const patternDeleted = await prisma.pattern.delete({
    where: {
      id: id,
    },
  });
  res.json({
    message: "succesfully deleted",
    data: patternDeleted,
  });
});

module.exports = app;
