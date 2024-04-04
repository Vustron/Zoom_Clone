import { cn } from '@/lib/utils';
import Image from 'next/image';

interface HomeCardProps {
	className: string;
	img: string;
	title: string;
	description: string;
	handleClick: () => void;
}

const HomeCard = ({
	className,
	img,
	title,
	description,
	handleClick,
}: HomeCardProps) => {
	return (
		<div
			onClick={handleClick}
			className={cn(
				`px-4 py-6 flex flex-col justify-between w-full xl:max-w-[300px] min-h-[260px] rounded-[14px] cursor-pointer`,
				className
			)}
		>
			<div className='flex-center glassmorphism size-12 rounded-[10px]'>
				<Image src={img} width={27} height={27} alt='meeting' />
			</div>

			<div className='flex flex-col gap-2'>
				<h1 className='text-2xl font-bold'>{title}</h1>
				<p className='text-md font-normal'>{description}</p>
			</div>
		</div>
	);
};

export default HomeCard;
