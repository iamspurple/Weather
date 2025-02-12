import { CiLocationOn } from "react-icons/ci";

const InputForm = ({
  handleSearch,
  city,
  setCity,
  loading,
  setGetLocation,
}) => {
  return (
    <>
      <form
        autoComplete="off"
        className="search-city-form"
        onSubmit={handleSearch}
      >
        <label>
          <input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            name="city"
            id=""
            placeholder="Enter City..."
            required
            value={city}
            readOnly={loading}
          />
        </label>
        <button type="submit">Search!</button>
      </form>
      <div className="buttons">
        <button
          className="location-button"
          type="button"
          onClick={() => setGetLocation(true)}
        >
          <CiLocationOn /> Show weather in my location
        </button>
      </div>
    </>
  );
};

export default InputForm;
