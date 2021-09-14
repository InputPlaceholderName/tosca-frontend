import { render, screen } from "@testing-library/react";
import Workspaces from "./views/Workspaces";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders learn react link", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Workspaces />
    </Router>
  );
  const header = screen.getByText(/Workspaces/i);
  expect(header).toBeInTheDocument();
});
