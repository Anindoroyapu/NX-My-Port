type SidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Sidebar = ({
  activePage,
  setActivePage,
  isSidebarOpen,
  setSidebarOpen,
}: SidebarProps) => {
  const menuItems = [
    "Dashboard",
    "Orders",
    "Products",
    "Customers",
    "Analytics",
    "Settings",
  ];

  return (
    <>
      <aside
        className={`bg-slate-800 text-slate-100 w-64 fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 flex flex-col`}
      >
        <div className="p-6 text-center border-b border-slate-700">
          <h2 className="text-xl font-bold">Gemini Commerce</h2>
        </div>
        <nav className="flex-1 pt-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className={`block py-3.5 px-6 my-1 transition duration-200 ease-in-out border-l-4 ${
                    activePage === item
                      ? "bg-slate-700 border-blue-500 font-bold"
                      : "border-transparent hover:bg-slate-700"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActivePage(item);
                  }}
                  aria-current={activePage === item ? "page" : undefined}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
};
export default Sidebar;
