import { useState } from "react";
import { toast } from "react-toastify";

export default function RatingSystem({
  totalStars = 10,
  onCloseMovieDetails,
  onhandleAdd,
  onRating,
  isWatched,
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="bg-[#1c1c1c] py-3 px-2 rounded-xl md:w-[20vw] w-[50vw] text-white">
      {isWatched ? (
        <p className=" text-red text-[12px] text-center">
          This movie's review is submitted
        </p>
      ) : (
        <div className=" flex justify-center gap-0.5 md:gap-2">
          {Array.from({ length: totalStars }, (_, i) => {
            const value = i + 1;

            return (
              <span
                key={i}
                className={` md:text-2xl cursor-pointer transition-colors duration-200 
                  ${i <= rating ? "text-[#ffc107]" : "text-[#ffc107]"}`}
                onClick={() => {
                  setRating(value);
                  onRating(value);
                }}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(0)}
              >
                {value <= (hover || rating) ? "★" : "☆"}
              </span>
            );
          })}
        </div>
      )}

      {rating > 0 && (
        <>
          <p className="text-center text-[14px] font-bold">
            {rating ? `${rating}` : "No rating yet"}
          </p>
          <button
            className="w-full bg-primary text-text border-none rounded-full text-[1rem] p-2 mt-3 cursor-pointer transition-all duration-300 hover:bg-primary-light"
            onClick={() => {
              onhandleAdd();
              toast.success("Review submitted!");
              setRating(0);
              setHover(0);
              onCloseMovieDetails();
            }}
          >
            Add to Rate
          </button>
        </>
      )}
    </div>
  );
}
