import React, { useState, useEffect, useMemo,useContext } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { ToastContext } from "../Context/ToastContext";
// components libraries
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

const initialTodos = [
  {
    id: uuidv4(),
    title: "First Task ",
    details: "The Detail of above Task ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Second Task ",
    details: "The Detail of above Task ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Third Task ",
    details: "The Detail of above Task ",
    isCompleted: false,
  },
];

const TodoList = () => {
 
  const [todos, settodos] = useState(initialTodos);
  const [titleInput, settitleInput] = useState("");
  const [displayTask, setdisplayTask] = useState("all");
  const {showHideToast} = useContext(ToastContext);
  // dark mode
  const theme = useTheme();

  // event handler
  // check
  function handleCheckClick(todoid) {
    const updatedTodos = todos.map((t) => {
      if (t.id === todoid) {
        t.isCompleted = !t.isCompleted;
        if (t.isCompleted) {
        showHideToast("You've Done your Task");
      }
      }
      return t;
    });
    settodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
   

  }
  // delete
  function handleDeleteConfirm(confirmId) {
    const updatedTodos = todos.filter((t) => t.id !== confirmId);
    settodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
        showHideToast("You've deleted Task Successfully")

  }
  // update
  function handleUpdateConfirm(todoId, updatedTodo) {
    const updatedTodos = todos.map((t) =>
      t.id === todoId ? { ...t, ...updatedTodo } : t
    );

    settodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
        showHideToast("You've edit Task Successfully")

  }

  // add new todo
  function handleAddClick() {
    if (titleInput.trim() === "") {
      return;
    }

    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    settodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    settitleInput("");
    showHideToast("You add Task Successfully")
  }
  const actions = {
    handleCheck: handleCheckClick,
    deleteConfirm: handleDeleteConfirm,
    updateConfirm: handleUpdateConfirm,
  };

  // filteration arrays
  const completedTasks = useMemo(() => {
    return todos.filter((t) => {
   
      return t.isCompleted;
    });
  }, [todos]);

  const pendinTasks = useMemo(() => {
    return todos.filter((t) => {

      return !t.isCompleted;
    });
  }, [todos]);

  let taskRending = todos;

  if (displayTask === "completed") {
    taskRending = completedTasks;
  } else if (displayTask === "pending") {
    taskRending = pendinTasks;
  } else {
    taskRending = todos;
  }

  function displayChange(e) {
    setdisplayTask(e.target.value);
  }
  // map
  const todosJsx = taskRending.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        actions={actions}
        todos={todos}
        settodos={settodos}
      />
    );
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) {
      settodos(storageTodos);
      settodos(storageTodos);
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Card
        md={{ minWidth: 275 }}
        style={{
          maxHeight: "95vh",
          overflow: "scroll",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <CardContent>
          {/* Title */}
          <Typography
            variant="h2"
            color="secondary"
            sx={{
              textAlign: "center",
              mb: 2,
              fontSize: { xs: "1.5rem", sm: "2.5rem" }, // small on mobile
            }}
          >
            📝 My Todo-List
          </Typography>

          <Divider variant="fullWidth" />
          {/* Filter Buttons  */}
          <ToggleButtonGroup
            exclusive
            value={displayTask}
            onChange={displayChange}
            aria-label="text alignment"
            color="success"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              marginTop: "15px",
            }}
          >
            <ToggleButton value="all" sx={{ fontWeight: 800 }}>
              All
            </ToggleButton>
            <ToggleButton value="completed" sx={{ fontWeight: 800 }}>
              Completed
            </ToggleButton>
            <ToggleButton value="pending" sx={{ fontWeight: 800 }}>
              Pending
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Todos  */}
          {todosJsx}

          {/* input  */}
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "20px",
              flexDirection: { xs: "column", sm: "row" }, // stack on xs, row on sm+
            }}
          >
            {/* TextField */}
            <Grid item size={12} sm={8}>
              <TextField
                fullWidth
                label="Add Task Here"
                variant="outlined"
                value={titleInput}
                onChange={(e) => settitleInput(e.target.value)}
              />
            </Grid>

            {/* Button */}
            <Grid item size={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddClick}
                disabled={titleInput.length === 0}
                sx={{
                  height: { xs: "auto", sm: "100%" }, // taller on desktop
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TodoList;
