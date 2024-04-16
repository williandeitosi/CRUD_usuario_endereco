-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "zip_code" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Number" INTEGER NOT NULL,
    "Neighborhood" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
