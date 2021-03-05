import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

// const NavBar = (props) => {
//     return (
//         <div>
//             <Link to="/messages">Messages</Link>
//             <Link to="/send">Send message</Link>
//         </div>
//     )
// }

const NavBar = (props) => {
  const [selectedTab, setSelectedTab] = useState("/messages");

  const selectTab = (selectedKey) => {
    console.log('select tab ', selectedKey);
    setSelectedTab(selectedKey);
  };

  return (
    <Nav
      variant="tabs"
      defaultActiveKey="/messages"
      activeKey={selectedTab}
      onSelect={selectTab}
    >
      <Nav.Item>
        <Nav.Link eventKey="/messages" as="div">
          <Link to="/messages">Messages</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/send" as="div" href="/send">
          <Link to="/send">Send message</Link>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;