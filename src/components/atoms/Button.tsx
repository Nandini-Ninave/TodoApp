import { Button as MUIButton } from "@mui/material"
import type { ButtonProps } from "../../utils/interface"

const Button = ({
    variant = "outlined",
    handleOnClick,
    disabled,
    sx,
    size,
    startIcon,
    endIcon,
    label
}: ButtonProps) => {
    return <>
        <MUIButton
            variant={variant}
            onClick={handleOnClick}
            disabled={disabled}
            sx={sx}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
        > {label}</MUIButton >
    </>
}
export default Button