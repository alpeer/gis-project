import Draggable from 'react-draggable'
import { Icon } from "../Icon/Icon"
import classNames from 'classnames'
import { usePosition, useOrder } from "./utils"

import "./Window.sass"
export const Window = ({ id, title, icon, className, defaultPosition, children, onMinimize, onClose }) => {

  const [position, setPosition] = usePosition(id, defaultPosition)
  const [{zIndex, isActive}, activate] = useOrder(id)
  const onStop = (e, { x, y }) => setPosition({x, y})
  return <Draggable handle=".title" position={position} bounds="parent" {...{ onStart:activate, onStop }}>
    <div className={classNames("Window", id, className, {isActive})} style={{ zIndex }}>
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