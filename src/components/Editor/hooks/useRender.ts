import { ref, watch } from "vue";
import MarkdownIt from "markdown-it";
import complieAst from "../complieAst";
const md: MarkdownIt = new MarkdownIt();

export default function useComplie() {
    const content = ref(`# Docker 安装
## Node.js 安装
既然我们是使用 node.js 作为服务端，那么 node.js 的环境肯定是少不了的，在 centos 中安装 node.js 也很方便，执行以下命令安装：

## Apache APISIX 安装
Apache APISIX 使用源码安装的话比较麻烦，所以我推荐使用 进行安装，所以我们得安装，安装方式可以参考菜鸟教程的这两篇文章：

 [#CentOS Docker 安装](https://www.runoob.com/docker/centos-docker-install.html) 
 
 [# Docker Compose](https://www.runoob.com/docker/docker-compose.html)
 
 在  都安装完成后，我们可以开始进行 Apache APISIX 的安装，执行以下命令就可以将 Apache APISIX 相关的容器启动，启动的具体容器可以参考这个文件 [apisix-docker github仓库](https://github.com/apache/apisix-docker/blob/master/example/docker-compose.yml)，其中是包括了 apisix 和 apisix dashboard 这两个服务容器的。

## Node.js 安装
既然我们是使用 node.js 作为服务端，那么 node.js 的环境肯定是少不了的，在 centos 中安装 node.js 也很方便，执行以下命令安装：

## Apache APISIX 安装
Apache APISIX 使用源码安装的话比较麻烦，所以我推荐使用 进行安装，所以我们得安装，安装方式可以参考菜鸟教程的这两篇文章：

 [#CentOS Docker 安装](https://www.runoob.com/docker/centos-docker-install.html) 
 
 [# Docker Compose](https://www.runoob.com/docker/docker-compose.html)
 
 在  都安装完成后，我们可以开始进行 Apache APISIX 的安装，执行以下命令就可以将 Apache APISIX 相关的容器启动，启动的具体容器可以参考这个文件 [apisix-docker github仓库](https://github.com/apache/apisix-docker/blob/master/example/docker-compose.yml)，其中是包括了 apisix 和 apisix dashboard 这两个服务容器的。
 `);
    const markdownContent = ref("");
    const complieData = ref<any>([]);

    watch(
        () => content.value,
        () => {
            complieData.value = complieAst(md.parse(content.value, {}));
        },
        { immediate: true }
    );

    return { content, markdownContent, complieData }
}