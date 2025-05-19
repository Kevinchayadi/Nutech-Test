import * as servicesRepo from '../repositories/serviceRepository.js';

export async function getAllServices(conn) {
  return await servicesRepo.getAllServices(conn);
}

