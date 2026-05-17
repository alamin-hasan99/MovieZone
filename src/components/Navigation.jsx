export default function Navigation({ children }) {
  return (
    <nav className="bg-primary-bg h-24 flex items-center justify-between md:justify-evenly gap-2 md:gap-0 px-3 md:p-4">
      {children}
    </nav>
  );
}
