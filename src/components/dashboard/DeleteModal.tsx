import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import type { Delete_Props } from '@utils/interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delete_todo } from '@utils/url';
import axios from 'axios';
import Button from '@atoms/Button';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteModal({open, handleClose, todo}:Delete_Props) {
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${delete_todo}/${id}`)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      })
      handleClose()
    },
  })
    
    const handleDelete=(id:number)=>{
        deleteMutation.mutate(id)
    }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this task
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            
          <Button 
            handleOnClick={handleClose} 
            label='No'/>    
          <Button 
            handleOnClick={()=>{handleDelete(todo?.id??.0)}}
            color="error" 
            label='Yes'
            variant='contained'
            />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
