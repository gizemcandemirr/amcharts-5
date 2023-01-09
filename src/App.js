
import ClusteredBarChart from './components/ClusteredBarChart';
import DivergentStackedBars from './components/DivergentStackedBars';
import StackedBarCart from './components/StackedBarChart';
import VarianceIndicators from './components/VarianceIndicators';
import VarianceIndicator from './components/VarianceIndicator';
import PieofPieChart from './components/PieofPieChart';

function App() {



  return (
    <>
      <div style={{ display: 'flex' , marginBottom:'20px'}}>
        <ClusteredBarChart />

        <StackedBarCart />
        {/* <DivergentStackedBars /> */}
      </div>
      <div style={{ display: 'flex' }}>
        <VarianceIndicators />
        <VarianceIndicator/>
      </div>
      <div style={{ display: 'flex' }}>
        <PieofPieChart />
      </div>
    </>

  );

}

export default App;
