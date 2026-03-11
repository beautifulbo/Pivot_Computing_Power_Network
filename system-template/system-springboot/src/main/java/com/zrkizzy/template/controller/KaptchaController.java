package com.zrkizzy.template.controller;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;

import static com.zrkizzy.template.constant.RedisConst.KAPTCHA;

/**
 * 验证码控制器
 *
 * @author zhangrongkang
 * @date 2022/8/7
 */
@Api(tags = "KaptchaController")
@RestController
public class KaptchaController {
    @Resource
    private DefaultKaptcha defaultKaptcha;
    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    @ApiOperation(value = "生成返回验证码")
    @GetMapping(value = "/kaptcha", produces = "image/jpeg")
    public void kaptcha(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 定义response输出类型为image/jpeg类型
        response.setDateHeader("Expires", 0);
        // standard HTTP/1.1 no-cache headers
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        // IE extended HTTP/1.1 no-cache headers (use addHeader)
        response.addHeader("Cache-Control", "post-check=0, pre-check=0");
        // standard HTTP/1.0 no-cache header
        response.setHeader("Pragma", "no-cache");
        // return a jpeg
        response.setContentType("image/jpeg");

        // --------------------------- 生成验证码开始 -----------------------------

        // 获取验证码的文本内容
        String text = defaultKaptcha.createText();

        // 获取请求参数中的key，如果没有则使用session ID或生成UUID
        String key = request.getParameter("key");
        if (key == null || key.trim().isEmpty()) {
            // 兼容没有key参数的情况，使用session ID或时间戳
            key = request.getSession().getId();
        }

        // 使用key作为Redis键的一部分，支持多用户并发
        final String redisKey = KAPTCHA + ":" + key;

        // 异步存储到Redis（提升响应速度），设置5分钟过期时间
        new Thread(() -> {
            redisTemplate.opsForValue().set(redisKey, text, 5, java.util.concurrent.TimeUnit.MINUTES);
        }).start();

        // 生成验证码图片
        BufferedImage image = defaultKaptcha.createImage(text);

        // 使用 try-with-resources 自动关闭流
        try (ServletOutputStream outputStream = response.getOutputStream()) {
            // 输出流输出图片，格式为jpg
            ImageIO.write(image, "jpg", outputStream);
            outputStream.flush();
        } catch (IOException e) {
            e.printStackTrace();
            throw e;
        }

        // --------------------------- 生成验证码结束 -----------------------------
    }
}
