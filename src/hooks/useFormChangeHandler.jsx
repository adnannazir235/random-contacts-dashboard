export const useFormChangeHandler = (setFormValues, options = {}) => {
  const { treatNAasEmpty = true, idMap = {} } = options;

  const handleChange = (event) => {
    const { id, value } = event.target;

    const keyMap = {
      nameEmailPhone: "searchValue",
      searchValue: "searchValue",
      gender: "gender",
      nat: "nat",
      country: "country",
      tags: "tags",
      ...idMap,
    };

    const key = keyMap[id];

    if (!key) {
      alert("Error in code! Can't determine the Event Target Element...");
      return;
    }

    const val = value === "n/a" && treatNAasEmpty ? "" : value;

    setFormValues((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [key]: val,
      },
    }));
  };

  return handleChange;
};
