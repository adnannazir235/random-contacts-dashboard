import {
  getFormattedPhone,
  addUniqueContact,
  delUniqueContact,
} from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCheck,
  faTrash,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import DialogPopup from "./DialogPopup";

export default function UserCard({ user, localdb, setLocaldb, tags, setTags }) {
  const [selectedTags, setSelectedTags] = useState(user.tags ?? []);

  const name = user?.name?.first + " " + user?.name?.last;
  const email = user?.email;
  const gender = user?.gender;
  const country = user?.location?.country;
  const phone = getFormattedPhone(user);
  const age = user?.dob?.age;
  const isSaved =
    localdb && localdb.some((c) => c.login.uuid === user.login.uuid);

  const handleTags = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    let updatedTags = checked
      ? [...selectedTags, value]
      : selectedTags.filter((tag) => tag !== value);

    setSelectedTags(updatedTags);

    setLocaldb((prev) =>
      prev.map((u) =>
        u.login.uuid === user.login.uuid ? { ...u, tags: updatedTags } : u
      )
    );

    if (checked && !tags.includes(value)) {
      setTags((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    if (!localdb || !Array.isArray(localdb)) return;

    const updatedUser = localdb.find((u) => u.login.uuid === user.login.uuid);
    if (updatedUser) {
      setSelectedTags(updatedUser.tags || []);
    }
  }, [localdb, user.login.uuid]);

  return (
    <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
      <div className="card">
        <img
          src={user.picture.large}
          className="card-img-top"
          alt={name + "'s Photo"}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {isSaved !== undefined ? (
              email
            ) : (
              <div>
                <b>Tags:</b>{" "}
                {selectedTags.length > 0
                  ? selectedTags.join(", ")
                  : "No tags assigned"}
              </div>
            )}
          </li>
          <li className="list-group-item">
            <b>{isSaved !== undefined ? "Phone:" : "Gender:"}</b>{" "}
            {isSaved !== undefined
              ? phone
              : gender.replace(gender[0], gender[0].toUpperCase())}
          </li>
          <li className="list-group-item">
            <b>{isSaved !== undefined ? "Age:" : "Country:"}</b>{" "}
            {isSaved !== undefined ? age : country}
          </li>
        </ul>
        <div className="card-body">
          {isSaved !== undefined ? (
            <button
              className={
                !isSaved
                  ? "btn btn-outline-primary w-100 d-flex"
                  : "btn btn-success w-100 d-flex"
              }
              onClick={() => {
                setLocaldb((prev) => addUniqueContact(user, prev));
              }}
            >
              <span className="me-1">
                {isSaved ? "Saved" : "Save to My Contacts"}
              </span>
              <FontAwesomeIcon icon={isSaved ? faCheck : faCaretRight} />
            </button>
          ) : (
            <div className="btn-group w-100" role="group">
              <button
                className={
                  !isSaved
                    ? "btn btn-outline-danger d-flex w-50"
                    : "btn btn-danger d-flex w-50"
                }
                onClick={() => {
                  setLocaldb((prev) => delUniqueContact(user, prev));
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                type="button"
                popoverTarget={user.login.uuid}
                className="btn btn-outline-warning d-flex w-50"
              >
                <FontAwesomeIcon icon={faTags} />
              </button>
              <DialogPopup
                person={user}
                tags={tags}
                setTags={setTags}
                handleTags={handleTags}
                selectedTags={selectedTags}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
