import React, { useCallback, useRef, useState } from 'react';
import { TimePicker } from 'antd';
import './index.css';

const CcTimePicker = (props) => {
  const { onChange, value, ...restProps } = props;
  const [open, setOpen] = useState(false);

  // Track how many columns have been clicked
  const selectedCount = useRef(0);
  const format = props.format || 'HH:mm:ss';
  const totalColumns = format.split(':').length;

  const handleOpenChange = useCallback((newOpen) => {
    if (newOpen) {
      selectedCount.current = 0;
    }
    setOpen(newOpen);
  }, []);

  const handleChange = useCallback(
    (time, timeString) => {
      selectedCount.current += 1;

      if (onChange) {
        onChange(time, timeString);
      }

      // Close panel after all columns have been selected
      if (selectedCount.current >= totalColumns) {
        setOpen(false);
      }
    },
    [onChange, totalColumns]
  );

  return (
    <TimePicker
      {...restProps}
      className={`cc-time-picker ${props.className || ''}`}
      popupClassName={`cc-time-picker-dropdown ${props.popupClassName || ''}`}
      value={value}
      open={open}
      format={format}
      onOpenChange={handleOpenChange}
      onChange={handleChange}
    />
  );
};

export default CcTimePicker;
