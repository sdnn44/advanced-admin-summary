export default function ProfileCard({ numberOfGivenBans, numberOfGivenDemos, numberOfGivenScreenshots }: { numberOfGivenBans: number, numberOfGivenDemos: number,/*  */ numberOfGivenScreenshots: number }) {

    return (
        <div className='rounded-xl bg-gradient-to-r from-slate-800 to-slate-950 md:w-96 w-full h-56 md:h-72 flex flex-col gap-3 md:gap-5 p-4 relative overflow-hidden'>
            <div className='flex items-center'>
                <h1 className='text-5xl md:text-7xl font-bold text-[#8884d8]'>{numberOfGivenDemos}</h1><span className='m-1 text-xl text-[#8884d8]'>dem</span>
            </div>
            <div className='flex items-center'>
                <h1 className='text-5xl md:text-7xl font-bold text-[#8884d8]'>{numberOfGivenScreenshots}</h1><span className='m-1 text-xl text-[#8884d8]'>screenshotów</span>
            </div>
            <div className='flex items-center'>
                <h1 className='text-5xl md:text-6xl font-bold text-[#8884d8]'>{numberOfGivenBans}</h1><span className='m-1 text-xl text-[#8884d8]'>banów permamentnych</span>
            </div>
            <div className='absolute bg-white w-36 h-36 -right-5 -top-5 rounded-full opacity-10' />
        </div>
    )
}
