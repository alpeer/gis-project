
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
  
export const MagnitudeSlider = ({ value, onChange }) => {
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const minDistance=1
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        onChange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        onChange([clamped - minDistance, clamped]);
      }
    } else {
      onChange(newValue);
    }
  };
  console.log(value,"1")
  return <Box sx={{ width: 250 }}>
    <Slider marks
      getAriaLabel={() => 'Magnitude Range'}
      value={value}
      step={0.5}
      min={3}
      max={9}
      minDistance={1}
      onChange={handleChange}
      valueLabelDisplay="auto"
      disableSwap
    />
  </Box>
}