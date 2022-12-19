import { useDisk } from "../../../data";

export const usePosition = (name, defaultPosition = { x: 0, y: 50 }) => {
  const [positions, setPositions] = useDisk("positions", {});
  const setPosition = (position) => {
    setPositions({
      ...positions,
      [name]: position
    });
  };
  return [positions[name] || defaultPosition, setPosition];
};

export const useOrder = (name) => {
  const [order, setOrder] = useDisk("order", { _maxIndex: 100 });
  const activate = () => {
    const zIndex = order._maxIndex + 1;
    setOrder({
      ...order,
      [name]: zIndex,
      _active: name,
      _maxIndex: zIndex,
    });
  };
  const value = {
    zIndex: order[name] || 100,
    isActive: order._active === name,
  };
  console.log(value)
  return [value, activate];
};