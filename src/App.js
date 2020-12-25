import React from 'react';
import NavigationBar from './components/navbar.component';
import TodoList from './components/TodoList/TodoList.component';

function App() {
  const navbarOptions = getNavbarOptions();
  return (
    <div className="App">
      <NavigationBar
        options={navbarOptions}
      />
      <TodoList />
    </div>
  );
}

var getNavbarOptions = function () {
  return {
    leftOptions: [
      {
        name: 'Home',
        href: "#"
      },
      {
        name: "About",
        href: "#"
      }
  ],
    rightOptions: [
      {
        name: "Search"
      }
    ]
  };
}

export default App;
