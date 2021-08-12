import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Dashboard from "./Pages/Dashboard";
import Nft from "./Pages/Nft";
import Rankings from "./Pages/Rankings";
import Trading from "./Pages/Trading";
import SingleProject from "./Pages/SingleProject";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="relative w-full flex flex-col pb-8 lg:pb-0 pt-16">
          <Switch>
            <Route exact path="/nft-projects" component={Nft} />
            <Route exact path="/rankings" component={Rankings} />
            <Route exact path="/trading" component={Trading} />
            <Route exact path="/projects/decentraland" component={SingleProject} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </main>
      </Router>
      <Footer />
    </>
  );
}

export default App;
