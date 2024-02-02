const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get("/tag", async (req, res) => {
  const tagData = await prisma.tag.findMany({
  });
  res.send(tagData);
});

app.post("/tag", async (req, res) => {
  try {
    const tagData = await prisma.tag.create({
      data: req.body,
    });
    res.json({
      message: "creado exitosamiente",
      data: tagData,
    });
  } catch (error) {
    res.status(500).json({ error: "error al crear datos" + error });
  }
});

app.put("/tag/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const tagData = await prisma.tag.update({
      where: {
        id,
      },
      data: req.body,
    });
    res.json({
      message: "actualizado de forma correcta ",
      data: tagData,
    });
  } catch (error) {
    res.status(500).json({ error: "error actualizar datos" + error });
  }
});

app.delete("/tag/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const tagData = await prisma.tag.delete({
    where: {
      id: id,
    },
  });
  res.json({
    message: "succesfully deleted",
    data: tagData.data,
  });
});

module.exports = app;
