-- CreateTable
CREATE TABLE "AmountPerDay" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
