import { StorageStrategy } from './abstract'
import { LocalStorageUtils } from './localStorage'

type strategyType = 'local' | 'cloud'

export class StorageStrategyFactory {
  public static createStorage(strategyType: strategyType): StorageStrategy {
    switch (strategyType) {
      case 'local':
        return LocalStorageUtils.getInstance()
      default:
        throw new Error(`Unsupported strategy type: ${strategyType}`)
    }
  }
}
