interface FormItemProps {
  card_type_id: number;
  course_id: number;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type {FormProps, FormItemProps}
