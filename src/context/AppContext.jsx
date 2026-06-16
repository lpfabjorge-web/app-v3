import { createContext, useContext, useState, useEffect } from 'react';
import dbData from '../../instructions/db.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('splash'); // splash, login, home, detail, profile
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    // Simulate loading data from DB
    setActivities(dbData.activities);
    
    // Simulate splash screen delay
    const timer = setTimeout(() => {
      // Check if user is in localStorage (mock session)
      const storedUser = localStorage.getItem('unsa_connect_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setCurrentScreen('home');
      } else {
        setCurrentScreen('onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const login = (email) => {
    const foundUser = dbData.users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('unsa_connect_user', JSON.stringify(foundUser));
      setCurrentScreen('home');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('unsa_connect_user');
    setCurrentScreen('login');
  };

  const navigateTo = (screen, data = null) => {
    if (data) setSelectedActivity(data);
    setCurrentScreen(screen);
  };

  const saveActivity = (activityId) => {
    if (!user) return;
    const updatedUser = { ...user };
    if (!updatedUser.saved_activities.includes(activityId)) {
      updatedUser.saved_activities.push(activityId);
      setUser(updatedUser);
      localStorage.setItem('unsa_connect_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AppContext.Provider value={{
      currentScreen, navigateTo,
      user, login, logout,
      activities, selectedActivity,
      saveActivity
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
