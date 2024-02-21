interface FormItemProps{
  /**
   * 课程ID
   */
  course_id: number;
  /**
   * 课程名
   */
  course_name: string;
  [property: string]: any;
}
interface FormProps {
  formInline: FormItemProps
}
export type { FormItemProps, FormProps}
