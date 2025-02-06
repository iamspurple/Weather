


const InputForm = ({handleSearch, city, setCity, loading}) => {
  return (
    <form  autoComplete='off'className="search-city-form" onSubmit={handleSearch}>
      <label>
        <input
            onChange={(e) => setCity(e.target.value)} 
            type="text" 
            name="city" id=""
            placeholder='Enter City...'
            required
            value={city}
            readOnly={loading}
        />
      </label>
   
      <button type='submit'>Search!</button>
  </form>
  )
}

export default InputForm
