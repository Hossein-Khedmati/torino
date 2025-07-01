import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <Header menu={menu} setMenu={setMenu} />
      <div style={{ paddingTop: "75px" }} onClick={() => setMenu(false)}>
        {children}
      </div>
      <Footer setMenu={setMenu}/>
      
    </>
  );
}

export default Layout;
