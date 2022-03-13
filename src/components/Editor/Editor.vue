<template>
    <div class="main-container">
        <a-textarea
            class="input-container"
            v-model="content"
            placeholder="Please enter something"
            auto-size
        />
        <div class="preview-container">
            <a-collapse expand-icon-position="right">
                <a-collapse-item
                    :key="'1-' + index"
                    v-for="(item, index) in complieData"
                    :header="item.title"
                >
                    <a-collapse :bordered="false" expand-icon-position="right">
                        <a-collapse-item
                            :header="item2.title"
                            :key="'2-' + index2"
                            v-for="(item2, index2) in item.children"
                        >
                            <div v-html="item2.content" />
                            <div class="flex justify-end">
                                <a-button type="primary">下一步</a-button>
                            </div>
                        </a-collapse-item>
                    </a-collapse>
                </a-collapse-item>
            </a-collapse>
        </div>
    </div>
</template>

<script setup lang="ts">
import "highlight.js/styles/atom-one-dark.css";
import "./modest.scss";
import MarkdownIt from "markdown-it";
import { ref, watch } from "vue";
import complieAst from "./complieAst";
const md: MarkdownIt = new MarkdownIt();

const content = ref(`# 1
## Node.js 安装
既然我们是使用 node.js 作为服务端，那么 node.js 的环境肯定是少不了的，在 centos 中安装 node.js 也很方便，执行以下命令安装：

## Apache APISIX 安装
Apache APISIX 使用源码安装的话比较麻烦，所以我推荐使用 进行安装，所以我们得安装，安装方式可以参考菜鸟教程的这两篇文章：

 [#CentOS Docker 安装](https://www.runoob.com/docker/centos-docker-install.html) 
 
 [# Docker Compose](https://www.runoob.com/docker/docker-compose.html)
 
 在  都安装完成后，我们可以开始进行 Apache APISIX 的安装，执行以下命令就可以将 Apache APISIX 相关的容器启动，启动的具体容器可以参考这个文件 [apisix-docker github仓库](https://github.com/apache/apisix-docker/blob/master/example/docker-compose.yml)，其中是包括了 apisix 和 apisix dashboard 这两个服务容器的。`);
const markdownContent = ref("");
const complieData = ref<any>([]);

watch(
    () => content.value,
    () => {
        markdownContent.value = md.render(content.value);
        complieData.value = complieAst(md.parse(content.value, {}));
    }
);
</script>

<style lang="scss" scoped>
.main-container {
    display: flex;
    .preview-container,
    .input-container {
        width: 50%;
        padding: 10px;
        margin: 0;
        height: 100vh;
        overflow: scroll;
    }

    .preview-container {
        border: whitesmoke 1px solid;
    }
}
:deep(.arco-collapse-item-content) {
    padding-left: 14px;
}
</style>
