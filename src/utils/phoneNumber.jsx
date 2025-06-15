export function formatPhoneNumber(phoneNumber) {
  if (phoneNumber) {
    if (phoneNumber.includes("(") || phoneNumber.includes(")")) {
      return phoneNumber.split(" ").join("").replace("(", "").replace(")", "");
    } else {
      return phoneNumber.split(" ").join("");
    }
  } else {
    return undefined;
  }
}

export function getFormattedPhone(user) {
  const cell = user?.cell;
  const phone = user?.phone;

  if (cell?.includes("(") && cell?.includes(")")) return cell;
  if (phone?.includes("(") && phone?.includes(")")) return phone;

  return cell || phone || "N/A";
}
