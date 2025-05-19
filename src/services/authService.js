import * as userRepo from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export async function registerUser(data, conn) {
  
  const existingUser = await userRepo.findUserByEmail(data.email,conn);
  if (existingUser) {
    throw new Error('Email already registered');
  }


  const hashedPassword = await bcrypt.hash(data.password, 10);

  await userRepo.createUser({email: data.email, password: hashedPassword, firstName: data.first_name, lastName: data.last_name }, conn);

}

export async function loginUser({ email, password }, conn) {
  const user = await userRepo.getFullDataByEmail(email,conn);

  if (!user) {
    return null;
  }
  
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return null;
  } 

  const token = jwt.sign({ email: user.email }, config().app.jwtSecret , {
    expiresIn: '12h',
  });

  return  token ;
}
