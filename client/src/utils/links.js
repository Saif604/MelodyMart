import { BsHandbagFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FaCartArrowDown } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";


const links = [
  { id: 1, text: "profile", path: "/dashboard", icon: <ImProfile /> },
  { id: 2, text: "products", path: "products", icon: <AiFillProduct/> },
  { id: 3, text: "cart", path: "cart", icon: <FaCartArrowDown /> },
  { id: 4, text: "orders", path: "orders", icon: <BsHandbagFill /> },
  { id: 5, text: "reviews", path: "reviews", icon: <MdReviews /> },
];

export default links;
