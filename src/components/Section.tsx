import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Section: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="p-2 shadow rounded-md border mt-2">
      <div className="mb-4 text-gray-500">{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default Section;
