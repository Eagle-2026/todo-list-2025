import { render, screen, fireEvent, within } from "@testing-library/react";
import TodoList from "../components/TodoList";

// 1) check if user can type in input
test("user can type in input", () => {
  render(<TodoList />);

  const taskInput = screen.getByLabelText(/add task here/i); // find the input
  fireEvent.change(taskInput, { target: { value: "Buy milk" } }); // type something

  expect(taskInput.value).toBe("Buy milk"); // check input shows typed text
});

// 2) check if adding new todo works
test("adds a new todo on click", () => {
  render(<TodoList showHideToast={() => {}} />);

  const taskInput = screen.getByLabelText(/add task here/i);
  fireEvent.change(taskInput, { target: { value: "Buy milk" } }); // type task

  const addButton = screen.getByRole("button", { name: /add/i }); // find add button
  fireEvent.click(addButton); // click to add

  expect(screen.getByText("Buy milk")).toBeInTheDocument(); // task should appear
});

// 3) check if default todos show
test("shows default todos", () => {
  render(<TodoList />);

  const todos = screen.getAllByRole("heading", { level: 5 }); // titles
  const details = screen.getAllByRole("heading", { level: 6 }); // details

  expect(todos.length).toBeGreaterThan(0); // make sure there is at least one
  expect(details.length).toBeGreaterThan(0);
});

// 4) check if deleting todo works
test("deletes a todo when delete button clicked", () => {
  render(<TodoList showHideToast={() => {}} />);

  const firstTask = screen.getAllByRole("heading", { level: 5 })[0]; // pick first
  const deleteButtons = screen.getAllByLabelText("delete");
  fireEvent.click(deleteButtons[0]); // click delete

  const dialog = screen.getByRole("dialog"); // find dialog
  const confirmButton = within(dialog).getByText(/^Delete$/i); // confirm delete
  fireEvent.click(confirmButton);

  expect(firstTask).not.toBeInTheDocument(); // task should be gone
});

// 5) check if completing todo works
test("marks a todo as completed", () => {
  render(<TodoList showHideToast={() => {}} />);

  const firstTask = screen.getAllByRole("heading", { level: 5 })[0]; // pick first
  const checkButtons = screen.getAllByLabelText("checked");
  fireEvent.click(checkButtons[0]); // click to complete

  expect(firstTask).toHaveStyle("text-decoration: line-through"); // should be crossed
});
