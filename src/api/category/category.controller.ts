import { Request, Response, NextFunction } from "express";
import { ICreateCategory, IGetCategory, IPagination } from "../../schemas";
import { CategoryRepository } from "../../repositories";
import {
  IDeleteCategory,
  IUpdateCategoryBody,
  IUpdateCategoryParams,
} from "../../schemas/category.schema";

export const create = async (
  req: Request<unknown, unknown, ICreateCategory>,
  res: Response,
  next: NextFunction
) => {
  const { body, user } = req;
  try {
    if (!user) {
      throw new Error();
    }
    const categoryRepository = new CategoryRepository(user);
    const result = await categoryRepository.create(body);
    const response = {
      message: "Category created",
      data: {
        category: result,
      },
    };
    res.status(201).send(response);
  } catch (err) {
    next(err);
  }
};

export const get = async (
  req: Request<IGetCategory>,
  res: Response,
  next: NextFunction
) => {
  const { params, user } = req;
  try {
    if (!user) {
      throw new Error();
    }
    const categoryRepository = new CategoryRepository(user);
    const result = await categoryRepository.get(params.id);
    const response = {
      message: "Category fetched",
      data: {
        category: result,
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

    const categoryRepository = new CategoryRepository(user);
    const result = await categoryRepository.getAll(query.limit, query.offset);
    const response = {
      message: "Category fetched",
      data: {
        category: result,
      },
    };
    res.status(200).send(response);
  } catch (err) {
    throw err;
  }
};

export const update = async (
  req: Request<IUpdateCategoryParams, unknown, IUpdateCategoryBody>,
  res: Response,
  next: NextFunction
) => {
  const { params, body, user } = req;
  try {
    if (!user) {
      throw new Error();
    }
    const categoryRepository = new CategoryRepository(user);
    const result = await categoryRepository.update(params.id, body);
    const response = {
      message: "Category updated",
      data: {
        category: result,
      },
    };
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (
  req: Request<IDeleteCategory>,
  res: Response,
  next: NextFunction
) => {
  const { params, user } = req;
  try {
    if (!user) {
      throw new Error();
    }
    const categoryRepository = new CategoryRepository(user);
    await categoryRepository.delete(params.id);
    const response = {
      message: "Category updated",
    };
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};
