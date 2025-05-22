import { DialogContent } from '@radix-ui/react-dialog'
import React from 'react'

type Props = {
    data: any
}
const CustomerViewModal = ({ data }: Props) => {
    console.log("data:::::",data)
    return (
            <DialogContent className='absolute  border-accoreBlue h-[50vh] w-[60vw]'>
                <h2>
                    {data.customerName}
                </h2>
            </DialogContent>
    )
}

export default CustomerViewModal