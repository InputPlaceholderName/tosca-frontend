import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../api/users";
import { getAllUsers } from "../api/users";
import Container from "../components/Container";
import { formatName } from "../util/user_util";

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showProgress, setShowProgress] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getUsers();

    const timeout = setTimeout(() => {
      if (loadingUsers) {
        setShowProgress(true);
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const getUsers = async () => {
    const { data } = await getAllUsers();
    data.sort((a, b) => formatName(a).localeCompare(formatName(b)));
    setUsers(data);
    setLoadingUsers(false);
    setShowProgress(false);
  };

  return loadingUsers ? (
    <>
      {showProgress && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  ) : (
    <Container>
      {users.map((user, key) => {
        return (
          <div
            key={key}
            className="cursor-pointer rounded-md shadow border p-2 mb-1"
            onClick={() => history.push(`/admin/users/${user.id}`)}
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div>{formatName(user)}</div>
              <div className="text-xs">
                Last login:&nbsp;
                <span className="text-gray-500 ">
                  {dayjs("").format("YYYY-MM-DD hh:mm")}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default AdminUsers;
