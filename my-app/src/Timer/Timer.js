import Button from '../Button/Button';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import './timer.css';

function Timer(props){
  
    const handleClick = (e) => {
      let action = e.currentTarget.value;
      props.onClick(action);
    }
    
    return(
      <div className='timer-box'>
        <div>
          <div id='timer-label'>{props.currentState}</div>
          <div id='time-left'>{props.minutes + ":" + props.seconds}</div>
        </div>
        <div className='timer-buttons'>
          <Button icon={props.icon} val={props.currentPlayPause} btnName='start_stop' onClick={handleClick}/>
          <Button icon={faRedo} val='restart' btnName='reset' onClick={handleClick}/>
          <audio id='beep' src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
      </div>
        
    )
  };

  export default Timer