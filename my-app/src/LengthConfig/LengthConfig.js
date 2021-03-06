import Button from '../Button/Button';
import './lengthconfig.css';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

function LengthConfig(props){
  
    const handleDecrement = (e) => {
      let dec = e.currentTarget.value;
      props.onClick(dec);
      
    }
    
    const handleIncrement = (e) => {
      let inc = e.currentTarget.value;
      props.onClick(inc);
    }
    
    return(
      <div className='length-config-container'>
        <div className='length-label' id={props.name +'-label'}>{(props.name).charAt(0).toUpperCase() + (props.name).slice(1) + ' Length'}</div>
        <div className='length-container'>
          <Button btnName={props.name +'-decrement'} icon={faMinus} val='decrement' onClick={handleDecrement}/>
          <div className='length-number' id={props.name +'-length'}>{props.numDisplay}</div>
          <Button btnName={props.name +'-increment'} icon={faPlus} val='increment' onClick={handleIncrement}/>
        </div>
      </div>
    )
  };

  export default LengthConfig