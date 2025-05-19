import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#18192B] text-white shadow">
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl text-yellow-400">NewsHome</span>
        </div>
        {/* Navigation Links */}
        <ul className="flex items-center gap-8 font-medium">
          <li>
            <Link href="#" className="relative px-2 py-1">
              <span className="border-b-2 border-yellow-400 pb-1">Home</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-yellow-400 transition">News</Link>
          </li>
          <li>
            <Link href="#" className="hover:text-yellow-400 transition">About</Link>
          </li>
          <li>
            <Link href="#" className="hover:text-yellow-400 transition">Contact</Link>
          </li>
        </ul>
      </nav>
      {/* Hero Section */}
      <div className="relative bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="bg-[#18192b]/70 absolute inset-0" />
        <div className="relative max-w-2xl mx-auto px-4 py-15 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Stay informed!
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            <span className="text-yellow-400">Get the latest news</span> from all over the world.
          </h2>
        </div>
      </div>
    </header>
  );
}
