const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get("/modificacionuncluye", async (req, res) => {
  try {
    const modificaciones = await prisma.modificacion.findMany({
      include: {
        usuario: true,
        multimedia: true,
      },
    });
    res.json({
      message: "Successfully fetched",
      data: modificaciones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las modificaciones" });
  }
});

app.get("/modificacion/:usuarioId/:multimediaId", async (req, res) => {
  try {
    const { usuarioId, multimediaId } = req.params;
    const modificaciones = await prisma.modificacion.findMany({
      where: {
        usuarioId: usuarioId ? parseInt(usuarioId) : undefined,
        multimediaId: multimediaId ? parseInt(multimediaId) : undefined,
      },
      include: {
        usuario: true,
      },
    });
    res.json({
      message: "Successfully fetched",
      data: modificaciones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las modificaciones" });
  }
});

app.post("/modificacion/:usuarioId/:multimediaId", async (req, res) => {
  try {
    const { usuarioId, multimediaId } = req.params;
    const modificacion = await prisma.modificacion.create({
      data: {
        fecha: new Date(),
        usuarioId: usuarioId ? parseInt(usuarioId) : undefined,
        multimediaId: multimediaId ? parseInt(multimediaId) : undefined,
      },
    });
    res.json({
      message: "Successfully created",
      data: modificacion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la modificación" });
  }
});

app.delete("/modificacion/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const userUpdate = await prisma.modificacion.delete({
    where: {
      id,
    },
  });
  res.json({
    message: "successully delete",
    data: userUpdate,
  });
});



module.exports = app;
