const Layout = ({ children }) => {
  return (
    <div
      id="layout"
      className="justify-center items-center flex bg-green-100 h-screen mt-15"
    >
      {children}
    </div>
  );
};

export default Layout;
