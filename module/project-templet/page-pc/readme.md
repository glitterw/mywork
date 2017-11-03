# pc端项目结构模板

## 目录结构
```bash
├── html                  # 项目页面目录
│   ├── image             # 图片资源
│   │   ├──able-del       #上线后可以删除的图片目录
│   │   ├──icon           #工具小图标目录
│   │   └── ...           #根据不同功能扩展图片目录
│   ├── css               # 样式表目录
│   │   ├──less           #less文件目录
│   │   │   ├──m-button.less       #有关button的样式表
│   │   │   ├──m-input.less        #有关输入框的样式表
│   │   │   ├──var-color.less      #颜色常量定义文件
│   │   │   ├──var-fontsize.less   #字号常量定义文件
│   │   │   └── ...                #根据需求扩展
│   │   ├──m-button.css            #对应less文件生成的.css文件
│   │   ├──m-input.css             #对应less文件生成的.css文件
│   │   ├──reset.css               #初始化文件
│   │   ├──common.css              #通用全局样式文件
│   │   ├──page-tpl.css            #对应页面的样式文件
│   │   └── ...           #根据不同功能扩展图片目录
│   ├── font              # 字体文件目录
│   ├── js                # 脚本文件目录
│   ├── page-tpl.html     # 页面模板
│   └── ...
├── psd                   # ui相关的psd目录
├── prd                   # 产品相关的需求文档、原型文件目录
├── plan                  # 开发计划文件目录
└── ...                   # 根据实际情况可以扩展目录结构

```
## less 目录使用说明
```bash
使用Sublime 安装less2css 插件后，在Package Settings->Less2Css->Settings user
打开，写入编译后的目录配置
{
"minify":false,
"outputDir": "./css",
}
```













