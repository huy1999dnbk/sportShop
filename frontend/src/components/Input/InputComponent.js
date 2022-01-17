import React from 'react'
import TextField from '@mui/material/TextField';

const InputComponent = ({ type = 'text', label, placeholder, value, onChange,className,variant="outlined" }) => (
    <TextField label={label} variant={variant} placeholder={placeholder} value={value} onChange={onChange} type={type} className={className}/>
)

export default InputComponent
