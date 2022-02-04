import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ApexCharts from './ApexCharts';
import { formatDate } from './lib/date';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import LoadingIndicator from './LoadingIndicator';
import { Range } from 'react-range';

function App() {

  const [priceData, setPriceData] = useState()
  const [stepsIntoFuture, setStepsIntoFuture] = useState([1])
  const {promiseInProgress} = usePromiseTracker()
  
  useEffect(() => {
    
    trackPromise(
    fetch(`https://api-tnhc25tidq-uc.a.run.app/api?timeframe=1&steps_into_future=${stepsIntoFuture}&predict_forward=True`)
    .then(response => response.json())
    .then((jsonData) => {
      var dates = jsonData.index.map(function(e) { 
        e = formatDate(e); 
        return e;
      });

      var prices = jsonData.data.flat().map(function(e) { 
        e = Number(e); 
        return e;
      });

      const data = {price: prices, date: dates}
      console.log(data)
      setPriceData(data)
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    }))
    
  }, [stepsIntoFuture])


  return (
    <div className="w-full h-screen">
      {/* <h1>ETH</h1> */}
      <LoadingIndicator/>
      {priceData && !promiseInProgress && <div className='w-full h-full flex flex-col items-center justify-center space-y-5'>
        <ApexCharts priceData={priceData}/>
        <Range
          step={1}
          min={0}
          max={60}
          values={stepsIntoFuture}
          // value={stepsIntoFuture}
          onChange={(value) => setStepsIntoFuture(value)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                backgroundColor: '#ccc'
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '14px',
                width: '14px',
                backgroundColor: '#983456'
              }}
            />
          )}
        />

      </div>}
      
    </div>
  );
}

export default App;
