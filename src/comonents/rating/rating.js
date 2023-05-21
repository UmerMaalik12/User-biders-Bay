import React from 'react'
import {Stack,Rating} from '@mui/material'
export default function rating(props) {
  return (
    <Stack spacing={2}>
        <Rating  sx={props.Style} value={props.data} readOnly={props.per} onChange={props.change} precision={props.star}></Rating>
    </Stack>
  )
}
