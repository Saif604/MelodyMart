import { Form } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters,clearFilters } from "../features/Products/productsSlice";
import { formatPrice } from "../utils/format";
import { useMemo, useState } from "react";
import { items } from "fusioncharts";
const COMPANIES = [
  { _id: 1, name: "All", value: "" },
  { _id: 2, name: "Sennheister", value: "sennheister" },
  { _id: 3, name: "Gibson", value: "gibson" },
  { _id: 4, name: "Kawai", value: "kawai" },
  { _id: 5, name: "Yamha", value: "yamha" },
];
const CATEGORIES = [
  { _id: 1, name: "All", value: "" },
  { _id: 2, name: "Drum", value: "drum" },
  { _id: 3, name: "Flute", value: "flute" },
  { _id: 4, name: "Guitar", value: "guitar" },
  {_id:5,name:"Accordion", value:"accordion"},
  {_id:6,name:"Piano", value:"piano"},
];
const COLORS = [
  {
    _id: 1,
    value: "#191970",
  },
  {
    _id: 2,
    value: "#50C878",
  },
  {
    _id: 3,
    value: "#FF4500",
  },
  {
    _id: 4,
    value: "#B76E79",
  },
];
const Filters = () => {
  const dispatch = useDispatch();
  const { filters:{category,company,freeShipping,price,colors,name},filterLayout:{categories,companies,colors:layoutColors, prices} } = useSelector((state) => state.products);
  const [search, setSearch] = useState(name || "");

  const handleFilterChange = (filter) => {
    dispatch(updateFilters({ ...filter }));
  };

  const handleClearFilter = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(updateFilters({ name: e.target.value }));
      }, 2000);
    };
  };
  const optimizeDebouce = useMemo(() => debounce(), []);
  return (
    <Form>
      <Form.Group controlId="formfilterSearch" className="mb-3">
        <Form.Control
          type="text"
          placeholder="search"
          value={search}
          onChange={optimizeDebouce}
        />
      </Form.Group>
      <Form.Group controlId="formfilterCategory" className="mb-3">
        <Form.Text className="fw-bold">Category</Form.Text>
        {categories.map((item,index) => (
          <Form.Check
            key={index}
            type="radio"
            label={item.name}
            name="category"
            value={item.value}
            checked={item.value === category}
            onChange={(e) => handleFilterChange({ category: e.target.value })}
            className="text-capitalize"
          />
        ))}
      </Form.Group>
      <Form.Group controlId="formfilterCompany" className="mb-3">
        <Form.Label className="fw-bold">Company</Form.Label>
        <Form.Select
          value={company}
          onChange={(e) => handleFilterChange({ company: e.target.value })}
        >
          {companies.map((item,index) => (
            <option value={item.value} key={index}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="mb-3">
        <Form.Label className="fw-bold">Colors</Form.Label>
        <div className="colors">
          {layoutColors.map((color,index) => (
            <Color
              $clr={color}
              key={index}
              type="checkbox"
              checked={colors.includes(color)}
              value={color}
              onChange={(event) => {
                const { value, checked } = event.target;
                const updatedColors = checked
                  ? [...colors, value]
                  : colors.filter((color) => color !== value);
                handleFilterChange({ colors: updatedColors });
              }}
            />
          ))}
        </div>
      </div>

      <Form.Group controlId="formfilterRange" className="mb-3">
        <Form.Label className="fw-bold">Price</Form.Label>
        <p className="mb-0">{formatPrice(price)}</p>
        <Form.Range
          min={prices.minPrice}
          max={prices.maxPrice}
          value={price}
          onChange={(e) => handleFilterChange({ price: e.target.value })}
        />
      </Form.Group>
      <Form.Group
        controlId="formfilterShipping"
        className="d-flex justify-content-between mb-3"
      >
        <Form.Label className="fw-semibold">Free Shipping</Form.Label>
        <Form.Check
          type="checkbox"
          checked={freeShipping}
          name="freeShipping"
          id="freeShipping"
          onChange={(e) =>
            handleFilterChange({ freeShipping: e.target.checked })
          }
        />
      </Form.Group>
      <button className="button" onClick={handleClearFilter}>
        clear filters
      </button>
    </Form>
  );
};
export default Filters;

const Color = styled(Form.Check)`
  .form-check-input {
    background-color: ${({ $clr }) => $clr};
    background-image: var(--bs-form-check-bg-image);
    cursor: pointer;
  }
`;
