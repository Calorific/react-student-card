const validate = (validationMethod, data, config) => {
  let status
  switch (validationMethod) {
    case 'isRequired':
      status = !data.trim()
      break
    case 'minLength':
      status = data.length < config.value
      break
    case 'min':
      status = data < config.value
      break
    case 'max':
      status = data > config.value
      break
    case 'isUrl':
      const urlRegExp = /^https?:\/\/\S+\.\S+$/gmi
      status = !data.match(urlRegExp)
      break
    default:
      break
  }
  if (status)
    return config.message
}
export function validator(data, config) {
  const errors = {}
  for (const fieldName in data) {
    for (const validationMethod in config[fieldName]) {
      const error = validate(validationMethod, data[fieldName], config[fieldName][validationMethod])
      if (error && !errors[fieldName]) errors[fieldName] = error
    }
  }
  return errors
}