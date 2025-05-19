import * as transactionRepo from "../repositories/transactionRepository.js";
import * as userRepo from "../repositories/userRepository.js";
import * as serviceRepo from "../repositories/serviceRepository.js";
import { generateInvoice } from "../helpers/invoiceHelper.js";

export async function getBalanceByEmail(email, conn) {
  const balance = await userRepo.getBalanceByEmail(email, conn);
  if (balance === null) throw new Error("User balance tidak ditemukan");
  return balance;
}

export async function topUpBalance(email, amount, conn) {
  if (amount <= 0)
    throw new Error(
      "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
    );
  const balance = await userRepo.addBalance(email, Number(amount), conn);
  return balance;
}

export async function createTransaction(email, serviceCode, conn) {
  const user = await userRepo.getFullDataByEmail(email, conn);
  if (!user) throw { message: "User not found", status: 404, code: 101 };

  const service = await serviceRepo.getFullDataByCode(serviceCode, conn);
  if (!service)
    throw { message: "Layanan tidak ditemukan", status: 400, code: 104 };
  
  if (Number(user.balance) < Number(service.service_tarif)) {
    throw { message: "Saldo anda tidak mencukupi", status: 400, code: 105 };
  }
  
  const invoiceNumber = await generateInvoice();


  await userRepo.useBalance(email, Number(service.service_tarif), conn);
  return await transactionRepo.insertTransaction(user, service, invoiceNumber, conn);
}

export async function getTransactionHistory(email, limit = null, offset = null, conn) {
  const user = await userRepo.getFullDataByEmail(email, conn);
  if (!user) throw new Error("User not found");

  return await transactionRepo.getTransactionHistory(user.id, limit, offset, conn);
}
