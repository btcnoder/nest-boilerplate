export enum ApiCode {
  SUCCESS = 200, // 成功

  USER_ID_INVALID = 10001, // 用户id无效
  USER_NOTEXIST = 10002, // 用户不存在
  USER_EXIST = 10003, //用户已存在
  PASSWORD_ERROR = 10004, // 密码错误

  PERMISSSION_EXIST = 10010, //权限字段已存在
  ROLE_EXIST = 10011, // 角色已存在,
  FORBIDDEN = 10012, //权限不足

  DATABASE_ERROR = 10020, //数据库错误
  DATABASE_INSERT_ERROR = 10021, // 写入数据错误

  TOKEN_NOTEXIST = 10030, // token为空
  TOKEN_ERROR = 10031, // token错误

  CATEGORY_EXIST = 10040, //分类已存在

  UPLOAD_ERROR = 10050, //文件上传错误
}
