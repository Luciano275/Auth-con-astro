import type { ObjectId } from "mongoose"

export type Todo = {
  _id: ObjectId;
  user_id: number;
  title: string;
  description: string;
  date: Date;
}

export type StateErrors = {
  title?: string[];
  description?: string[];
}

export type StateForm = {
  errors?: StateErrors;
  message: string | null;
  success: boolean | null;
}