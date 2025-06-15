export default function MyContactsFilters({ formValues, tags, handleChange }) {
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  const contries = removeDuplicates(
    formValues.people.map((p) => {
      return p.location.country.toLowerCase();
    })
  );

  return (
    <form className="col-12 col-md-6 col-lg-5 col-xl-auto">
      <div className="input-group">
        <select
          className="form-select"
          id="tags"
          defaultValue="Tag"
          onChange={handleChange}
        >
          <option value="n/a">Tag</option>
          {tags.map((t, index) => (
            <option value={t.toLowerCase()} key={index}>
              {t}
            </option>
          ))}
        </select>

        <select
          className="form-select"
          id="gender"
          defaultValue="Gender"
          onChange={handleChange}
        >
          <option value="n/a">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          className="form-select"
          id="country"
          defaultValue="Country"
          onChange={handleChange}
        >
          <option value="n/a">Country</option>
          {contries.map((country, index) => {
            return (
              <option value={country} key={index}>
                {country.replace(country[0], country[0].toUpperCase())}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
}
