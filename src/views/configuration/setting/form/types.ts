interface FormItemProps {
  key?: string;
  value?: string;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
