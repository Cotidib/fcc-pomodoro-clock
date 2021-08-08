import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import LengthConfig from './LengthConfig/LengthConfig';
import Timer from './Timer/Timer';
import './clock.css';

function Clock(props){
    const [breakLen, setBreakLen] = React.useState(5);
    const [sessionLen, setSessionLen] = React.useState(25);
    const [timerMin, setTimerMin] = React.useState('25');
    const [timerSec, setTimerSec] = React.useState('00');
    const [timerDelay, setTimerDelay] = React.useState(null);
    const [timerState, setTimerState] = React.useState('Session');
    const [playPause, setPlayPause] = React.useState('play');
    const [playPauseIcon, setPlayPauseIcon] = React.useState(faPlay);
    const [isPaused, setPause] = React.useState(false);
    
    const maxLen = 60;
    const minLen = 1;
    
    const handleBreakClick = (e) => {
      if(e == 'decrement' && breakLen>minLen)
        {
          setBreakLen(breakLen - 1);
        }
      else if(e == 'increment' && breakLen<maxLen)
        {
          setBreakLen(breakLen + 1);
        }
    }
    
  
    const handleSessionClick = (e) => {
      if(e == 'decrement' && sessionLen>minLen)
        {
          setSessionLen(sessionLen-1);
          if(sessionLen-1 < 10)
             {
                setTimerMin('0'+(sessionLen-1));
             }
          else
             {
                setTimerMin(sessionLen-1);
             }
        }
      else if(e == 'increment' && sessionLen<maxLen)
        {
          setSessionLen(sessionLen+1);
          if(sessionLen+1 < 10)
             {
                setTimerMin('0'+(sessionLen+1));
             }
          else
             {
                setTimerMin(sessionLen+1);
             }   
        }     
    }
    
    //Custom Hook, reference at the end
    useInterval(() => {
      updateTime();
    },timerDelay);
    
    const updateTime = () => {
      //change seconds
      if(timerSec > 0 && timerMin >= 0)
        {
          if(timerSec < 11)
            {
              setTimerSec("0"+(timerSec-1));
            }
          else if(timerSec >= 10)
            {
              setTimerSec(timerSec-1);
            }
          
        }
      //change minutes
      else if(timerSec == 0 && timerMin > 0)
        {
          setTimerSec(59);
          if(timerMin < 10)
            {
              setTimerMin("0"+(timerMin-1));
            }
          else if(timerMin>9)
            {
              setTimerMin(timerMin-1);
            }    
        } 
      
      //start break
      else if(timerSec == 0 && timerMin == 0)
        {
          var audio = document.getElementById('beep');
          audio.currentTime = 0;
          audio.play();
          if(timerState == 'Session')
            {
              setTimerState('Break');
              if(breakLen<10)
                {
                  setTimerMin("0" + breakLen);
                }
              else if(breakLen>9)
                {
                  setTimerMin(breakLen);
                }     
            }
          else if(timerState == 'Break')
            {
              setTimerState('Session');
              if(sessionLen<10)
                {
                  setTimerMin("0"+sessionLen);
                }
              else if(sessionLen>9)
                {
                  setTimerMin(sessionLen);
                }        
            }
          
        } 
    }
    
    const handleStart = (e) => {
      
      if(e == 'play' && isPaused == false)
        {   
          setPlayPause('pause'); 
          setPlayPauseIcon(faPause);
          setTimerDelay(1000); //this change triggers useInterval
          
        }
      else if(e == 'play' && isPaused)
        {
          setTimerDelay(1000);
          setPause(false);
          setPlayPause('pause');
          setPlayPauseIcon(faPause);
        }
      
      else if(e == 'restart')
        {
          setBreakLen(5);
          setSessionLen(25);
          setTimerMin('25');
          setTimerSec('00');
          setTimerState('Session');
          setTimerDelay(null);
          var audio = document.getElementById('beep');
          audio.pause();
          audio.currentTime = 0;
        }
      else if(e == 'pause')
        {
          setTimerDelay(null); //triggers pause
          setPause(true);
          setPlayPause('play');
          setPlayPauseIcon(faPlay);
        }
      
    }
    
    return(
      <div className='clock-box'>
        <FontAwesomeIcon icon={faSeedling} className='leafs'/>
        <div className='config-container'>
          <LengthConfig name='break' onClick={handleBreakClick} numDisplay={breakLen}/>
          <LengthConfig name='session' onClick={handleSessionClick} numDisplay={sessionLen}/>
        </div>      
          <Timer minutes={timerMin} seconds={timerSec} onClick={handleStart} currentState={timerState} currentPlayPause={playPause} icon={playPauseIcon}/>
      </div>
    )
  };

  export default Clock

  // COUNTDOWN HOOK
//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
    const savedCallback = React.useRef();
  
    // Remember the latest callback.
    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    React.useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  
  