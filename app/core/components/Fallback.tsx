import { UsersIcon } from "@heroicons/react/solid"
import * as React from "react"
import Image from "next/image"
interface IFallbackProps {}

const Fallback: React.FunctionComponent<IFallbackProps> = (props) => {
  return (
    <div>
      <div className="relative bg-white">
        <div className="h-56 bg-gray-700 rounded animate-pulse sm:h-72 lg:absolute lg:left-0 lg:w-1/2 lg:h-full"></div>
        <div className="relative py-8 px-4 mx-auto max-w-7xl sm:py-12 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-2xl lg:pl-10 lg:mr-0 lg:ml-auto lg:w-1/2 lg:max-w-none">
            <div>
              <div className="flex justify-center items-center w-12 h-12 text-white rounded-md bg-primary-500">
                <UsersIcon className="w-6 h-6" aria-hidden="true" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">Stats</h2>
            <p className="mt-6 text-lg text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore nihil ea rerum ipsa.
              Nostrum consectetur sequi culpa doloribus omnis, molestiae esse placeat,
              exercitationem magnam quod molestias quia aspernatur deserunt voluptatibus.
            </p>
            <div className="overflow-hidden mt-8">
              <dl className="flex flex-wrap -mx-8 -mt-8">
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base font-medium text-gray-500">Users</dt>
                  <dd className="order-1 text-2xl font-extrabold animate-pulse sm:text-3xl text-primary-600">
                    Loading ...
                  </dd>
                </div>
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base font-medium text-gray-500">Coffees</dt>
                  <dd className="order-1 text-2xl font-extrabold animate-pulse sm:text-3xl text-primary-600">
                    Loading ...
                  </dd>
                </div>
                {/*
              <div className="flex flex-col px-8 pt-8">
                <dt className="order-2 text-base font-medium text-gray-500">Cards</dt>
                <dd className="order-1 text-2xl font-extrabold sm:text-3xl text-primary-600">
                  {cardCount}
                </dd>
              </div> */}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fallback
