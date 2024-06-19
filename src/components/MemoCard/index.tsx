import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import type { MemoEntity } from '@/types/memo'
import { getFullTime } from '../../utils/day'
import { SelectedTagsList } from '../ui/selected-tags-list'
import { cn } from '@/lib/utils'

interface MemoCardProps {
  memo: MemoEntity
  className?: string
}

export const MemoCard: React.FC<MemoCardProps> = ({ memo, className }) => {
  return (
    <Card className={cn(className, 'hover:shadow-lg cursor-pointer')}>
      <CardHeader>
        <CardDescription>{getFullTime(memo.createdTime)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: memo.content }} />
      </CardContent>
      <CardFooter>
        <SelectedTagsList tags={[]} cardTags={memo.tags} />
      </CardFooter>
    </Card>
  )
}
