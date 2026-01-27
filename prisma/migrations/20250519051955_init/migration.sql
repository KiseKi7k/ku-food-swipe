-- CreateTable
CREATE TABLE "Customer" (
    "customer_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "waitStatus" TEXT NOT NULL,
    "serviceStatus" TEXT NOT NULL,
    "Tip" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "CustomerCar" (
    "customercar_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "carType" TEXT NOT NULL,
    "carBrand" TEXT NOT NULL,
    "carColor" TEXT NOT NULL,
    "carMat" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerCar_pkey" PRIMARY KEY ("customercar_id")
);

-- CreateTable
CREATE TABLE "CustomerStatus" (
    "customerstatus_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "receiveCarTime" TIMESTAMP(3) NOT NULL,
    "finishTime" TIMESTAMP(3) NOT NULL,
    "deadlineTime" TIMESTAMP(3) NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerStatus_pkey" PRIMARY KEY ("customerstatus_id")
);

-- CreateTable
CREATE TABLE "Service" (
    "service_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "CustomerServices" (
    "customerservices_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerServices_pkey" PRIMARY KEY ("customerservices_id")
);

-- AddForeignKey
ALTER TABLE "CustomerCar" ADD CONSTRAINT "CustomerCar_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerStatus" ADD CONSTRAINT "CustomerStatus_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerServices" ADD CONSTRAINT "CustomerServices_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerServices" ADD CONSTRAINT "CustomerServices_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
