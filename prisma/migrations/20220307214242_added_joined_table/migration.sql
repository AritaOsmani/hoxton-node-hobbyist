-- CreateTable
CREATE TABLE "Hobby" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserHobby" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "hobbyId" INTEGER NOT NULL,
    CONSTRAINT "UserHobby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserHobby_hobbyId_fkey" FOREIGN KEY ("hobbyId") REFERENCES "Hobby" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Hobby_name_key" ON "Hobby"("name");
