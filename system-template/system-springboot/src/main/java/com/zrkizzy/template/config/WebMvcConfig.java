package com.zrkizzy.template.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * 资源访问配置类
 *
 * @author zhangrongkang
 * @date 2022/9/2
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    /**
     * 文件上传路径
     */
    @Value("${file.path}")
    public String FILE_PATH;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 所有带 "/images" 的请求都认为是静态资源请求
        registry.addResourceHandler("/images/**").addResourceLocations("file:" + FILE_PATH);
    }

    /**
     * 扩展消息转换器，设置字符编码为UTF-8
     */
    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        // 添加字符串消息转换器，使用UTF-8编码
        for (HttpMessageConverter<?> converter : converters) {
            if (converter instanceof StringHttpMessageConverter) {
                ((StringHttpMessageConverter) converter).setDefaultCharset(StandardCharsets.UTF_8);
            }
        }
    }

    /**
     * 配置内容协商，默认使用JSON格式，并设置UTF-8编码
     */
    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.defaultContentType(MediaType.APPLICATION_JSON, new MediaType("application", "json", StandardCharsets.UTF_8));
    }
}
