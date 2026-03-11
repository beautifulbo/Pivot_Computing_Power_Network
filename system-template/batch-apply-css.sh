#!/bin/bash
# 批量应用CSS控制方案到所有4个模块

echo "正在批量修改所有模块文件..."

for MODULE in WeBase ComputingTrade PPIO; do
    FILE="system-vue/src/views/modules/${MODULE}.vue"
    echo "处理: $FILE"

    # 1. 替换模板中的 v-show 为 :class
    sed -i 's/v-show="!showIframe"/:class="{ '\''is-hidden'\'': showIframe }"/g' "$FILE"
    sed -i 's/v-show="showIframe"/:class="{ '\''is-visible'\'': showIframe }"/g' "$FILE"

    # 2. 在 .module-card 的样式中添加 transition 和 is-hidden 类
    # 3. 在 .iframe-page 的样式中添加默认隐藏和 is-visible 类
done

echo "批量修改完成！"
