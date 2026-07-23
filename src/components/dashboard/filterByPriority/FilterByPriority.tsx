import { useEffect, useState } from "react"
import Dropdown from "@atoms/Dropdown"
import type { SelectChangeEvent } from "@mui/material"
import type { Todo } from "@utils/interface"
import axios from "axios"
import { get_todo } from "@utils/url"
import { useQuery } from "@tanstack/react-query"


const FilterByPriority = ({ priorityToDashboard }: any) => {
    const [filterByPriority, setFilterByPriority] = useState("")
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
    useEffect(() => {
        const filteredByStatus = todo.filter((item) => item.priority.toLowerCase() === filterByPriority.toLowerCase())
        if (filteredByStatus) {
            priorityToDashboard(filteredByStatus)
            // setPage(0);
        }
    }, [filterByPriority])

    const handleFilterByPriority = (e: SelectChangeEvent) => {
        setFilterByPriority(e.target.value)
    }

    return (
        <Dropdown
            title="Filter by priority"
            name="priority"
            value={todo.priority}
            label1="Medium"
            label2="High"
            label3="Low"
            handleOnChange={handleFilterByPriority}
            sx={{ width: 250, ml: 2, height: 10 }} />
    )
}
export default FilterByPriority