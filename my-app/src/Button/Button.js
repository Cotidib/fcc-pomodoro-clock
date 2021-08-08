import "./button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Button(props){
    return(
      <div>
        <button className='btn' id={props.btnName} value={props.val} onClick={props.onClick}><FontAwesomeIcon icon={props.icon}/></button>
      </div>
    )
  };

export default Button