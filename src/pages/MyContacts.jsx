import { useEffect, useState } from "react";
import Search_Filter_Input from "../components/Search_Filter_Input";
import UserCard from "../components/UserCard";
import { useFormChangeHandler, useLocalStorage } from "../hooks";
import MyContactsFilters from "../components/MyContactsFilters";

export default function MyContacts({ localdb, setLocaldb }) {
  const [tags, setTags] = useLocalStorage("myTags", [
    "Friend",
    "Colleague",
    "Important",
  ]);
  const [formValues, setFormValues] = useState({
    people: localdb,
    filtered: localdb,
    inputs: {
      searchValue: null,
      country: "",
      gender: "",
      tags: "",
    },
  });

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      people: localdb,
    }));
  }, [localdb]);

  useEffect(() => {
    const {
      searchValue,
      country,
      gender,
      tags: selectedTag,
    } = formValues.inputs;

    const filteredUsers = formValues.people.filter((person) => {
      const name = `${person.name.first} ${person.name.last}`.toLowerCase();
      const matchesName =
        !searchValue || name.includes(searchValue.toLowerCase());

      const matchesCountry =
        !country || person.location.country.toLowerCase() === country;

      const matchesGender = !gender || person.gender.toLowerCase() === gender;

      const matchesTag =
        !selectedTag ||
        (person.tags &&
          person.tags.some(
            (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
          ));

      return matchesName && matchesCountry && matchesGender && matchesTag;
    });

    setFormValues((prev) => ({
      ...prev,
      filtered: filteredUsers,
    }));
  }, [formValues.inputs, formValues.people]);

  const handleChange = useFormChangeHandler(setFormValues);

  return (
    <>
      <div
        className="row justify-content-between mb-5"
        style={{ rowGap: "1.5rem" }}
      >
        <div className="col-xs-12 col-sm-6 col-md-3 col-xl-auto">
          <h4>My Contacts</h4>
        </div>

        <Search_Filter_Input
          formValues={formValues}
          isMyContacts={true}
          handleChange={handleChange}
        />

        <MyContactsFilters
          formValues={formValues}
          tags={tags}
          handleChange={handleChange}
        />
      </div>

      <div className="row row-gap-4">
        {formValues.filtered.map((user) => (
          <UserCard
            user={user}
            key={user.login.uuid}
            setLocaldb={setLocaldb}
            tags={tags}
            setTags={setTags}
          />
        ))}
      </div>
    </>
  );
}
