import { useCallback, useEffect, useRef, useState } from "react";
import Search_Filter_Input from "../components/Search_Filter_Input";
import UserCard from "../components/UserCard";
import { formatPhoneNumber, getFormattedPhone } from "../utils";
import { useFormChangeHandler } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareRight } from "@fortawesome/free-solid-svg-icons";

export default function RandomUsers({ localdb, setLocaldb }) {
  const hasFetchedOnce = useRef(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    people: [],
    inputs: {
      searchValue: null,
      gender: "n/a",
      nat: "n/a",
    },
  });

  const fetchRandomUsers = useCallback(
    async (nunOfUsers = 10) => {
      setFetchError(null);
      setFormValues({
        ...formValues,
        inputs: { ...formValues.inputs, searchValue: null },
      });
      setIsLoading(true);
      try {
        const response = await fetch(
          import.meta.env.VITE_API_RANDOM_API_URL +
            "?" +
            `${
              formValues.inputs.nat === "n/a"
                ? ""
                : `nat=${formValues.inputs.nat.toLocaleLowerCase()}`
            }` +
            `${
              formValues.inputs.gender === "n/a"
                ? ""
                : `&gender=${formValues.inputs.gender}`
            }` +
            "&results=" +
            nunOfUsers
        );

        if (!response.ok) {
          throw response;
        }

        const fetchedContacts = await response.json();
        const usersData = fetchedContacts.results || [];

        setUsers(usersData);
        setFormValues({ ...formValues, people: usersData });
        return usersData;
      } catch (error) {
        // console.error("Error fetching random contacts:", error);
        setFetchError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [formValues]
  );

  useEffect(() => {
    if (!hasFetchedOnce.current) {
      fetchRandomUsers();
      hasFetchedOnce.current = true;
    }
  }, [fetchRandomUsers]);

  useEffect(() => {
    if (formValues.inputs.searchValue && formValues.inputs.searchValue !== "") {
      const filteredUsers = users.filter((person) => {
        const firstName = person?.name?.first;
        const lastName = person?.name?.last;
        const fullName = firstName + " " + lastName;
        const fullNameSpace = fullName.split(" ").join("");
        const email = person?.email;
        const formattedPhone = getFormattedPhone(person);
        const phone = formatPhoneNumber(formattedPhone);

        return (
          firstName
            ?.toLowerCase()
            .includes(formValues.inputs.searchValue.toLowerCase()) ||
          lastName
            ?.toLowerCase()
            .includes(formValues.inputs.searchValue.toLowerCase()) ||
          fullNameSpace
            ?.toLowerCase()
            .includes(formValues.inputs.searchValue.toLowerCase()) ||
          fullName
            ?.toLowerCase()
            .includes(formValues.inputs.searchValue.toLowerCase()) ||
          phone
            ?.toLowerCase()
            .includes(
              formatPhoneNumber(formValues.inputs.searchValue.toLowerCase())
            ) ||
          email
            ?.toLowerCase()
            .includes(formValues.inputs.searchValue.toLowerCase())
        );
      });

      setFilteredUsers(filteredUsers);
    } else {
      setFilteredUsers(users);
    }
  }, [formValues.inputs.searchValue, users]);

  const handleChange = useFormChangeHandler(setFormValues, {
    treatNAasEmpty: false,
  });

  return (
    <>
      <div
        className="row justify-content-between mb-5"
        style={{ rowGap: "1.5rem" }}
      >
        <div className="col-1">
          <h4>Users</h4>
        </div>

        <Search_Filter_Input
          formValues={formValues}
          handleChange={handleChange}
        />

        <div className="col-auto">
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              fetchRandomUsers();
            }}
          >
            {!isLoading ? (
              <span>
                Load New Users <FontAwesomeIcon icon={faCaretSquareRight} />
              </span>
            ) : (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="row row-gap-4">
        {fetchError && (
          <p>
            Couldn't fetch new users.
            <br />
            Error: {fetchError.message}
          </p>
        )}

        {filteredUsers[0] === null
          ? users.map((person) => (
              <UserCard
                user={person}
                key={person.login.uuid}
                localdb={localdb}
                setLocaldb={setLocaldb}
              />
            ))
          : filteredUsers.map((person) => (
              <UserCard
                user={person}
                key={person.login.uuid}
                localdb={localdb}
                setLocaldb={setLocaldb}
              />
            ))}
      </div>
    </>
  );
}
