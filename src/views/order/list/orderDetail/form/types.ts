interface FromItemProps {
  /**
   * 投诉工单ID
   */
  complain_id?: number;
  /**
   * 状态
   */
  complain_status?: number;

  [property: string]: any;
}

interface FormProps {
  formInline: FromItemProps
}

export type {FromItemProps, FormProps}
