import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return <div className='flex items-center justify-center h-screen flex-col gap-7'>
        <h1 className='md:flex text-center flex-row items-center gap-1 text-2xl'>Wystąpił błąd - wybrana strona <span className='text-[#8884d8]'> nie istnieje :( </span></h1>
        <div>
            <Button className="rounded-xl bg-[#8884d8] hover:bg-[#a6a1f7] text-white hover:text-white/90 duration-300 ease-in-out">
                <Link href="/">Wróć do strony głównej</Link>
            </Button>
        </div>
    </div>
}