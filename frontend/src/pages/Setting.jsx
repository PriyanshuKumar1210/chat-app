import { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext.jsx';

const Setting = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Theme Settings</h2>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded bg-blue-500 text-white"
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default Setting;
