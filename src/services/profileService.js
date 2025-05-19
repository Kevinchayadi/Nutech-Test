import * as userRepo from '../repositories/userRepository.js';
import config from '../config/index.js';

export async function getProfileByEmail(email,conn) {
  const profile = await userRepo.findUserByEmail(email, conn, conn);
  if (!profile) throw new Error("Profile tidak ditemukan");
  return profile;
}

export async function updateProfile(email, data, conn) {
  return await userRepo.updateUserByEmail(email, data, conn);
}

export async function updateProfileImage(email, imageName,conn) {
  const profile = await userRepo.updateImageByEmail(email, imageName, conn);
  const url = config().app.url;
  const profile_image = url+'/'+profile.profile_image;
  return profile_image;
}
