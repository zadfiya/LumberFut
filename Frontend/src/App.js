
import './App.css';
import Layout from './Component/Layout/Layout'
import Chart from './Component/CSV_Reader/CSV_Reader'
function App() {
  return (
    <div className="App">
      <Layout>
        <Chart/>
      </Layout>
    </div>
  );
}

export default App;
