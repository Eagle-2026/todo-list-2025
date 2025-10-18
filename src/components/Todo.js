import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// icons
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


const Todo = ({ todo, actions, todos, settodos }) => {
 
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [showUpdateDialog, setshowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({ title: "", details: "" });

  const { handleCheck, deleteConfirm, updateConfirm } = actions;
  // event handlers
  //check
  function handleCheckClick() {
    handleCheck(todo.id);
  }
  //delete dialog
  function handleDeleteClick() {
    setshowDeleteDialog(true);
  }
  function handleDeleteDialogClose() {
    setshowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    deleteConfirm(todo.id);
    setshowDeleteDialog(false);
  }
  //edit dialog

  function handleUpdateClick() {
    setshowUpdateDialog(true);
  }
  function handleUpdateDialogClose() {
    setshowUpdateDialog(false);
  }

  function handleUpdatedConfirm() {
    updateConfirm(todo.id, updatedTodo);
    setshowUpdateDialog(false);
  
  }

  return (
    <>
      {/* delete dialog  */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this item?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo this action after deleting the item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ fontWeight: "bold" }} onClick={handleDeleteConfirm}>
            Delete
          </Button>
          <Button
            style={{ fontWeight: "bold" }}
            onClick={handleDeleteDialogClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* edit dialog  */}
      <Dialog
        onClose={handleUpdateDialogClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to update this to-do?
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Title"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Details"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ fontWeight: "bold" }} onClick={handleUpdatedConfirm}>
            Edit
          </Button>
          <Button
            style={{ fontWeight: "bold" }}
            onClick={handleUpdateDialogClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        sx={{
          marginTop: 5,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#2c387e" : "#448aff",
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <CardContent>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>

            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={() => handleCheckClick()}
                className="iconButton"
                aria-label="checked"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="edit"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solide #1769aa 3px",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solide #b23c17 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
         
          </Grid>
        
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
