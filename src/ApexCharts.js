import { useEffect, useState } from "react";
import Chart from 'react-apexcharts'
import useWindowDimensions from "./useWindowDimensions";

export default function ApexCharts({priceData}) {

    const [state, setState] = useState()
    const windowDimensions = useWindowDimensions()

    useEffect(() => {
        setState({
            options: {
              chart: {
                id: 'ETH predictions'
              },
              xaxis: {
                categories: priceData.date
              }
            },
            series: [{
              name: 'ETH predicted price',
              data: priceData.price
            }]
          })
    }, [priceData])

    return (
        <div>
            {state && <Chart options={state.options} series={state.series} type="line" width={windowDimensions.width * 0.9} height={windowDimensions.height * 0.6} />}
        </div>
    )
    
}