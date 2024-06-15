"use client"
import { useGlobalState } from '@/app/context/globalContextProvider'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { motion } from 'framer-motion'
import React from 'react'
import Loader from '../Loader/Loader'
import Table from '../Table/Table'

type Props = {}

export default function Dashboard({ }: Props) {
  const { isLoading, searchedAdmin } = useGlobalState();

  return (
    <div className='h-screen w-full p-4 lg:fixed lg:left-24'>
      {searchedAdmin ? (
        isLoading ? <div className='h-full w-full justify-center items-center'><Loader /></div> : <></>
      ) : (
        <div className='flex items-center justify-center h-full w-full'>
          {/* <h2 className='text-3xl opacity-50'>Wybierz admina z listy, żeby wyświetlić jego statystyki.</h2>
           */}
          <HeroHighlight>
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
            >
              Wybierz{" "}
              <Highlight className="text-white">
                admina
              </Highlight>
              {" "}z listy, żeby wyświetlić jego statystyki.
            </motion.h1>
          </HeroHighlight>
        </div>
      )
      }
    </div>
  )
}