
export const getUniques = (products, key) => {
  if (key === "colors") {
    const result = products.reduce((acc, curr) => {
      curr.colors.forEach((color) => {
        if (!acc.includes(color)) {
          acc.push(color);
        }
      });
      return acc;
    }, []);
    return result;
  }
  if (key === "prices") {
    return products.reduce(
      (acc, product) => {
        if (product.price < acc.minPrice) acc.minPrice = product.price;
        if (product.price > acc.maxPrice) acc.maxPrice = product.price;
        return acc;
      },
      { minPrice: Infinity, maxPrice: -Infinity }
    );
  }

  const uniqueValues = [
    "all",
    ...new Set(products.map((product) => product[key])),
  ];

  return uniqueValues.map((item, index) => {
    if (item === "all") {
      return { label: "All", value: "" };
    }
    return {
      label: item.slice(0, 1).toUpperCase() + item.slice(1),
      value: item,
    };
  });
};

export const formData = {
  input: [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholoder: "Enter product name",
      id: "name",
    },
    {
      name: "price",
      type: "number",
      label: "Price",
      placeholder: "Enter product price",
      id: "price",
    },
    {
      name: "inventory",
      type: "text",
      label: "Inventory",
      placeholder: "Enter product inventory",
      id: "inventory",
    },
  ],
  select: [
    {
      name: "company",
      label: "Company",
      id: "company",
      options: [
        {
          value: "sennheister",
          label: "Sennheister",
        },
        {
          value: "gibson",
          label: "Gibson",
        },
        {
          value: "yamha",
          label: "Yamha",
        },
        {
          value: "kawai",
          label: "Kawai",
        },
      ],
    },
    {
      name: "category",
      label: "Category",
      id: "category",
      options: [
        {
          value: "flute",
          label: "Flute",
        },
        {
          value: "drum",
          label: "Drum",
        },
        {
          value: "guitar",
          label: "Guitar",
        },
        {
          value: "accordion",
          label: "Accordion",
        },
        {
          value: "piano",
          label: "Piano",
        },
      ],
    },
  ],
  checkbox: [
    {
      name: "featured",
      label: "Featured",
    },
    {
      name: "freeShipping",
      label: "Shipping",
    },
  ],
  checks: [
    {
      name: "colors",
      label: "#191970",
      id: "colors",
      value: "#191970",
    },
    {
      name: "colors",
      label: "#50C878",
      id: "colors",
      value: "#50C878",
    },
    {
      name: "colors",
      label: "#FF4500",
      id: "colors",
      value: "#FF4500",
    },
    {
      name: "colors",
      label: "#B76E79",
      id: "colors",
      value: "#B76E79",
    },
  ],
};
