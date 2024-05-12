import { test } from 'vitest'
import { StorageStrategyFactory } from '@/utils/storage'

test('database', async () => {
  // createDateBase()
  // const dataSource = new DataBase()
  const localStorageStrategy = StorageStrategyFactory.createStorageStrategy('local')
  localStorageStrategy.add({
    content: '',
    imageIdList: ['123', '123'],
    tag: ['123']
  })
})
