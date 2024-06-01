import { withCn } from '@udecode/cn'

import { Toolbar } from './toolbar'
import React from 'react'

export const FixedToolbar = React.memo(withCn(Toolbar, 'justify-between bg-card'))
