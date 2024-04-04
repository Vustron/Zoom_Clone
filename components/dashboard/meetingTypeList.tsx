'use client';

import MeetingModal from '@/components/modals/meetingModal';
import HomeCard from '@/components/dashboard/homeCard';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const MeetingTypeList = () => {
	// init router
	const router = useRouter();

	// init state
	const [meetingState, setMeetingState] = useState<
		'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
	>();

	// meeting handler
	const createMeeting = () => {};

	return (
		<section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
			<HomeCard
				img='/icons/add-meeting.svg'
				title='New Meeting'
				description='Start an instant meeting'
				handleClick={() => setMeetingState('isInstantMeeting')}
				className='bg-orange-1'
			/>
			<HomeCard
				img='/icons/schedule.svg'
				title='Schedule Meeting'
				description='Plan your meeting'
				handleClick={() => setMeetingState('isScheduleMeeting')}
				className='bg-blue-1'
			/>
			<HomeCard
				img='/icons/recordings.svg'
				title='View Recordings'
				description='Check out your recordings'
				handleClick={() => router.push('/recordings')}
				className='bg-purple-1'
			/>
			<HomeCard
				img='/icons/join-meeting.svg'
				title='Join Meeting'
				description='via invitation link'
				handleClick={() => setMeetingState('isJoiningMeeting')}
				className='bg-yellow-1'
			/>

			<MeetingModal
				isOpen={meetingState === 'isInstantMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Start an Instant Meeting'
				className='text-center'
				buttonText='Start Meeting'
				handleClick={() => setMeetingState('isJoiningMeeting')}
			/>
		</section>
	);
};

export default MeetingTypeList;
