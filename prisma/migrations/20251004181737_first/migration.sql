-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'CHRISTIAN', 'CATHOLIC', 'HINDU', 'BUDDHA', 'KONGHUCU', 'OTHER');

-- CreateEnum
CREATE TYPE "KeadaanOrtu" AS ENUM ('LENGKAP', 'YATIM', 'PIATU', 'YATIM_PIATU');

-- CreateEnum
CREATE TYPE "StatusKeluarga" AS ENUM ('ANAK_KANDUNG', 'ANAK_TIRI', 'ANAK_ANGKAT');

-- CreateEnum
CREATE TYPE "TinggalBersama" AS ENUM ('ORANG_TUA', 'KAKEK_NENEK', 'PAMAN_BIBI', 'SAUDARA_KANDUNG', 'KERABAT', 'PANTI_PONTREN', 'LAINNYA');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A', 'B', 'AB', 'O', 'UNKNOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "nisn" TEXT,
    "nik" TEXT,
    "asalSekolah" TEXT,
    "gender" "Gender" NOT NULL,
    "tempatLahir" TEXT,
    "tanggalLahir" TIMESTAMP(3),
    "agama" "Religion",
    "keadaanOrtu" "KeadaanOrtu",
    "statusKeluarga" "StatusKeluarga",
    "anakKe" INTEGER,
    "dariBersaudara" INTEGER,
    "tinggalBersama" "TinggalBersama",
    "tinggalBersamaLainnya" TEXT,
    "kewarganegaraan" TEXT,
    "alamatJalan" TEXT,
    "rt" TEXT,
    "rw" TEXT,
    "desaKel" TEXT,
    "kecamatan" TEXT,
    "kabupaten" TEXT,
    "provinsi" TEXT,
    "kodePos" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "bloodType" "BloodType",
    "beratKg" INTEGER,
    "tinggiCm" INTEGER,
    "riwayatPenyakit" TEXT,
    "parentId" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fatherName" TEXT,
    "fatherEducation" TEXT,
    "fatherJob" TEXT,
    "fatherIncome" TEXT,
    "motherName" TEXT,
    "motherEducation" TEXT,
    "motherJob" TEXT,
    "motherIncome" TEXT,
    "parentEmail" TEXT,
    "waliName" TEXT,
    "alamatOrtuWali" TEXT,
    "noHpOrtuWali" TEXT,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_nisn_key" ON "Student"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Student_nik_key" ON "Student"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Student_parentId_key" ON "Student"("parentId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
