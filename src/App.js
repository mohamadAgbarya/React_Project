import Home from "./pages/home/home";
import "./App.css";
import AppRouting from "./router/router";
import NavbarMain from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import AppProvider from "./Context";

function App() {
  return (
    <AppProvider>
      <div>
        <NavbarMain />
        <AppRouting />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
