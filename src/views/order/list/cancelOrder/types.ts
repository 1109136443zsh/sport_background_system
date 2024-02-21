interface FormItemProps {
  order_id: number,
  reason: string,
  reason_type: number
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
