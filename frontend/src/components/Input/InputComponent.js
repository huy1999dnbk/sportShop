import React from 'react'
import TextField from '@mui/material/TextField';

const InputComponent = ({ type = 'text', label, placeholder, value, onChange,className,variant="outlined",hiddenLabel = false,disabled = false }) => (
    <TextField disabled={disabled} label={label} variant={variant} placeholder={placeholder} value={value} onChange={onChange} type={type} className={className} hiddenLabel={hiddenLabel} />
)
 
export default InputComponent
