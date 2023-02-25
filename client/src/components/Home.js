import { useNavigate } from 'react-router-dom';
import '../Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
