export default function Search_Filter_Input({
  formValues,
  handleChange,
  isMyContacts = false,
}) {
  const datalistUsers =
    Array.isArray(formValues?.filtered) && formValues.filtered.length > 0
      ? formValues.filtered
      : formValues.people || [];

  return (
    <form
      className={
        !isMyContacts ? "col-auto" : "col-xs-12 col-sm-6 col-md-3 col-xl-auto"
      }
    >
      <div className="input-group">
        {!isMyContacts && (
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
        )}

        <input
          type="search"
          className="form-control w-25"
          id={!isMyContacts ? "nameEmailPhone" : "searchValue"}
          placeholder="e.g. John Doe"
          autoComplete="true"
          onChange={handleChange}
          value={
            formValues.inputs.searchValue === null
              ? ""
              : formValues.inputs.searchValue
          }
          list={isMyContacts ? "savedUsers" : "users"}
        />

        <datalist id={isMyContacts ? "savedUsers" : "users"}>
          {datalistUsers
            .filter(
              (person) => person?.name && person?.login?.uuid && person?.email
            )
            .map((person) => {
              const fullName = `${person.name.first} ${person.name.last}`;
              return (
                <option
                  key={person.login.uuid}
                  value={fullName}
                  label={person.email}
                />
              );
            })}
        </datalist>

        {!isMyContacts && (
          <select
            className="form-select"
            id="nat"
            defaultValue="Nationality"
            onChange={handleChange}
          >
            <option value="n/a">Nationality</option>
            <option value="AU">AU</option>
            <option value="BR">BR</option>
            <option value="CA">CA</option>
            <option value="CH">CH</option>
            <option value="DE">DE</option>
            <option value="DK">DK</option>
            <option value="ES">ES</option>
            <option value="FI">FI</option>
            <option value="FR">FR</option>
            <option value="GB">GB</option>
            <option value="IN">IN</option>
            <option value="IR">IR</option>
            <option value="MX">MX</option>
            <option value="NL">NL</option>
            <option value="NO">NO</option>
            <option value="NZ">NZ</option>
            <option value="RS">RS</option>
            <option value="TR">TR</option>
            <option value="UA">UA</option>
            <option value="US">US</option>
          </select>
        )}
      </div>
    </form>
  );
}
