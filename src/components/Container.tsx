import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="ml-2 mr-2 xl:ml-64 xl:mr-64">{children}</div>
    </div>
  );
};

export default Container;
