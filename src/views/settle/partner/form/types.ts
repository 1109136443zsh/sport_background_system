interface FormItemProps {
  apply_id: number;
  region_id?: number;
  title: string
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormItemProps, FormProps}
