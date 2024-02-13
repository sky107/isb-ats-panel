import Router from "./route/Index";
import i18n from './i18n'
import ThemeProvider from "./layout/provider/Theme";

const App = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};
export default App;