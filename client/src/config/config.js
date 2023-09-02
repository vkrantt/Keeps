export const BASE_URL = "http://localhost:3030";

export const handleError = (data) => {
  return data?.response?.data?.error;
};

export const titleCase = (name) => {
  if (!name) return "Keeps";
  name = name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
    .join(" ");
  return name;
};
