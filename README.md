# 用法

```shell
# 添加页面(umi g page <pageName>)
umi g page user

# 添加 model 文件(umi g dva:model <modelName>)
umi g dva:model user
```

## 项目常用场景总结

### react+dva 用户离开，路由拦截，提示用户暂未保存

参考:

1. https://www.icode9.com/content-4-185417.html
2. https://github.com/dvajs/dva/issues/607
3. https://segmentfault.com/a/1190000017919034

## 富文本编辑器的技术选型调研

- [summernote](https://github.com/summernote/summernote)
  **劣势:**：
  1. dialog功能，引入了bootstrap。
  2. 格式化差劲。

  **不推荐**
- [quill](https://github.com/quilljs/quill)
  **优势:**
  1. 简洁美观大方。
  2. 对于用户从各种地方粘贴过来的文字兼容得很好，不管你之前带有什么奇奇怪怪的格式，统统转化成了带有<p></p>标签的的文本。
  3. 跟 Ant Design 和 React 的融入度非常高，可以很方便的放在<Form></Form>作为一个受控组件。传入的 value 就是 HTML 字符串，不需要做任何格式转换。
  **劣势:**
  1. 图片格式是转成了base64，这跟目前项目中图片上传方式不兼容。虽然这个问题有解决方法，React-Quill中的图片上传及显示(对图片)。
  2. 不支持 Excel 格式的数据。
  3. 图片的各种操作不友善，而且很难改

  **推荐**
- [wangEditor](https://github.com/wangfupeng1988/wangEditor)
  **优势:**
  1. 简单
  2. 对于粘贴过来的文字会丢失某些格式
  **劣势:**
  1. 个人开发
  2. 配置型和丰富性不足

  **不推荐**
- [百度 UEditor](http://ueditor.baidu.com/website/index.html)
  **优势:**
  1. 兼容IE8
  2. 对于粘贴过来的文字兼容性很好
  **劣势:**
  1. UI样式过于简陋
  2. 官方很久没有更新过了

  **不推荐**
- [slate](https://github.com/ianstormtaylor/slate)
  **优势:**
  1.  可定制化程度高
  **劣势:**
  1. 只是暴露了底层的接口，不能直接拿来使用

  **不推荐**
- [tinymce](https://github.com/tinymce/tinymce)
  **优势:**
  **劣势:**
  1. bug太多

  **不推荐**
- [braft-editor](https://github.com/margox/braft-editor)
  **优势:**
  1. 国人开发
  2. 对中文支持较好
  3. 和antd结合较好
  **劣势:**
  1. bug太多,坑多
  2. 插入多个图片不对齐

  **不推荐**

## 文档

1. https://github.com/xiaohuoni/umi-antd-pro
