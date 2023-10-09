import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white  p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <div className="flex items-center text-xl font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-700 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-2">Stock Management System</span>
          </div>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link className="mr-5 hover:text-gray-900" href="/">
           Home
          </Link>
          <Link className="mr-5 hover:text-gray-900" href="/inventory">
           Inventory
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
