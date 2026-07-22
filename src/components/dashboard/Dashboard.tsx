import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useState } from "react";
import axios from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import Button from "../atoms/Button";
import Dialog from "../atoms/Dialog";
import Sidebar from "../atoms/sidemenu/Sidebar";

import { delete_todo, get_todo } from "../../utils/url";
import type { Todo } from "../../utils/interface";

const Dashboard = () => {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [selectedTodo, setSelectedTodo] =
    useState<Todo | null>(null)

  const {
    data: todos = [],
    isLoading,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axios.get(get_todo)
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${delete_todo}/${id}`)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task"
    );

    if (confirmDelete) {
      deleteMutation.mutate(id)
    }
  };

  const handleEdit = (todo: Todo) => {
    console.log(todo);
    setSelectedTodo(todo);
    setOpen(true);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Sidebar />

      <Button
        label="Add Todo"
        variant="contained"
        handleOnClick={() => {
          setSelectedTodo(null)
          setOpen(true)
        }}
      />

      <Dialog
        open={open}
        handleClose={() => setOpen(false)}
        todo={selectedTodo}
      />

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.title}</TableCell>

                <TableCell>{todo.priority}</TableCell>

                <TableCell>{todo.status}</TableCell>

                <TableCell>{todo.dueDate}</TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(todo)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    disabled={deleteMutation.isPending}
                    onClick={() =>
                      handleDelete(todo.id!)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Dashboard;