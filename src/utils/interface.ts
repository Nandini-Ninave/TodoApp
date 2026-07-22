import type { SxProps } from "@mui/material/styles";
import type { Dayjs } from "dayjs";
import type { ReactNode } from "react";

export interface ButtonProps {
    variant?: "outlined" | "contained" | "text",
    label?: string,
    disabled?: boolean,
    color?: string,
    handleOnClick: React.MouseEventHandler<HTMLButtonElement>  ,
    sx?: SxProps,
    size?: "small" | "medium" | "large",
    startIcon?: ReactNode,
    endIcon?: ReactNode
}
export interface InputProps{
    margin?:"dense" | "normal" | "none"
    autoFocus?: boolean
    required?: boolean
    id?: string,
    name?:string
    value?:any
    label?: string,
    variant?: "outlined" | "filled" | "standard",
    placeholder:string,
    sx?: SxProps,
    handleOnChange:React.ChangeEventHandler<HTMLInputElement>
}

export interface Todo {
  id?: number;
  title: string;
  priority: string;
  status: string;
  dueDate: string;
}

export interface TodoForm {
  id?: number;
  title: string;
  priority: string;
  status: string;
  dueDate: Dayjs | null;
}

export interface Dialog_Props {
  open: boolean;
  handleClose: () => void;
  todo: Todo | null;
}