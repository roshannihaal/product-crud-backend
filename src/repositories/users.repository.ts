import { db, ERROR_RESPONSE, hashPassword } from "../utils";
import { ISignup } from "../schemas";
import { usersTable } from "../db";
import { eq } from "drizzle-orm";

export class UserRepository {
  async create(data: ISignup) {
    try {
      if (data.password !== data.confirm_password) {
        throw new Error(
          ERROR_RESPONSE.PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH.code
        );
      }
      const existing = await this.get(data.email);
      if (existing) {
        throw new Error(ERROR_RESPONSE.USER_ALREADY_EXISTS.code);
      }

      const user = {
        email: data.email,
        password: hashPassword(data.password),
        updated_at: new Date(),
      };
      const result = await db.insert(usersTable).values(user).returning();
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  async get(email: string) {
    try {
      const result = await db.query.usersTable.findFirst({
        where: eq(usersTable.email, email),
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
}
