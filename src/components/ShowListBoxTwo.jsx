export default function ShowListBoxTwo() {
  return (
    <>
      <div className="md:p-6 p-4 rounded-[0.9rem] bg-background-100 shadow-[0_1.2rem_2.4rem_rgba(0,0,0,0.2)] ">
        <h3 className="capitalize text-[16px] font-bold">Search History</h3>
      </div>
      <ul className="w-full flex flex-col gap-6 md:p-8 p-4">
        <li className="list-none flex items-center gap-4 md:gap-7 md:p-4 hover:bg-background-100">
          <img className="w-24 rounded-lg"
            src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
            alt="The Dark Knight poster"
          />
          <div className="flex flex-col md:gap-4 gap-2">
            <h3>Inception</h3>
            <p>2010</p>
          </div>
        </li>
      </ul>
    </>
  );
}
