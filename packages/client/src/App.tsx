import { useEffect, useState } from 'react';
import './App.css';
import Profile from './pages/profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DEFAULT_USER } from './components/ProfileForm/constants';
import { getUser } from './services/authController';

function App() {
  const [user, setUser] = useState(DEFAULT_USER);

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };
    const fetUser = async () => {
      const user: UserDTO = await getUser();
      setUser(user);
    };

    fetUser();
    fetchServerData();
  }, []);

  let route;
  switch (window.location.hash) {
    case '#profile':
      route = <Profile user={user} />;
      break;
    default:
      route = <Profile user={user} />;
  }

  return <div className="App">{route}</div>;
}

export default App;
