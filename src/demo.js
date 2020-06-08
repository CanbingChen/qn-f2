import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import F2Canvas from '@/components/chart'
import styles from './baseLayout.less'

export default class Index extends Component {
  onInitChart = (F2, config) => {
    const chart = new F2.Chart(config);
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];
    
    // Step 2: 载入数据源
    chart.source(data);
    
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval()
      .position('genre*sold')
      .color('genre');
    chart.render();
    // 注意：需要把chart return 出来
    return chart;
  }

  render() {
    return (
      <View className='index'>
        <View>
          <F2Canvas width={1000} height={300}  onInit={this.onInitChart} />
        </View>
      </View>
    )
  }
}
