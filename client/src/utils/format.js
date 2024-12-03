//TIME FORMAT
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Options for formatting
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata", // Convert to IST
  };

  // Format date and time
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate.replace(", ", " ");
};


//DATE FORMAT
export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "inr",
  }).format(number / 100);
  return newNumber;
};
