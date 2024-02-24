interface FormItemProps{
  bill_id: number;
  bill_file: Array<File>;
  url: string;
}
interface FormProps{
  formInline: FormItemProps
}
export type {FormItemProps,FormProps}
