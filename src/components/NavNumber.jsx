export default function NavNumber({ movies }) {
  return (
    <p className="hidden md:block text-text text-sm md:text-base">
      Found <strong>{movies?.length || 0}</strong> results
    </p>
  );
}
