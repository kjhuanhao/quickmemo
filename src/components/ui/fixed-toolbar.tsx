import { withCn } from '@udecode/cn'

import { Toolbar } from './toolbar'
import React from 'react'

export const FixedToolbar = React.memo(withCn(Toolbar, 'absolute left-1 right-1 bottom-1 justify-between bg-card'))
