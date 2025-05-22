import { Dialog, DialogPanel } from '@headlessui/react'
import React from 'react'

type Props = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    viewDetails: any
}
export default function CustomerViewModal({ isOpen, setIsOpen, viewDetails }: Props) {
    console.log("viewDetails::::", viewDetails)
    function close() {
        setIsOpen(false)
    }

    return (
        <>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <div className=''>
                                <p> {viewDetails?.customerName}</p>
                                <p>{viewDetails?.email}</p>
                                <p>{viewDetails?.telephone}</p>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
