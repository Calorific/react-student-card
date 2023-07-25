import React, { useEffect, useState } from 'react'
import TextField from '../components/textField'
import { Link, useHistory } from 'react-router-dom'
import { validator } from '../utils/validator'
import Modal from '../components/modal'

const CardControl = () => {
  const history = useHistory()
  const isEditing = +(new URLSearchParams(history.location.search)).get('edit')

  const [errors, setErrors] = useState({})

  const data = JSON.parse(localStorage.getItem('studentCardData'))
  if (isEditing && !data)
    history.push('/')

  const [formData, setFormData] = useState(data || {
    name: '',
    surname: '',
    year: '',
    portfolio: ''
  })

  const validate = () => {
    const errors = validator(formData, validatorConfig)
    setErrors(errors)
    return !Object.keys(errors).length
  }

  useEffect(() => {
    validate()
  }, [formData])

  const validatorConfig = {
    name: {
      isRequired: { message: 'Имя обязательно для заполнения' },
      minLength: {
        value: 3,
        message: 'В имени должно быть минимум 3 символа'
      }
    },
    surname: {
      isRequired: { message: 'Фамилия обязательна для заполнения' },
      minLength: {
        value: 3,
        message: 'В фамилии должно быть минимум 3 символа'
      }
    },
    year: {
      isRequired: { message: 'Год обязателен для заполнения' },
      min: {
        value: 1900,
        message: 'Год не должен быть ниже 1900'
      },
      max: {
        value: 2015,
        message: 'Год не должен превышать 2015'
      }
    },
    portfolio: {
      isRequired: { message: 'Портфолио обязательно для заполнения' },
      isUrl: { message: 'Портфолио должно быть ссылкой (https://example.com)' }
    }
  }

  const handleFormChange = e => {
    setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const changeData = () => {
    localStorage.setItem('studentCardData', JSON.stringify(formData))
    history.push('/')
  }

  return (
    <>
      <h1>{!isEditing ? 'Создать' : 'Редактировать'}</h1>
      <form>
        <TextField onChange={handleFormChange} name="name" value={formData.name} label="Имя" error={errors.name} />
        <TextField onChange={handleFormChange} name="surname" value={formData.surname} label="Фамилия" error={errors.surname} />
        <TextField onChange={handleFormChange} name="year" type="number" value={formData.year} label="Год рождения" error={errors.year} />
        <TextField onChange={handleFormChange} name="portfolio" value={formData.portfolio} label="Портфолио" error={errors.portfolio} />

        {isEditing ? <Link className="btn btn-secondary" to="/">Назад</Link> : ''}
        <Modal
          isCreating={!isEditing}
          isValid={!Object.keys(errors).length}
          text={'Информация ' + (!isEditing ? 'добавлена' : 'обновлена')}
          onClose={changeData}
        />
      </form>
    </>
  )
}

export default CardControl