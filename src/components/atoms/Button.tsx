import { Button as MUIButton } from "@mui/material"
import type { ButtonProps } from "@utils/interface"

const Button = ({
    variant = "outlined",
    handleOnClick,
    disabled,
    sx,
    size,
    startIcon,
    endIcon,
    label,
    color
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
            color={color}
        > {label}</MUIButton >
    </>
}
export default Button