import React, { useReducer, ReactNode, createContext } from 'react'
import { RcFile } from 'rc-upload/lib/interface'

export type UploadImageState = Record<string, { file: RcFile; url: string }>

export interface UploadImageContextType {
  state: UploadImageState
  addFile: (file: RcFile) => void
  removeFile: (file: RcFile) => void
  removeAll: () => void
}

const defaultUploadImageContext: UploadImageContextType = {
  state: {},
  addFile: () => {},
  removeFile: () => {},
  removeAll: () => {}
}

export const UploadImageContext = createContext<UploadImageContextType>(defaultUploadImageContext)

interface UploadImageProviderProps {
  children: ReactNode
}

type ActionType = 'ADD_FILE' | 'REMOVE_FILE' | 'REMOVE_ALL'

interface Action {
  type: ActionType
  payload: {
    file?: RcFile
  }
}

const reducer = (state: UploadImageState, action: Action): UploadImageState => {
  switch (action.type) {
    case 'ADD_FILE':
      return {
        ...state,
        [action.payload.file!.uid]: {
          file: action.payload.file!,
          url: URL.createObjectURL(action.payload.file!)
        }
      }
    case 'REMOVE_FILE':
      console.log(action.payload.file!.uid, 'file112212123')
      console.log({ ...state }, 'state6666')
      if (state[action.payload.file!.uid]) {
        URL.revokeObjectURL(state[action.payload.file!.uid].url)
        delete state[action.payload.file!.uid]
      }
      delete state[action.payload.file!.uid]
      return {
        ...state
      }
    case 'REMOVE_ALL':
      Object.values(state).forEach(fileState => {
        URL.revokeObjectURL(fileState.url)
      })
      return {}
    default:
      return state
  }
}

export const UploadImageProvider: React.FC<UploadImageProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {})
  const addFile = (file: RcFile) => {
    dispatch({
      type: 'ADD_FILE',
      payload: {
        file
      }
    })
  }
  const removeFile = (file: RcFile) => {
    dispatch({
      type: 'REMOVE_FILE',
      payload: {
        file
      }
    })
  }
  const removeAll = () => {
    dispatch({
      type: 'REMOVE_ALL',
      payload: {}
    })
  }

  return (
    <UploadImageContext.Provider value={{ state, addFile, removeFile, removeAll }}>
      {children}
    </UploadImageContext.Provider>
  )
}
