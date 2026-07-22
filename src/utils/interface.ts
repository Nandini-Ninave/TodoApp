import type { SxProps } from "@mui/material/styles";
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
    label?: string,
    variant?: "outlined" | "filled" | "standard",
    placeholder:string,
    sx?: SxProps,
    handleOnChange:React.ChangeEventHandler<HTMLInputElement>
}

export interface DialogProps{
    open:boolean,
    handleClose:any
}