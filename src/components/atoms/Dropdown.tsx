import { 
    FormControl,
    InputLabel,
    MenuItem,
    Select 
} from "@mui/material"
import type { DropdownProps } from "@utils/interface"


const Dropdown=({
    title,
    value,
    label1,
    label2,
    label3,
    handleOnChange,
    sx,
    id,
    name
}:DropdownProps)=>{
    return(
        <>
        <FormControl sx={sx} size="small">
              <InputLabel>{title}</InputLabel>

              <Select
                id={id}
                name={name}
                label={name}
                value={value}
                onChange={handleOnChange}
              >
                <MenuItem value={label1}>{label1}</MenuItem>
                <MenuItem value={label2}>{label2}</MenuItem>
                <MenuItem value={label3}>{label3}</MenuItem>
              </Select>
            </FormControl></>
    )
}
export default Dropdown