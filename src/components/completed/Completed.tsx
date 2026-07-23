import axios from "axios";
import Sidebar from "@atoms/sidemenu/Sidebar"
import { get_todo } from "@utils/url";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Todo } from "@utils/interface";
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
const Completed = () => {
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

    useEffect(() => {
        const filteredByToday = todo.filter((item) => (item.status == "Completed"))
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
    }))

    return (
        <div>
            <Sidebar />
            <h2 style={{ marginTop: '10px', marginLeft: '80px' }}>Completed</h2>
            <TableContainer component={Paper} sx={{ mt: 3, ml: 26, width: '75%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell>Priority</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Due Date</StyledTableCell>
                            {/* <TableCell align="center">Actions</TableCell> */}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filtered.map((todo) => (
                            <StyledTableRow key={todo.id}>
                                <StyledTableCell>{todo.title}</StyledTableCell>

                                <StyledTableCell>{todo.priority}</StyledTableCell>

                                <StyledTableCell>{todo.status}</StyledTableCell>

                                <StyledTableCell>{todo.dueDate}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default Completed