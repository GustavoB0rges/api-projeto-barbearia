import bcrypt from "bcryptjs";

export class EncryptService {
  constructor() {}

  static async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async comparePassword(password: string, receivedPassword: string) {
    return await bcrypt.compare(password, receivedPassword);
  }
}
