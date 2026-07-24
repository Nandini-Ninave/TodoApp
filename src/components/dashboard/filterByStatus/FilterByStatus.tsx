import { useEffect, useState } from "react"
import Dropdown from "@atoms/Dropdown"
import type { SelectChangeEvent } from "@mui/material"
import type { Todo } from "@utils/interface"
import axios from "axios"
import { get_todo } from "@utils/url"
import { useQuery } from "@tanstack/react-query"



const FilterBystatus=({childToParent}:any)=>{
    const [filterBystatus, setFilterByStatus] = useState("")
    const [todo, setTodo] = useState<Todo[]>([])
    const apicall = async () => {
        const { data } = await axios.get(get_todo);
        setTodo(data)
        return data;
    }
    useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: apicall
    })
    useEffect(()=>{
        const filteredByStatus = todo.filter((item)=>item.status.toLowerCase()===filterBystatus.toLowerCase())
        if(filteredByStatus){
            childToParent(filteredByStatus)
        }
    }, [filterBystatus])

    const handleFilterByStatus=(e: SelectChangeEvent)=>{
        setFilterByStatus(e.target.value)
    }
    return(
        <Dropdown 
          title="Filter by status" 
          name="status"
          id="demo-select-small"
          value={todo.status}
          label1="completed"
          label2="In progress"
          label3="Pending"
          handleOnChange={handleFilterByStatus}
          sx={{width:350, ml:2, height:10,
            '& .MuiSelect-select': {
                paddingTop: '6px',
                paddingBottom: '6px',
                },
                '& .MuiInputLabel-root': {
                fontSize: '0.85rem',
                }
          }}/>
    )
}
export default FilterBystatus