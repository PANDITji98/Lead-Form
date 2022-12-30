import React from 'react'
import './FormInput.css'

const FormInput = (props) => {

    const {label, errorMessage, onChange, id, ...inputProps} = props;

  return (
    <div className='form-input'>
        <label>{label}</label>
        <input {...inputProps} onChange={onChange} />
        <span>{errorMessage}</span>
    </div>
  )
}

export default FormInput