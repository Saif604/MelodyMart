import { BsHandbagFill,BsListCheck} from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FaCartArrowDown,FaUsers } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { AiFillProduct,AiFillPlusCircle} from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa6";


const links = [
  {
    id: 1,
    text: "profile",
    path: "/dashboard",
    icon: <ImProfile />,
    roles: ["user", "admin"],
  },
  {
    id: 2,
    text: "products",
    path: "products",
    icon: <AiFillProduct />,
    roles: ["user", "admin"],
  },
  {
    id: 3,
    text: "cart",
    path: "cart",
    icon: <FaCartArrowDown />,
    roles: ["user", "admin"],
  },
  {
    id: 4,
    text: "orders",
    path: "orders",
    icon: <BsHandbagFill />,
    roles: ["user", "admin"],
  },
  {
    id: 5,
    text: "reviews",
    path: "reviews",
    icon: <MdReviews />,
    roles: ["user", "admin"],
  },
  {
    id: 6,
    text: "all users",
    path: "allUsers",
    icon: <FaUsers />,
    roles: ["admin"],
  },
  {
    id: 7,
    text: "all orders",
    path: "allOrders",
    icon: <BsListCheck />,
    roles: ["admin"],
  },
  {
    id: 8,
    text: "all products",
    path: "allProducts",
    icon: <FaProductHunt />,
    roles: ["admin"],
  },
  {
    id: 9,
    text: "add product",
    path: "addProduct",
    icon: <AiFillPlusCircle />,
    roles: ["admin"],
  },
];
export default links;

