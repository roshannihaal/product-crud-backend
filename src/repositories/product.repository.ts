import { and, eq, ilike } from "drizzle-orm";
import { productsTable } from "../db";
import { ICreateProduct, IJwtUser, IUpdateProductBody } from "../schemas";
import { db, ERROR_RESPONSE } from "../utils";
import { CategoryRepository } from "./category.repository";

export class ProductRepository {
  private user: IJwtUser;

  constructor(user: IJwtUser) {
    this.user = user;
  }

  async create(data: ICreateProduct) {
    try {
      await this.validateCategory(data.category_id);
      const product = {
        ...data,
        created_by: this.user.id,
        updated_at: new Date(),
      };
      const result = await db.insert(productsTable).values(product).returning();
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  async get(id: string) {
    try {
      const result = await db.query.productsTable.findFirst({
        where: and(
          eq(productsTable.id, id),
          eq(productsTable.created_by, this.user.id)
        ),
        with: {
          category: true,
        },
      });
      if (!result) {
        throw new Error(ERROR_RESPONSE.PRODUCT_NOT_FOUND.code);
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

      const filter = [eq(productsTable.created_by, this.user.id)];

      if (search) {
        filter.push(ilike(productsTable.name, `%${search}%`));
      }

      const result = await db.query.productsTable.findMany({
        where: and(...filter),
        with: {
          category: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
        limit: take,
        offset: start,
      });

      return result;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, data: IUpdateProductBody) {
    try {
      await this.validateCategory(data.category_id);
      const product = {
        ...data,
        updated_at: new Date(),
      };

      const result = await db
        .update(productsTable)
        .set(product)
        .where(
          and(
            eq(productsTable.id, id),
            eq(productsTable.created_by, this.user.id)
          )
        )
        .returning();

      if (result.length === 0) {
        throw new Error(ERROR_RESPONSE.PRODUCT_NOT_FOUND.code);
      }

      return result;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string) {
    try {
      const result = await db
        .delete(productsTable)
        .where(
          and(
            eq(productsTable.id, id),
            eq(productsTable.created_by, this.user.id)
          )
        )
        .returning();
      if (result.length === 0) {
        throw new Error(ERROR_RESPONSE.PRODUCT_NOT_FOUND.code);
      }
    } catch (err) {
      throw err;
    }
  }

  private async validateCategory(category_id: string) {
    try {
      const categoryRepository = new CategoryRepository(this.user);
      await categoryRepository.get(category_id);
    } catch (err) {
      throw err;
    }
  }
}
