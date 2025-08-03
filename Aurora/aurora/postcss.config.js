export default {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 750,       // 设计稿宽度（用于vw计算）
      viewportHeight: 1334,     // 设计稿高度（用于vh计算，如iPhone 6/7/8的1334px）
      unitToConvert: 'px',      // 需要转换的单位
      viewportUnit: 'vw',       // 默认转换单位
      fontViewportUnit: 'vw',   // 字体默认单位
      // 按属性指定不同单位
      rules: [
        {
          // 宽度、水平间距等转为vw
          properties: ['width', 'padding*', 'margin*', 'left', 'right', 'font*'],
          unit: 'vw'
        },
        {
          // 高度、垂直间距等转为vh
          properties: ['height', 'top', 'bottom', 'min-height', 'max-height'],
          unit: 'vh'
        }
      ],
      selectorBlackList: ['.ignore-', '.van-'], // 忽略特定类名（按需调整）
      include: /src\/|node_modules\/react-vant/, // 强制处理 react-vant 的样式
      exclude: /node_modules\/(?!react-vant)/, // 排除其他第三方库
      minPixelValue: 1
    }
  }
};