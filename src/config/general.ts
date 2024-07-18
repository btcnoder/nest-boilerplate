import { registerAs } from '@nestjs/config';

// 默认会合并根目录下的.env文件
export default registerAs('general', () => ({
  port: process.env.APP_PROT,
  upload_prefix: process.env.UPLOAD_URL_PRE,
  upload_url_dir: process.env.UPLOAD_URL_DIR,
  log_on: process.env.LOG_ON === 'true',
  log_level: process.env.LOG_LEVEL,
  jwtsecret: process.env.JWT_SECRET,
}));
