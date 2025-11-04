import { and, eq, ilike } from "drizzle-orm";
import { categoriesTable } from "../db";
import { ICreateCategory, IJwtUser, IUpdateCategoryBody } from "../schemas";
import { db, ERROR_RESPONSE } from "../utils";

export class CategoryRepository {
  private user: IJwtUser;

  constructor(user: IJwtUser) {
    this.user = user;
  }

  async create(data: ICreateCategory) {
    try {
      const category = {
        ...data,
        created_by: this.user.id,
        updated_at: new Date(),
      };
      const result = await db
        .insert(categoriesTable)
        .values(category)
        .returning();
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  async get(id: string) {
    try {
      const result = await db.query.categoriesTable.findFirst({
        where: and(
          eq(categoriesTable.id, id),
          eq(categoriesTable.created_by, this.user.id)
        ),
      });
      if (!result) {
        throw new Error(ERROR_RESPONSE.CATEGORY_NOT_FOUND.code);
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getAll(limit: string, offset: string, search: string | undefined) {
    try {
      const take = parseInt(limit);
      const start = parseInt(offset);

      const filter = [eq(categoriesTable.created_by, this.user.id)];

      if (search) {
        filter.push(ilike(categoriesTable.name, `%${search}%`));
      }

      const result = await db.query.categoriesTable.findMany({
        where: and(...filter),
        limit: take,
        offset: start,
      });

      return result;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, data: IUpdateCategoryBody) {
    try {
      const category = {
        ...data,
        updated_at: new Date(),
      };

      const result = await db
        .update(categoriesTable)
        .set(category)
        .where(
          and(
            eq(categoriesTable.id, id),
            eq(categoriesTable.created_by, this.user.id)
          )
        )
        .returning();

      if (result.length === 0) {
        throw new Error(ERROR_RESPONSE.CATEGORY_NOT_FOUND.code);
      }

      return result;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string) {
    try {
      const result = await db
        .delete(categoriesTable)
        .where(
          and(
            eq(categoriesTable.id, id),
            eq(categoriesTable.created_by, this.user.id)
          )
        )
        .returning();
      if (result.length === 0) {
        throw new Error(ERROR_RESPONSE.CATEGORY_NOT_FOUND.code);
      }
    } catch (err) {
      throw err;
    }
  }
}
