export type params = string | number;
import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface Session {
    user?: { email: string };
  }
}
// Represents a product & its details/properties
export interface Product {
  img_url: string;
  id: number; // unique identifier for each product
  product_name: string;
  price: number;
  sold_out: boolean; // availability.  True if sold out.
  description: string;
  quantity?: number;
}
// used this put products inside of an array
interface OrderProduct {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  subtotal: number;
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
  products: OrderProduct[];
}

export type MenuPage = {
  categoryLink: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
  bgcol: string;
};

export interface Links {
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
  updateProduct: (
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
