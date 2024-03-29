import { useState, useEffect } from 'react'
import { Form } from 'antd'

/**
 * 获取form属性
 * @param {Object} config
 */
const useForm = config => {
  const [defaultFormValuesLoading, setDefaultFormValuesLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({})
  const { defaultFormValues, form, submit } = config || {}
  const [formValues, setFormValues] = useState({})
  const [formLoading, setFormLoading] = useState(false)
  const [formResult, setFormResult] = useState()

  let version = 3

  // antd4
  if (Form.useForm) {
    version = 4
  }

  let formInstance = form

  if (!form) {
    if (version === 4) {
      [formInstance] = Form.useForm()
    } else {
      throw new Error('"form" need in antd@3')
    }
  }

  const onFinish = formValue => {
    setFormValues(formValue)
    setFormLoading(true)
    return new Promise((resolve, reject) => {
      if (version === 4) {
        formInstance
          .validateFields()
          .then(() => {
            resolve(
              Promise.resolve(submit(formValue))
                .then(data => {
                  setFormLoading(false)
                  setFormResult(data)
                  return data
                })
                .catch(err => {
                  setFormLoading(false)
                  throw err
                })
            )
          })
          .catch(validateErr => {
            setFormLoading(false)
            reject(validateErr)
          })
      } else {
        formInstance.validateFields(validateErr => {
          if (validateErr) {
            setFormLoading(false)
            reject(validateErr)
          } else {
            resolve(
              Promise.resolve(submit(formValue))
                .then(data => {
                  setFormLoading(false)
                  setFormResult(data)
                  return data
                })
                .catch(err => {
                  setFormLoading(false)
                  throw err
                })
            )
          }
        })
      }
    })
  }

  useEffect(() => {
    let isUnMounted = false
    if (!defaultFormValues) return
    let value
    if (typeof defaultFormValues === 'function') {
      setDefaultFormValuesLoading(true)
      value = defaultFormValues()
    } else {
      value = defaultFormValues
    }
    Promise.resolve(value)
      .then(data => {
        if (!isUnMounted) {
          const obj = { ...data }
          Object.keys(data).forEach(name => {
            obj[name] = formInstance.isFieldTouched(name) ? formInstance.getFieldValue(name) : data[name]
          })
          setDefaultFormValuesLoading(false)
          setInitialValues(data)
          formInstance.setFieldsValue(obj)
        }
      })
      .catch(() => {
        if (!isUnMounted) {
          setDefaultFormValuesLoading(false)
        }
      })

    return () => {
      isUnMounted = true
    }
  }, [])

  const formProps =
    version === 4
      ? {
          form: formInstance,
          onFinish,
          initialValues
        }
      : {
          onSubmit (e) {
            e.preventDefault()
            onFinish(formInstance.getFieldsValue(version === 4 ? true : undefined))
          }
        }

  return {
    form: formInstance,
    formProps,
    defaultFormValuesLoading,
    formValues,
    initialValues,
    formResult,
    formLoading,
    submit: values => {
      formInstance.setFieldsValue(values)
      return onFinish(formInstance.getFieldsValue(version === 4 ? true : undefined))
    }
  }
}

export default useForm
