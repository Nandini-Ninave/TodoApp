import axios from "axios";
import Sidebar from "@atoms/sidemenu/Sidebar"
import { get_todo } from "@utils/url";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Todo } from "@utils/interface";
import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { styled } from '@mui/material/styles';

const Today = () => {
    const [todo, setTodo] = useState<Todo[]>([])
    const [filtered, setFiltered] = useState<Todo[]>([])
    const apicall = async () => {
        const { data } = await axios.get(get_todo);
        setTodo(data)
        return data;
    }
    useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: apicall
    })
    const date = new Date(Date.now())

    useEffect(() => {
        const filteredByToday = todo.filter((item) => ((String(item.createdAt).slice(8, 10)) == (String(date).slice(8, 10))))
        console.log(filteredByToday)
        setFiltered(filteredByToday)
    }, [todo])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <div>
            <Sidebar />
            <h2 className="heading">Today</h2>
            <TableContainer component={Paper} sx={{ mt: 3, ml: 26, width: '75%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="right">Priority</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Due Date</StyledTableCell>
                            
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filtered.length>0? filtered.map((todo) => (
                            <StyledTableRow key={todo.id}>
                                <StyledTableCell component="th" scope="row">
                                    {todo.title}
                                </StyledTableCell>
                                <StyledTableCell align="right">{todo.priority}</StyledTableCell>
                                <StyledTableCell align="right">{todo.status}</StyledTableCell>
                                <StyledTableCell align="right">{todo.dueDate}</StyledTableCell>
                            </StyledTableRow>
                        )):<h3>No todos</h3>}




                       
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}
export default Today