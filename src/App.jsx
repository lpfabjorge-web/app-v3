import { AppProvider, useAppContext } from './context/AppContext';
import Splash from './views/Splash';
import Onboarding from './views/Onboarding';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import ActivityDetail from './views/ActivityDetail';
import Profile from './views/Profile';
import ScheduleBuilder from './views/ScheduleBuilder';
import './index.css';

const MainApp = () => {
  const { currentScreen } = useAppContext();

  return (
    <>
      {currentScreen === 'splash' && <Splash />}
      {currentScreen === 'onboarding' && <Onboarding />}
      {currentScreen === 'login' && <Login />}
      {currentScreen === 'home' && <Dashboard />}
      {currentScreen === 'schedule' && <ScheduleBuilder />}
      {currentScreen === 'detail' && <ActivityDetail />}
      {currentScreen === 'profile' && <Profile />}
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
