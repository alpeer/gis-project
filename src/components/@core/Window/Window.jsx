import Draggable from 'react-draggable'
import { Icon } from "../Icon/Icon"
import "./Window.sass"
export const Window = ({ title, icon, children, onMinimize, onClose }) => { 
  const onStart = ()=> {}
  const onStop = ()=> {}
  return <Draggable bounds="parent" {...{onStart, onStop}}>
    <div className="Window">
      <div className="header">
        <div className="title">{title}</div>
        <div className="actions">
          <div className="minimize" onClick={onClose}><Icon icon="minus"/></div>
          <div className="close" onClick={onClose}><Icon icon="times" /></div>
        </div>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  </Draggable>
}