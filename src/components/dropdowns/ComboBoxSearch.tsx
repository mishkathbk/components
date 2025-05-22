import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'
import React from 'react'

type Props = {
  searchArray: string[]
  selected: string,
  onSelect: (value: string) => void,
}

export default function ComboBoxSearch({ searchArray, onSelect, selected }: Props) {
  const [query, setQuery] = useState('')
  // const [selected, setSelected] = useState("")
  const filtered = searchArray?.filter((item) => {
    return item.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={(value) => { onSelect(value!) }} onClose={() => setQuery('')}  >
        <div className="relative border rounded-sm" >
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border-none border-black py-1.5 pr-8 pl-3 text-sm/6 text-black',
              'focus:not-data-focus:outline-none  data-focus:-outline-offset-2 outline-0'
            )}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='item name'
          />

        </div>

        {query != "" && <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-(--input-width) rounded-xl border  bg-white p-1 [--anchor-gap:--spacing(1)] empty:invisible',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0'
          )}
        >
          {filtered.map((item) => (
            <ComboboxOption
              key={item}
              value={item}
              className="group flex cursor-default bg-white items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-gray-200"
            >
              <div className="text-sm/6 text-black">{item}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>}
      </Combobox>
    </div>
  )
}
