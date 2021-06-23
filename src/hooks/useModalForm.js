import useModal from './useModal'
import useForm from './useForm'

/**
 * 弹框类Form, 可用于新增/编辑等弹框页面
 * @param {Object} config
 */
const useModalForm = config => {
  const modalFormConfig = config || {}
  const { defaultVisible = false, autoSubmitClose = true, autoResetForm = true, submit, form, defaultFormValues } = modalFormConfig

  const { visible, show, close, modalProps } = useModal({ defaultVisible })

  const {
    form: formInstance,
    formProps,
    formLoading,
    defaultFormValuesLoading,
    formValues,
    initialValues,
    formResult,
    submit: formSubmit
  } = useForm({ form, submit, defaultFormValues })

  const modalFormProps = {
    ...modalProps,
    onOk: () => {
      formSubmit().then(() => {
        if (autoSubmitClose) {
          close()
        }
        if (autoResetForm) {
          formInstance.resetFields()
        }
      })
    }
  }

  return {
    visible,
    show,
    close,
    modalProps: modalFormProps,
    form: formInstance,
    formProps,
    defaultFormValuesLoading,
    formValues,
    initialValues,
    formResult,
    formLoading,
    submit: formSubmit
  }
}

export default useModalForm
