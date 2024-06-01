import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SelectedTagsList } from '../ui/selected-tags-list'

export default function MemoCard() {
  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle> */}
        <CardDescription>2024-02-20 22:08:46</CardDescription>
      </CardHeader>
      <CardContent>
        <p>你好，世界</p>
      </CardContent>
      <CardFooter>{/* <SelectedTagsList tags={['tag1', 'tag2', 'tag3']} /> */}</CardFooter>
    </Card>
  )
}
