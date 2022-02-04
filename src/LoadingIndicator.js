import { usePromiseTracker } from "react-promise-tracker";
import {ThreeDots} from 'react-loader-spinner';

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && 
        <div className="w-full h-full flex justify-center items-center">
            <ThreeDots color="#26A7FB" height="100" width="100" />
        </div>
    );  
}

export default LoadingIndicator