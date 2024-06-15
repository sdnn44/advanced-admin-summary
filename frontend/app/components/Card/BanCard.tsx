import LineChartPlaytime from '../Chart/LineChartPlaytime'
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import { PlaytimeType } from '@/app/types/PlaytimeType';

export default function BanCard({ playtime, adminNickname }: { playtime: PlaytimeType[], adminNickname: string }) {

  dayjs.locale('pl');
  const currentMonthName = dayjs().format('MMMM').toLowerCase();

  const playtimes = adminNickname === 'StrefaSkilla' ? [9999999] : playtime.map(entry => entry.playtime);
  const totalPlaytime = playtimes.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div className='w-full h-72 p-3 md:p-4 rounded-xl bg-gradient-to-l from-slate-800 to-slate-950'>
      {adminNickname === 'StrefaSkilla' ?
        <div className='flex justify-center items-center h-full'>
          <h2 className='text-center text-xl font-bold text-[#8884d8]'>To plugin, on nie ma wykresu.</h2>
        </div>
        :
        <>
          <div className='relative'>
            <h2 className='text-center text-lg md:text-xl text-[#8884d8]'>W miesiącu {currentMonthName} rozegrano <span className='font-bold'>{totalPlaytime}</span> minut.</h2>
            <svg className='absolute left-10 top-0 moving-svg hidden md:block' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" width={40} height={40} xmlSpace="preserve"><path style={{ fill: '#5b5d6e' }} d="m318.983 321.141 106.113-21.33c5.414-1.088 6.883-8.137 2.353-11.296L180.05 115.949l25.259 300.578c.463 5.503 7.296 7.767 10.953 3.629l71.66-81.115 89.141 154.687c4.682 8.123 14.792 12.157 23.342 8.309 9.833-4.426 13.476-16.217 8.228-25.323l-89.65-155.573z" /><path style={{ fill: '#464655' }} d="m287.923 339.039 89.141 154.687c4.682 8.123 14.792 12.157 23.342 8.309 9.833-4.426 13.476-16.217 8.228-25.323L318.982 321.14l106.113-21.33c5.414-1.088 6.883-8.137 2.353-11.296l-11.785-8.221-150.611 13.692a17.924 17.924 0 0 1-18.265-11.194L180.05 115.949l25.259 300.578c.463 5.503 7.296 7.767 10.953 3.629l71.661-81.117z" /><path d="M444.301 290.025 184.857 109.059a8.403 8.403 0 0 0-13.179 7.594l26.489 315.212a8.402 8.402 0 0 0 14.669 4.86l73.644-83.361 83.815 145.443c3.511 6.093 9.184 10.454 15.975 12.278a26.162 26.162 0 0 0 19.979-2.614c6.093-3.511 10.454-9.184 12.279-15.975 1.825-6.791.897-13.887-2.614-19.979L332.1 327.073l109.051-21.919a8.402 8.402 0 0 0 3.15-15.129zm-126.974 22.878a8.4 8.4 0 0 0-5.624 12.433l89.652 155.573a9.471 9.471 0 0 1 .946 7.227 9.455 9.455 0 0 1-4.441 5.778 9.462 9.462 0 0 1-7.227.945 9.461 9.461 0 0 1-5.778-4.441l-89.652-155.573a8.4 8.4 0 0 0-13.577-1.369l-68.361 77.381-23.342-277.777 228.633 159.476-101.229 20.347zM180.05 79.54a8.402 8.402 0 0 0 8.402-8.402V8.402a8.402 8.402 0 0 0-16.804 0v62.736a8.402 8.402 0 0 0 8.402 8.402zM225.421 115.949a8.402 8.402 0 0 0 8.402 8.402h53.774a8.402 8.402 0 0 0 0-16.804h-53.774a8.402 8.402 0 0 0-8.402 8.402zM143.642 115.949a8.402 8.402 0 0 0-8.402-8.402H72.504a8.402 8.402 0 0 0 0 16.804h62.736a8.401 8.401 0 0 0 8.402-8.402zM128.956 52.973a8.402 8.402 0 0 0-11.882 11.882l25.349 25.349a8.377 8.377 0 0 0 5.941 2.461 8.402 8.402 0 0 0 5.941-14.343l-25.349-25.349zM142.423 141.695l-25.349 25.349a8.402 8.402 0 0 0 11.882 11.882l25.349-25.349a8.402 8.402 0 0 0 0-11.882 8.4 8.4 0 0 0-11.882 0zM211.737 92.665c2.15 0 4.301-.82 5.941-2.461l25.349-25.349a8.402 8.402 0 0 0-11.882-11.882l-25.349 25.349a8.402 8.402 0 0 0 5.941 14.343z" /></svg>
          </div>
          <LineChartPlaytime adminPlaytime={playtime} />
        </>
      }
      {/* <div className='border-2 border-sky-500 w-16 h-16'>
      
      </div> */}
    </div>
  )
}
