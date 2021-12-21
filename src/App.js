
import Login from './components/logn';

import { BrowserRouter as  Router, Switch, Route, Link }  from "react-router-dom";

import Nav from './components/nav';
import Home from './components/home';
import Buildings from './components/buildings';
import Staffs from './components/sttafs';
import Vehicles from './components/vehicles';

function App() {
  return (
    <div className="dashboard-main-wrapper">
     
      {/* <Login /> */}

      <Router>
     
        <Nav />

        {/* <Switch>

          <Route path='/' exact component={Home} />
          <Route path='/buildings'  component={Buildings} />
          <Route path='/staffs'  component={Staffs} />
          <Route path='/vehicles'  component={Vehicles} />

        </Switch> */}
       

      </Router>


    </div>

    


  );
}



export default App;
