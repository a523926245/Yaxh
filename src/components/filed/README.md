## API

### Image Props

| Attribute | Description | Type | Default |
|------|------|------|------|
| url | 图片资源路径 | `string` | - |
| showLoading | 是否开启加载提示 | `string` | false |
| fit | 图片填充模式 | `string` | `none` |
| width | 图片宽度 | `string | number` | - |
| height | 图片高度 | `string | number` | - |

### Image fit
| Attribute | Description 
|------|------|------|------|
| contain  | 保持宽高缩放图片，使图片的长边能完全显示出来
| cover | 保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边
| fill | 拉伸图片，使图片填满元素
| none | 保持图片原有尺寸
| scale-down | 取none或contain中较小的一个

### Image slot
| slotName | Description 
|------|------|------|------|
| loading  | 图片加载中自定义slot

### Image Event
| click  | 图片点击事件
| loaded  | 图片加载完成事件
| error  | 图片加载出错事件