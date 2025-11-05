import { and, eq, ilike } from "drizzle-orm";
import { productsTable } from "../db";
import {
  ICreateProduct,
  ICSVSchema,
  IJwtUser,
  IUpdateProductBody,
} from "../schemas";
import { db, ERROR_RESPONSE } from "../utils";
import { CategoryRepository } from "./category.repository";
import fs from "fs";
import csv from "csv-parser";
export class ProductRepository {
  private user: IJwtUser;
  private readonly batch_size = 500;

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

  async bulkCreate(filepath: string) {
    try {
      const rows = await this.validateCSV(filepath);

      for (let i = 0; i < rows.length; i += this.batch_size) {
        const batch = rows.slice(i, i + this.batch_size);
        await db.insert(productsTable).values(batch);
      }

      return `${rows.length} products created`;
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

  async getAll(
    category_id: string | undefined,
    limit: string,
    offset: string,
    search: string | undefined
  ) {
    try {
      const take = parseInt(limit);
      const start = parseInt(offset);

      const filter = [eq(productsTable.created_by, this.user.id)];

      if (category_id) {
        filter.push(eq(productsTable.category_id, category_id));
      }

      if (search) {
        filter.push(ilike(productsTable.name, `%${search}%`));
      }

      const result = await db.query.productsTable.findMany({
        where: and(...filter),
        limit: take,
        offset: start,
      });

      return result;
    } catch (err) {
      throw err;
    }
  }

  async dowload(category_id: string | undefined): Promise<ICSVSchema[]> {
    try {
      const filter = [eq(productsTable.created_by, this.user.id)];

      if (category_id) {
        filter.push(eq(productsTable.category_id, category_id));
      }

      const result = await db.query.productsTable.findMany({
        where: and(...filter),
        columns: {
          category_id: false,
        },
        with: {
          category: {
            columns: {
              id: true,
              name: true,
            },
          },
          user: {
            columns: {
              email: true,
            },
          },
        },
      });

      const parsed = result.map((res) => {
        const data = {
          name: res.name,
          id: res.id,
          updated_at: res.updated_at,
          created_at: res.created_at,
          created_by: res.user.email,
          image: res.image || undefined,
          price: res.price,
          category_id: res.category.id,
          category_name: res.category.name,
        };
        return data;
      });

      return parsed;
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

  private async validateCSV(filepath: string): Promise<
    {
      name: string;
      price: number;
      category_id: string;
      created_by: string;
      updated_at: Date;
    }[]
  > {
    try {
      const categoryRepository = new CategoryRepository(this.user);
      const category_ids = await categoryRepository.getUserCategoryIds();

      return new Promise((resolve, reject) => {
        const valid_rows: any[] = [];
        const invalid_rows: any[] = [];
        fs.createReadStream(filepath)
          .pipe(csv())
          .on("data", (row) => {
            let { name, price, category_id } = row;
            if (!name) {
              invalid_rows.push({
                error: ERROR_RESPONSE.INVALID_PRODUCT_NAME,
                row,
              });
            } else if (!price || isNaN(Number(price))) {
              invalid_rows.push({
                error: ERROR_RESPONSE.INVALID_PRODUCT_PRICE,
                row,
              });
            } else if (!category_id || !category_ids.includes(category_id)) {
              invalid_rows.push({
                error: ERROR_RESPONSE.INVALID_PRODUCT_CATEOGORY_ID,
                row,
              });
            } else {
              const data = {
                name,
                price,
                category_id,
                created_by: this.user.id,
                updated_at: new Date(),
              };
              valid_rows.push(data);
            }
          })
          .on("end", () => {
            if (invalid_rows.length) {
              reject({
                message: ERROR_RESPONSE.CSV_CONTAINS_INVALID_ROWS.code,
              });
            }
            resolve(valid_rows);
          })
          .on("error", (err) => reject(err));
      });
    } catch (err) {
      throw err;
    }
  }
}
