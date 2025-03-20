export type params = string | number;
import { Request, Response, NextFunction } from 'express';

// Represents a product & its details/properties
export interface Product {
  img_url: string;
  id: number; // unique identifier for each product
  product_name: string;
  price: number;
  sold_out: boolean; // availability.  True if sold out.
  description: string;
}
export interface Order {
  order_id: number; // Update to match the field in your data
  order_date: string;
  order_status: string;
  order_price: string;
  pickup: boolean;
  customer_name?: string; // Optional, if exists
  address?: string; // Optional, if exists
  phone?: string; // Optional, if exists
  items: string[]; // Assuming it's an array of strings (you can adjust this type as needed)
}
export interface Link {
  id: number;
  link: string;
  name: string;
  icon?: string;
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
  toggleSoldOut: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

export interface order {
  createCheckout: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}
