import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const canSend = [formData.name, formData.email, formData.subject, formData.message].every(Boolean)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        })
    }

    const renderInput = (name, type, placeholder, value) => {
        return (
            <>
                {/* <label className='contact__form__label' htmlFor={name}>{name.toUpperCase()}</label> */}
                <input
                    className='contact__form__input'
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    required
                />
            </>
        )
    }

    const renderTextArea = (name, placeholder, value) => {
        return (
            <>
                {/* <label className='contact__form__label' htmlFor={name}>{name.toUpperCase()}</label> */}
                <textarea
                    className='contact__form__textarea'
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
            </>
        )
    }

    const renderContactForm = () => {
        return (
            <form className='contact__form' onSubmit={handleSubmit}>
                {renderInput('name', 'text', 'Name', formData.name)}
                {renderInput('email', 'email', 'Email', formData.email)}
                {renderInput('subject', 'text', 'Subject', formData.subject)}
                {/* {renderInput('message', 'text-area', 'Message', formData.message)} */}
                {renderTextArea('message', 'Message', formData.message)}
                <button type='submit'>Send</button>
            </form>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (canSend) {
            const { name, email, subject, message } = formData
            console.log({ name, email, subject, message })
            toast.success(`Merci ${name} pour votre message. Je vous répondrai dès que possible`)
            resetForm()
        } else {
            toast.error('Please fill all the fields')
        }
    }
   

  return (
      <>
          <h3>Une question, un project ??</h3>
          <p>N’hésiter pas a m'envoyer un message </p>
          {renderContactForm()}
      </>
  )
}

export default Contact