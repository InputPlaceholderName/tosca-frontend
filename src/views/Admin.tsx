import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminUsers from "./AdminUsers";
import AdminWorkspaces from "./AdminWorkspaces";

const Admin: React.FC = () => {
  const [tab, setTab] = useState(0);
  const storedTabKey = "adminTab";
  useEffect(() => {
    const storedTab = sessionStorage.getItem(storedTabKey) ?? "0";
    setTab(parseInt(storedTab));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(storedTabKey, tab.toString());
  }, [tab]);

  return (
    <>
      <Tabs
        className="mb-2"
        centered={true}
        value={tab}
        onChange={(_v, v) => setTab(v)}
      >
        <Tab label="Workspaces" />
        <Tab label="Users" />
        <Tab label="API-keys" />
      </Tabs>
      {tab == 0 && <AdminWorkspaces />}
      {tab == 1 && <AdminUsers />}
      {tab == 2 && <p>API-keys</p>}
    </>
  );
};

export default Admin;
