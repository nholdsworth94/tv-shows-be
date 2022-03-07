-- CreateTable
CREATE TABLE "MyShow" (
    "showId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "watched" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MyShow_showId_userId_key" ON "MyShow"("showId", "userId");
