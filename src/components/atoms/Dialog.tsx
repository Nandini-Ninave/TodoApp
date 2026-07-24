import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

import {
  Dialog as DialogMUI,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "./Input";
import Button from "./Button";
import { add_todo, edit_todo } from "@utils/url";
import type { Dialog_Props, TodoForm } from "@utils/interface";
import { SnackbarProvider, useSnackbar, type VariantType } from 'notistack';
const initialState: TodoForm = {
  id: undefined,
  title: "",
  priority: "",
  status: "",
  dueDate: null,
};

const Dialog = ({ open, handleClose, todo }: Dialog_Props) => {
  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const [todoData, setTodoData] =
    useState<TodoForm>(initialState);

  useEffect(() => {
    // console.log(todo)
    if (todo) {
      setTodoData({
        id: todo.id,
        title: todo.title,
        priority: todo.priority,
        status: todo.status,
        dueDate: dayjs(todo.dueDate),
      });
    } else {
      setTodoData(initialState);
    }
  }, [todo]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setTodoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    e: SelectChangeEvent
  ) => {
    console.log(e.target.name, e.target.value)
    const { name, value } = e.target;

    setTodoData((prev) => ({
      ...prev,
      [name as string]: value,
    }))
  }
  const addMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(add_todo, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      handleClose();
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.put(
        `${edit_todo}/${data.id}`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      handleClose();
    },
  });

  const handleSubmit = () => {
    const task = {
      id: todoData.id,
      title: todoData.title,
      priority: todoData.priority,
      status: todoData.status,
      dueDate: todoData.dueDate
        ? todoData.dueDate.format("YYYY-MM-DD")
        : "",
    };

    console.log(task);

    if (todoData.id) {
      console.log("Updating");
      updateMutation.mutate(task);
    } else {
      console.log("Adding");
      addMutation.mutate(task);
    }
  };

  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DialogMUI
          open={open}
          onClose={handleClose}
          // fullWidth
          maxWidth="lg"
        >
          <DialogTitle>
            {todoData.id ? "Edit Todo" : "Add Todo"}
          </DialogTitle>

          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 2,
            }}
          >
            <Input
              id="title"
              name="title"
              value={todoData.title}
              placeholder="Enter Task Title"
              handleOnChange={handleInputChange}
              required
            />


            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>

              <Select
                name="priority"
                label="Priority"
                value={todoData.priority}
                onChange={handleSelectChange}
              >
                <MenuItem value="Low" >Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>


            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>

              <Select
                name="status"
                label="Status"
                value={todoData.status}
                onChange={handleSelectChange}
              >
                <MenuItem value="Completed" >Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
              </Select>
            </FormControl>

            <DatePicker
              label="Due Date"
              value={todoData.dueDate}
              onChange={(newValue) =>
                setTodoData((prev) => ({
                  ...prev,
                  dueDate: newValue,
                }))
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </DialogContent>

          <DialogActions>
            <Button
              label="Cancel"
              variant="outlined"
              handleOnClick={handleClose}
            />
             <SnackbarProvider />
            <Button
              disabled={(todoData.title).length === 0 ||
                (todoData.priority).length === 0 ||
                (todoData.status).length === 0
              }
              label={
                todoData.id
                  ? "Update Task"
                  : "Add Task"
              }
              variant="contained"
              handleOnClick={()=>{
                {todoData.id?enqueueSnackbar('Task Updated'):enqueueSnackbar('Task Added')}
              handleSubmit();}}
            />
          </DialogActions>
        </DialogMUI>
      </LocalizationProvider>
    </Fragment>
  );
};

export default Dialog

