const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get("/respuesta", async (req, res) => {
  const responseData = await prisma.response.findMany({
    include: {
      tagResponse: true,
    },
  });
  res.send(responseData);
});

app.post("/respuesta", async (req, res) => {
  try {
    const responseData = await prisma.response.create({
      data: req.body,
    });
    res.json({
      message: "creado exitosamiente",
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({ error: "error al crear datos" + error });
  }
});

app.put("/respuesta/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const responseData = await prisma.response.update({
      where: {
        id,
      },
      data: req.body,
    });
    res.json({
      message: "actualizado de forma correcta ",
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({ error: "error actualizar datos" + error });
  }
});

app.delete("/respuesta/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const responseData = await prisma.response.delete({
    where: {
      id: id,
    },
  });
  res.json({
    message: "succesfully deleted",
    data: responseData,
  });
});

module.exports = app;
