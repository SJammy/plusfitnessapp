import { Outlet } from "react-router-dom";

const Layout = () => {

  // const navbar = (<nav>
  //       <ul>
  //         <li>
  //           <Link to="/">Home</Link>
  //         </li>
  //         <li>
  //           <Link to="/counter">Counter</Link>
  //         </li>
  //         {/* <li>
  //           <Link to="/contact">Contact</Link>
  //         </li> */}
  //       </ul>
  //     </nav>)
  return (
    <>
    <div className="container">


      <Outlet />
          </div>
    </>
  )
};

export default Layout;
