export default function ShowListBoxBtn({shows, setShows }) {
  return (
    <button
        className="btn-toggle"
        onClick={() => setShows((shows) => !shows)}
      >
        {shows ? "-" : "+"}
      </button>
  )
}
