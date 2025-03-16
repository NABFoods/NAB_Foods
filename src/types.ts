export type params = string | number;
import { Request, Response, NextFunction } from 'express';

export interface menu {
  getMenuItems: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  addMenuItem: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  updateMenuItem: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  deleteMenuItem: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}
