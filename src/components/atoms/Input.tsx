import { TextField } from "@mui/material"
import type { InputProps } from "../../utils/interface"

const Input = ({
    margin,
    autoFocus,
    required,
    id,
    label,
    variant = "outlined",
    placeholder,
    sx,
    name,
    value,
    handleOnChange
}: InputProps) => {
    return <>
        <TextField
            name={name}
            margin={margin}
            autoFocus={autoFocus}
            required={required}
            id={id}
            value={value}
            label={label}
            variant={variant}
            placeholder={placeholder}
            sx={sx}
            onChange={handleOnChange}></TextField>
    </>
}
export default Input