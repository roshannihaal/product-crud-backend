import { Request, Response, NextFunction } from "express";
import {
  ICreateProduct,
  IGetProduct,
  IPagination,
  IDeleteProduct,
  IUpdateProductBody,
  IUpdateProductParams,
} from "../../schemas";
import { ProductRepository } from "../../repositories";

export const create = async (
  req: Request<unknown, unknown, ICreateProduct>,
  res: Response,
  next: NextFunction
) => {
  const { body, user } = req;
  try {
    if (!user) {
      throw new Error();
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
  req: Request<unknown, unknown, unknown, IPagination>,
  res: Response,
  next: NextFunction
) => {
  const { query, user } = req;

  try {
    if (!user) {
      throw new Error();
    }

    const productRepository = new ProductRepository(user);
    const result = await productRepository.getAll(query.limit, query.offset);
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

export const update = async (
  req: Request<IUpdateProductParams, unknown, IUpdateProductBody>,
  res: Response,
  next: NextFunction
) => {
  const { params, body, user } = req;
  try {
    if (!user) {
      throw new Error();
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
