import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-base-100 shadow-lg">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            DevBlog
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/write">Write</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
