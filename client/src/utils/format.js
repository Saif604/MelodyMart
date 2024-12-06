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


export const formatDonut = (data) => {
  // Step 1: Calculate the total price for each company
  const companyTotals = data.reduce((acc, order) => {
    order.orderItems.forEach((item) => {
      const company = item.product.company;
      const price = item.product.price;

      if (!acc[company]) {
        acc[company] = 0; // Initialize company total
      }
      acc[company] += price; // Add price to company total
    });

    return acc;
  }, {});

  // Step 2: Calculate the overall total price
  const grandTotal = Object.values(companyTotals).reduce(
    (sum, value) => sum + value,
    0
  );

  // Step 3: Calculate the percentage for each company
  return Object.entries(companyTotals).map(([company, total]) => ({
    label: company,
    value: ((total * 100) / grandTotal).toFixed(2), // Percentage with 2 decimals
  }));
};

export const formatLine = (data) =>{
  const result = Object.values(
    data.reduce((acc, item) => {
      const date = new Date(item.createdAt);
      const month = date.toLocaleString("default", { month: "short" }); 

      if (!acc[month]) {
        acc[month] = { label: month, value: 0 };
      }
      acc[month].value += item.total / 100; 
      return acc;
    }, {})
  );
  return result;
}

export const formatBar = (data) =>{
  const result = Object.values(
    data.reduce((acc, item) => {
      const date = new Date(item.createdAt);
      const month = date.toLocaleString("default", { month: "short" });

      if (!acc[month]) {
        acc[month] = { label: month, value: 0 };
      }
      acc[month].value += 1;
      return acc;
    }, {})
  );
  return result;
}
