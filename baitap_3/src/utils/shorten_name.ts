const shortenName = (name: string) => {
  const namePart = name.split(" ");

  if (namePart.length == 0 || name.trim() == "") {
    return "A";
  }

  return namePart
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};

export default shortenName;
