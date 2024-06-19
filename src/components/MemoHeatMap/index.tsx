import { useCallback, useEffect, useState } from 'react'
import { getSubmissionsReq } from '@/api/submissions'
import { HeatMapGrid } from 'react-grid-heatmap'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface HeatMapDataProps {
  className?: string
}
export const MemoHeatMap: React.FC<HeatMapDataProps> = ({ className }) => {
  // 获取12周的日期范围
  const getLast12Weeks = useCallback(() => {
    const now = new Date()
    const weeks = []
    for (let i = 0; i < 12; i++) {
      const startOfWeek = new Date(now)
      startOfWeek.setDate(now.getDate() - now.getDay() - i * 7)
      weeks.unshift(startOfWeek)
    }
    return weeks
  }, [])

  const generateMonthLabels = useCallback((weeks: Date[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const seenMonths = new Set()

    return weeks.map(week => {
      const monthLabel = months[week.getMonth()]
      if (seenMonths.has(monthLabel)) {
        return '\u00A0' // 不可见的空格字符
      } else {
        seenMonths.add(monthLabel)
        return monthLabel
      }
    })
  }, [])
  const [data, setData] = useState<number[][]>([])
  const [xLabels, setXLabels] = useState<string[]>([])
  const yLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  useEffect(() => {
    // 模拟从接口获取数据
    getSubmissionsReq().then(response => {
      const submissions = response

      // 获取近12周的日期范围
      const weeks = getLast12Weeks()
      const monthLabels = generateMonthLabels(weeks)
      setXLabels(monthLabels)

      // 初始化数据
      const heatmapData = new Array(7).fill(0).map(() => new Array(12).fill(0))

      // 填充数据
      submissions.forEach(submission => {
        const date = new Date(submission.submissionDate)
        const weekIndex = weeks.findIndex(
          (week: Date) => date >= week && date < new Date(week.getTime() + 7 * 24 * 60 * 60 * 1000)
        )
        if (weekIndex !== -1) {
          const dayIndex = date.getDay() - 1 // 周一到周日
          if (dayIndex >= 0 && dayIndex < 7) {
            heatmapData[dayIndex][weekIndex] = submission.status
          }
        }
      })

      setData(heatmapData)
    })
  }, [getLast12Weeks, generateMonthLabels])
  const getColor = useCallback((value: number) => {
    console.log(value)

    // TODO 暗黑模式匹配
    if (isNaN(value) || value === 0) {
      return '#F7FAFF'
    }
    const baseColor = '#6715e8'
    const alpha = value / 10 // 假设 status 最大值为 10
    return `${baseColor}${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0')}`
  }, [])

  return (
    <div className={className}>
      {/* <TooltipProvider> */}
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        // yLabels={yLabels}
        cellRender={(_x, _y, value) => {
          // const date = dayjs(new Date(getLast12Weeks()[_x].getTime() + (_y + 1) * 24 * 60 * 60 * 1000)).format(
          //   'YYYY-M-D'
          // )
          return (
            <div title={` ${value} 条Memo`} className='cursor-pointer'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger> </TooltipTrigger>
                  <TooltipContent>
                    <p>1234</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )
        }}
        xLabelsStyle={index => ({
          color: '#777',
          fontSize: '.65rem'
        })}
        yLabelsStyle={() => ({
          fontSize: '.65rem',
          textTransform: 'uppercase',
          color: '#777',
          marginTop: '2px'
        })}
        cellStyle={(_x, _y, value) => ({
          background: getColor(value),
          // padding: '1px',
          margin: '2px',
          fontSize: '1.3rem',
          color: `rgb(255, 255, 255, ${value / 20 + 0.4})`,
          minWidth: '1.3rem', // 设置单元格最小宽度
          minHeight: '1.3rem' // 设置单元格最小高度
          // border: '0px solid #ccc' // 添加边框
        })}
        cellHeight='1.2rem'
        xLabelsPos='bottom'
        // onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
      />
    </div>
  )
}
