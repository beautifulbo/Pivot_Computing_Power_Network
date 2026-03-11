package com.zrkizzy.template.config;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

/**
 * 验证码配置类
 *
 * @author zhangrongkang
 * @date 2022/8/7
 */
@Configuration
public class KaptchaConfig {
    @Bean
    public DefaultKaptcha defaultKaptcha() {
        // 验证码生成器
        DefaultKaptcha defaultKaptcha = new DefaultKaptcha();
        // 验证码配置
        Properties properties = new Properties();

        // 是否有边框（简化：去除边框以提升性能）
        properties.setProperty("kaptcha.border", "no");

        // 验证码
        properties.setProperty("kaptcha.session.key", "code");

        // 验证码文本字符颜色，默认为黑色
        properties.setProperty("kaptcha.textproducer.font.color","black");

        // 设置字体样式（简化：只使用一种字体提升性能）
        properties.setProperty("kaptcha.textproducer.font.names","Arial");

        // 字体大小，默认40
        properties.setProperty("kaptcha.textproducer.font.size", "32");

        // 字符长度，默认为5
        properties.setProperty("kaptcha.textproducer.char.length", "4");

        // 字符间距，默认为2
        properties.setProperty("kaptcha.textproducer.char.space", "6");

        // 验证码图片宽度，默认200
        properties.setProperty("kaptcha.image.width", "100");

        // 验证码图片高度
        properties.setProperty("kaptcha.image.height", "40");

        // 干扰线颜色（简化配置）
        properties.setProperty("kaptcha.noise.color", "blue");

        Config config = new Config(properties);
        defaultKaptcha.setConfig(config);
        return defaultKaptcha;
    }
}
