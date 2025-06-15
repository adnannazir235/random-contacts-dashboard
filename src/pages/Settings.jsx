import { useEffect, useRef, useState } from "react";

export default function Settings({ setLocaldb }) {
  const dialogRef = useRef(null);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const handleDelete = () => {
    setLocaldb([]);
    closeDialog();
  };

  return (
    <>
      <div className="row justify-content-between mb-3">
        <div className="col-12">
          <h4>Settings</h4>
          <hr />
        </div>
      </div>

      <div className="row gap-4">
        <div className="col-12">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <label
              className="form-check-label user-select-none"
              htmlFor="darkModeSwitch"
            >
              Enable Dark Mode
            </label>
          </div>
        </div>

        <div className="col-12">
          <button className="btn btn-danger" onClick={openDialog}>
            Clear All Saved Contacts
          </button>

          <dialog
            ref={dialogRef}
            className="dialog-popup modal-theme text-center py-4 rounded-3 border-1"
            style={{ minWidth: "20%" }}
          >
            <p className="fs-4 pb-2">Are You Sure?</p>

            <div className="btn-group">
              <button className="btn btn-danger" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button className="btn btn-primary" onClick={closeDialog}>
                No, Don’t
              </button>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
}
