import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "profile", path: "/dashboard", icon: <ImProfile /> },
  { id: 2, text: "products", path: "products", icon: <MdQueryStats /> },
  { id: 3, text: "add product", path: "add-product", icon: <IoBarChartSharp /> },
  { id: 4, text: "cart", path: "cart", icon: <FaWpforms /> },
  { id: 5, text: "checkout", path: "checkout", icon: <IoBarChartSharp /> },
  { id: 6, text: "orders", path: "orders", icon: <IoBarChartSharp /> },
  { id: 7, text: "reviews", path: "reviews", icon: <IoBarChartSharp /> },
];

export default links;
