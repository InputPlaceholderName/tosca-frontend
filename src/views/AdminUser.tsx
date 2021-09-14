import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DefaultUser, FullUser } from "../api/users";
import { getUser } from "../api/users";
import AdminWorkspaceList from "../components/AdminWorkspaceList";
import Container from "../components/Container";
import Section from "../components/Section";
import { formatName } from "../util/user_util";

const AdminUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<FullUser>({
    ...DefaultUser,
    workspaces: [],
  });
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data } = await getUser(parseInt(id));
    setUser(data);
    setLoadingUser(false);
  };

  return loadingUser ? (
    <p>Loading</p>
  ) : (
    <Container>
      <Section title="User details">
        <div>
          Name:&nbsp;
          <span className="text-gray-500">{formatName(user)}</span>
        </div>
        <div>
          User ID:&nbsp;
          <span className="text-gray-500">{user.userId}</span>
        </div>
        <div>
          Last login:&nbsp;
          <span className="text-gray-500">
            {dayjs("").format("YYYY-MM-DD hh:mm")}
          </span>
        </div>
      </Section>
      <Section title="Workspaces">
        <AdminWorkspaceList workspaces={user.workspaces} />
      </Section>
    </Container>
  );
};

export default AdminUser;
