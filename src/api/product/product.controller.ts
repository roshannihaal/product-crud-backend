import { Request, Response, NextFunction } from "express";
import {
  ICreateProduct,
  IGetProduct,
  IPagination,
  IDeleteProduct,
  IUpdateProductBody,
  IUpdateProductParams,
  IGetProductImage,
  IGetAllProduct,
  IDownloadProduct,
} from "../../schemas";
import { ProductRepository } from "../../repositories";
import fs from "fs";
import path from "path";
import { ERROR_RESPONSE, writeCSV } from "../../utils";

export const create = async (
  req: Request<unknown, unknown, ICreateProduct>,
  res: Response,
  next: NextFunction
) => {
  const { body, user, file } = req;
  try {
    if (!user) {
      throw new Error();
    }
    if (file) {
      body.image = file.path;
    }

    const productRepository = new ProductRepository(user);
    const result = await productRepository.create(body);
    const response = {
      message: "Product created",
      data: {
        product: result,
      },
    };
    res.status(201).send(response);
  } catch (err) {
    next(err);
  }
};

export const createBulk = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, file } = req;
  try {
    if (!user) {
      throw new Error();
    }
    if (!file) {
      throw new Error(ERROR_RESPONSE.NO_FILE_UPLOADED.code);
    }
    const productRepository = new ProductRepository(user);
    const result = await productRepository.bulkCreate(file.path);
    const response = {
      message: result,
    };
    fs.unlinkSync(file.path);
    res.status(201).send(response);
  } catch (err) {
    next(err);
  }
};

export const get = async (
  req: Request<IGetProduct>,
  res: Response,
  next: NextFunction
) => {
  const { params, user } = req;
  try {
    if (!user) {
      throw new Error();
    }
    const productRepository = new ProductRepository(user);
    const result = await productRepository.get(params.id);
    const response = {
      message: "Product fetched",
      data: {
        product: result,
      },
    };
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (
  req: Request<unknown, unknown, unknown, IGetAllProduct>,
  res: Response,
  next: NextFunction
) => {
  const { query, user } = req;

  try {
    if (!user) {
      throw new Error();
    }

    const productRepository = new ProductRepository(user);
    const result = await productRepository.getAll(
      query.category_id,
      query.limit,
      query.offset,
      query.search,
      query.sort_by,
      query.sort_order
    );
    const response = {
      message: "Product fetched",
      data: {
        product: result,
      },
    };
    res.status(200).send(response);
  } catch (err) {
    throw err;
  }
};

export const getImage = async (
  req: Request<IGetProductImage>,
  res: Response,
  next: NextFunction
) => {
  const { params, user } = req;

  try {
    if (!user) {
      throw new Error();
    }
    const productRepository = new ProductRepository(user);
    const result = await productRepository.get(params.id);
    if (!result.image) {
      throw new Error(ERROR_RESPONSE.PRODUCT_IMAGE_NOT_FOUND.code);
    }
    const filePath = path.resolve(process.cwd(), result.image);

    if (!fs.existsSync(filePath)) {
      throw new Error(ERROR_RESPONSE.PRODUCT_IMAGE_NOT_FOUND.code);
    }
    res.sendFile(filePath);
  } catch (err) {
    next(err);
  }
};

export const download = async (
  req: Request<unknown, unknown, unknown, IDownloadProduct>,
  res: Response,
  next: NextFunction
) => {
  const { query, user } = req;

  try {
    if (!user) {
      throw new Error();
    }

    const productRepository = new ProductRepository(user);
    const result = await productRepository.dowload(query.category_id);
    let filepath = await writeCSV(result);
    if (!filepath) {
      throw new Error(ERROR_RESPONSE.CSV_GENERATION_FAILED.code);
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="products.csv"`);

    res.download(filepath, "products.csv", (err) => {
      if (err) {
        next(err);
      } else {
        fs.unlink(filepath, () => {});
      }
    });
  } catch (err) {
    throw err;
  }
};

export const update = async (
  req: Request<IUpdateProductParams, unknown, IUpdateProductBody>,
  res: Response,
  next: NextFunction
) => {
  const { params, body, user, file } = req;
  try {
    if (!user) {
      throw new Error();
    }
    if (file) {
      body.image = file.path;
    }

    const productRepository = new ProductRepository(user);
    const result = await productRepository.update(params.id, body);
    const response = {
      message: "Product updated",
      data: {
        product: result,
      },
    };
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (
  req: Request<IDeleteProduct>,
  res: Response,
  next: NextFunction
) => {
  const { params, user } = req;
  try {
    if (!user) {
      throw new Error();
    }
    const productRepository = new ProductRepository(user);
    await productRepository.delete(params.id);
    const response = {
      message: "Product deleted",
    };
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};
