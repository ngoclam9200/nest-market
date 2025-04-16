import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const apiProxy = createProxyMiddleware({
      target: 'https://id.zalo.me/account?continue=https://chat.zalo.me', // Địa chỉ của API bên thứ ba
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': '', // Xoá bỏ tiền tố '/proxy' trước khi gửi request
      },
      //   onProxyReq: (proxyReq, req, res) => {
      //     // Bạn có thể thêm headers hoặc token nếu cần
      //     proxyReq.setHeader('Authorization', 'Bearer your_token_here');
      //   },
    });

    apiProxy(req, res, next);
  }
}
