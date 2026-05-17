export default function NavSearch({ setOpen, quary }) {
  return (
    <input
      className="bg-primary-light text-text w-[clamp(8rem,50vw,25rem)] placeholder-text-dark rounded-lg py-3 px-4 transition-all duration-300 focus:outline-none focus:shadow-[0_38.4px_38.4px_rgba(0,0,0,0.1)]"
      type="text"
      defaultValue={quary}
      placeholder="Search movies"
      onClick={() => setOpen(true)}
    />
  );
}

