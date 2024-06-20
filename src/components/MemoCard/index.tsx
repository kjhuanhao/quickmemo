import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import type { MemoEntity } from '@/types/memo'
import { getFullTime } from '../../utils/day'
import { SelectedTagsList } from '../ui/selected-tags-list'
import { cn } from '@/lib/utils'
import { Icons } from '../CustomIcons'
import { MemoMorePopover } from './memoMorePopover'
import { PhotoProvider, PhotoView } from 'react-image-previewer'
import { CloseButton, SlideToolbar } from 'react-image-previewer/ui'
import { useState } from 'react'
import PlateEditor from '../Editor'

interface MemoCardProps {
  memo: MemoEntity
  className?: string
}

export const MemoCard: React.FC<MemoCardProps> = ({ memo, className }) => {
  const [status, setStatus] = useState<'info' | 'edit' | 'delete'>('info')
  const handleEdit = () => setStatus('edit')
  const handleDelete = () => setStatus('delete')

  return (
    <>
      {status === 'info' ? (
        <Card className={cn(className, 'hover:shadow-lg cursor-pointer relative')}>
          <MemoMorePopover
            className='absolute top-5 right-3 cursor-pointer'
            onEdit={handleEdit}
            onDelete={handleDelete}
          >
            <Icons.more size={20} />
          </MemoMorePopover>
          <CardHeader>
            <CardDescription>{getFullTime(memo.createdTime)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: memo.content }} />

            <div className='flex flex-row gap-3 mt-5'>
              <PhotoProvider
                overlayRender={props => (
                  <>
                    <SlideToolbar {...props} items={['arrowLeft', 'countText', 'arrowRight']} />
                    <CloseButton onClick={props.onClose} />
                  </>
                )}
              >
                <div className='flex flex-row gap-3'>
                  {memo.images.map((image, index) => (
                    <div key={index} className='relative'>
                      <PhotoView src={image}>
                        <img
                          className='w-20 h-20 rounded-md cursor-pointer object-cover border'
                          src={image}
                          alt={`preview-${index}`}
                        />
                      </PhotoView>
                    </div>
                  ))}
                </div>
              </PhotoProvider>
            </div>
          </CardContent>
          <CardFooter>
            <SelectedTagsList tags={[]} cardTags={memo.tags} />
          </CardFooter>
        </Card>
      ) : status === 'edit' ? (
        <PlateEditor html={memo.content} />
      ) : (
        <div>123</div>
      )}
    </>
  )
}
