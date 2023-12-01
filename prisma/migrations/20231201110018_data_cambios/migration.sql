-- CreateTable
CREATE TABLE "Contacto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "telefono" INTEGER NOT NULL,
    "relacion" TEXT NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "apellido" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "telefono" INTEGER NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "nombreOrganizacion" TEXT,
    "ubicacion" TEXT,
    "areVulnerable" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultadoCuestionario" (
    "id" SERIAL NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "respuestas" JSONB NOT NULL,
    "usuarioId" INTEGER,
    "usuarioNombre" TEXT NOT NULL DEFAULT 'Anónimo',

    CONSTRAINT "ResultadoCuestionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "areVulnerable" TEXT NOT NULL,

    CONSTRAINT "Organizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ubicacion" (
    "id" SERIAL NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ubicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Multimedia" (
    "id" SERIAL NOT NULL,
    "foto" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "longitud" DOUBLE PRECISION NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "estado" TEXT DEFAULT 'false',
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Multimedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modificacion" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER,
    "multimediaId" INTEGER,

    CONSTRAINT "Modificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "informacion" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "url" TEXT,
    "imagen" TEXT,
    "estado" TEXT DEFAULT 'false',

    CONSTRAINT "informacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoCuestionario" ADD CONSTRAINT "ResultadoCuestionario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Multimedia" ADD CONSTRAINT "Multimedia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modificacion" ADD CONSTRAINT "Modificacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modificacion" ADD CONSTRAINT "Modificacion_multimediaId_fkey" FOREIGN KEY ("multimediaId") REFERENCES "Multimedia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
