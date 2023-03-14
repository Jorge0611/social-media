import { Request, Response, query } from "express";

export interface TypedRequest<T> extends Request {
  body: T;
}
