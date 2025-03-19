export type params = string | number;
import { Request, Response, NextFunction } from 'express';

// Represents a product & its details/properties
export interface Product {
    id: number;  // unique identifier for each product
    product_name: string;
    price: number;
    sold_out: boolean;  // availability.  True if sold out.
    description: string;
}

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
