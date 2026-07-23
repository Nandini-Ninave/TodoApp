import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  styled,
  tableCellClasses,
  TablePagination,

} from "@mui/material";
import "./dashboard.css"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Button from "@atoms/Button";
import Dialog from "@atoms/Dialog";
import Sidebar from "@atoms/sidemenu/Sidebar";

import { get_todo } from "@utils/url";
import type { Todo } from "@utils/interface";
import Input from "@atoms/Input";
import DeleteModal from "./DeleteModal";
import FilterBystatus from "./filterByStatus/FilterByStatus";
import FilterByPriority from "./filterByPriority/FilterByPriority";
import Loader from "@atoms/loader/Loader";
import { SnackbarProvider } from "notistack";

const Dashboard = () => {

  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [todo, setTodo] = useState<Todo[]>([])
  const [searchInput, setsearchInput] = useState("")
  const [selectedTodo, setSelectedTodo] =
    useState<Todo | null>(null)


  const apicall = async () => {
    const { data } = await axios.get(get_todo);
    setTodo(data)
    return data;
  };

  const {
    isLoading,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: apicall
  });


  const handleDelete = (todo: Todo) => {
    console.log(todo)
    setSelectedTodo(todo)
    setDeleteOpen(true)
  }

  const handleEdit = (todo: Todo) => {
    console.log(todo)
    setSelectedTodo(todo)
    setOpen(true)
  }
const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

const handleSort = () => {
  const order = sortOrder === "asc" ? "desc" : "asc";
  setSortOrder(order);

  setTodo((prevTodo) =>
    [...prevTodo].sort((a, b) => {
      if (order === "asc") {
        return (
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
        );
      }

      return (
        new Date(b.dueDate).getTime() -
        new Date(a.dueDate).getTime()
      );
    })
  );
};
  const handleChangePage = (
  _event: unknown,
  newPage: number
) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

  useEffect(() => {
    const time = setTimeout(() => {
      if (searchInput.length > 0) {
        const filtered = todo.filter((item: any) => (item.title.toLowerCase().includes((searchInput.trim()).toLowerCase())))
        setTodo(filtered)
      }
      else {
        apicall()
      }
    }, 500)
    return () => {
      clearTimeout(time)
    }
  }, [searchInput])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchInput(e.target.value)
  }

  if (isLoading) {
    return <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
    <Loader />
  </h2>
  }

  const childToParentStatus = (childdata: any) => {
    setTodo(childdata);
  }
  const childToParentPriority = (priority: any) => {
    setTodo(priority);
  }

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
    <>
      <Sidebar />
      <div className="main">
        <Input
          placeholder="Search..."
          handleOnChange={handleSearch}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}

        />
        <Button
  label={sortOrder === "asc" ? "Latest First" : "Oldest First"}
  handleOnClick={handleSort}
/>
        <FilterBystatus childToParent={childToParentStatus} />
        <FilterByPriority priorityToDashboard={childToParentPriority} />
        <Button
          label="Add Todo"
          variant="contained"
          handleOnClick={() => {
            setSelectedTodo(null)
            setOpen(true)
          }}
          sx={{ ml: 5, height: '40px', width: '180px' }}
        />
      </div>
      <SnackbarProvider maxSnack={3}>
      <Dialog
        open={open}
        handleClose={() => setOpen(false)}
        todo={selectedTodo}
      />
      </SnackbarProvider>
      {/* <TablePagination
  component="div"
  count={todo.length}
  page={page}
  rowsPerPage={rowsPerPage}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  rowsPerPageOptions={[5, 10, 25]}
/> */}
      <TableContainer component={Paper} sx={{ mt: 3, ml: 26, width: '75%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Priority</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  .map((todo) => (
              <StyledTableRow key={todo.id}>
                <StyledTableCell>{todo.title.charAt(0).toUpperCase()+todo.title.slice(1)}</StyledTableCell>

                <StyledTableCell>{todo.priority}</StyledTableCell>

                <StyledTableCell>{todo.status}</StyledTableCell>

                <StyledTableCell>{todo.dueDate}</StyledTableCell>

                <StyledTableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(todo)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    // disabled={deleteMutation.isPending}
                    onClick={() => {
                      handleDelete(todo)
                    }
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                  <DeleteModal
                    open={deleteOpen}
                    handleClose={() => setDeleteOpen(false)}
                    todo={selectedTodo}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
         <TablePagination
    component="div"
    count={todo.length}
    page={page}
    rowsPerPage={rowsPerPage}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    rowsPerPageOptions={[5, 10, 25]}
  />
      </TableContainer>
    </>
  );
};

export default Dashboard;