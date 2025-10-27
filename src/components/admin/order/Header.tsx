const Header = ({
  title,
  setSidebarOpen,
}: {
  title: string;
  setSidebarOpen: (open: boolean) => void;
}) => {
  return (
    <header className="p-4 sm:p-6 lg:p-8 flex justify-between items-center bg-slate-100 sticky top-0 z-20">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden mr-4 p-2 text-slate-800"
          aria-label="Open sidebar"
        >
          {/* FIX: Changed strokeWidth to be a number */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-slate-600">Welcome, Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="Admin user avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};
export default Header;
