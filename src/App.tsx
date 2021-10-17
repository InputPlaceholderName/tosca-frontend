import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";
import { useAuth, useUser } from "./context/AuthContext";
import Login from "./auth/Login";
import SetToken from "./auth/SetToken";
import { Settings } from "@mui/icons-material";
import Admin from "./views/Admin";
import AdminWorkspace from "./views/AdminWorkspace";
import {
  getCurrentUser,
  setAuthorization,
  setUnauthorizedHandler,
} from "./api/api-client";
import AdminUser from "./views/AdminUser";
import Workspaces from "./views/Workspaces";

const App = () => {
  const [token, setToken] = useAuth();
  const [user, setUser] = useUser();
  const history = useHistory();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setToken(null);
    });

    if (token !== null) {
      setAuthorization(token);

      (async () => {
        const { data } = await getCurrentUser();
        setUser(data);
      })();
    }
  }, [token]);

  return (
    <>
      {token !== null && user !== null ? (
        <>
          <AppBar position="static" color="primary">
            <Toolbar>
              <div className="flex w-full items-center">
                <Typography
                  onClick={() => history.push("/")}
                  className="text-lg flex-1 cursor-pointer"
                >
                  Tosca
                </Typography>
                {user.groups.includes("SuperUser") && (
                  <Button
                    onClick={() => history.push("/admin")}
                    variant="outlined"
                    startIcon={<Settings />}
                    className="text-white mr-4 ml-4"
                  >
                    Admin
                  </Button>
                )}
                <Typography className="flex-1 text-xs text-right">{`${user.firstName} ${user.lastName}`}</Typography>
              </div>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/" exact>
              <Workspaces />
            </Route>
            {user?.groups.includes("SuperUser") && (
              <>
                <Route path="/admin/workspaces/:id">
                  <AdminWorkspace />
                </Route>
                <Route path="/admin/users/:id">
                  <AdminUser />
                </Route>
                <Route path="/admin" exact>
                  <Admin />
                </Route>
              </>
            )}
          </Switch>
        </>
      ) : token !== null ? (
        <CircularProgress />
      ) : (
        <Switch>
          <Route path="/token">
            <SetToken />
          </Route>
          <Route>
            <Login />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default App;
