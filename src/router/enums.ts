// 完整版菜单比较多，将 rank 抽离出来，在此方便维护

const home = 0, // 平台规定只有 home 路由的 rank 才能为 0 ，所以后端在返回 rank 的时候需要从 1 开始哦
  components = 1,
  able = 2,
  table = 3,
  list = 4,
  result = 5,
  error = 6,
  frame = 7,
  permission = 9,
  system = 10,
  tabs = 11,
  editor = 13,
  board = 16,
  ppt = 17,
  guide = 18,
  menuoverflow = 19;

export {
  home,
  components,
  able,
  table,
  list,
  result,
  error,
  frame,
  permission,
  system,
  tabs,
  editor,
  board,
  ppt,
  guide,
  menuoverflow
};
