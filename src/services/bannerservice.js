import * as bannerRepo from '../repositories/bannerRepository.js';

export async function getAllBanners(conn) {
  return await bannerRepo.getAllBanners(conn);
}
