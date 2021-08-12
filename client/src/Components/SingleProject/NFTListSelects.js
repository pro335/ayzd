/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const people = [
  { id: 1, name: 'Option' },
  { id: 2, name: 'Option 1' },
  { id: 3, name: 'Option 2' },
  { id: 4, name: 'Option 3' },
  { id: 5, name: 'Option 4' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NFTListSelects() {
  const [selected, setSelected] = useState(people[0])

  return (
    <div className="h-full overflow-y-scroll p-4">
      {
        [...Array(12).keys()].map((item, index) =>
          <div key={index}>
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium ">Parameter</Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="bg-brand-gray-800 relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none text-sm">
                      <span className="block truncate text-brand-gray-300">{selected.name}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <SelectorIcon className="h-5 w-5 text-brand-gray-500" aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        static
                        className="absolute z-10 mt-1 w-full bg-brand-gray-800 shadow-lg max-h-40 rounded-md py-1 overflow-auto focus:outline-none text-sm"
                      >
                        {people.map((person, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-brand-gray-400' : 'font-bold',
                                'text-brand-gray-300 cursor-default select-none relative onHover py-2 pl-3 pr-9'
                              )
                            }
                            value={person}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                  {person.name}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        )
      }
    </div>
  )
}
