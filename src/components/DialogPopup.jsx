export default function DialogPopup({
  person,
  tags,
  handleTags,
  selectedTags,
}) {
  return (
    <dialog
      id={person.login.uuid}
      popover="auto"
      className="dialog-popup modal-theme p-4 text-center rounded-3"
    >
      <h4 className="mb-5">
        {person?.name?.first + " " + person?.name?.last}:
      </h4>

      <form onChange={handleTags}>
        {tags.map((t, index) => (
          <div className="form-check border" key={person.login.uuid + index}>
            <input
              className="form-check-input p-2"
              type="checkbox"
              value={t}
              id={person.login.uuid + index}
              checked={selectedTags.includes(t)}
              onChange={handleTags}
            />
            <label
              className="form-check-label w-100"
              htmlFor={person.login.uuid + index}
            >
              {t}
            </label>
          </div>
        ))}
      </form>
    </dialog>
  );
}
