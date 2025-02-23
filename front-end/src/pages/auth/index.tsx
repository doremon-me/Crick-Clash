import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h2 className="text-center text-lg">
          Welcome to{" "}
          <strong className="text-primary">Crick Clash&#128075;</strong>
        </h2>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
