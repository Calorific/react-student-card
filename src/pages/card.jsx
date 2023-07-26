import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Card = () => {
  const [cardData, setCardData] = useState({})

  useEffect(() => {
    const data = localStorage.getItem('studentCardData')
    setCardData(JSON.parse(data))
  }, [])

  const getAge = (year) => {
    const n = new Date().getFullYear() - year
    let form
    if (n % 100 > 4 && n % 100 < 21)
      form = 'лет'
    else if (n % 10 === 1)
      form = 'год'
    else if (n % 10 > 1 && n % 10 < 5)
      form = 'года'
    else
      form = 'лет'
    return `${n} ${form}`
  }
  
  return (
    <>
      <h1>Карточка студента</h1>
      {cardData?.name ? (
        <>
          <p><b>Имя:</b> {cardData.name}</p>
          <p><b>Фамилия:</b> {cardData.surname}</p>
          <p><b>Год рождения:</b> {cardData.year} ({getAge(cardData.year)})</p>
          <p><b>Портфолио:</b> <a href={cardData.portfolio}>{cardData.portfolio}</a></p>
          <Link className="btn btn-primary mt-2" to="/controls/edit">Редактировать</Link>
        </>
      ) : (
        <>
          <p>Нет данных</p>
          <Link className="btn btn-primary" to="/controls/add">Добавить</Link>
        </>
      )}
    </>
  )
}

export default Card