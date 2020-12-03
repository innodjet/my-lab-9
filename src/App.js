import "./App.css";
import Content from "./page-sections/content/Content";
import Nav from "./page-sections/nav/Nav";
import Footer from "./page-sections/footer/Footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
