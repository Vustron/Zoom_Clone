'use client';

import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import MeetingModal from '@/components/modals/meetingModal';
import HomeCard from '@/components/dashboard/homeCard';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

const MeetingTypeList = () => {
	// init router
	const router = useRouter();

	// toast
	const { toast } = useToast();

	// get user
	const { user } = useUser();

	// init video client
	const client = useStreamVideoClient();

	// init state
	const [meetingState, setMeetingState] = useState<
		'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
	>();

	const [callDetails, setCallDetails] = useState<Call>();

	const [values, setValues] = useState({
		dateTime: new Date(),
		description: '',
		link: '',
	});

	// meeting handler
	const createMeeting = async () => {
		if (!client || !user) return;

		try {
			if (!values.dateTime) {
				toast({
					title: 'Please select a date and time',
				});
				return;
			}

			const id = crypto.randomUUID();

			const call = client.call('default', id);

			if (!call) throw new Error('Failed to create call');

			const startsAt =
				values.dateTime.toISOString() || new Date(Date.now()).toISOString();

			const description = values.description || 'Instant Meeting';

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			});

			setCallDetails(call);

			if (!values.description) {
				router.push(`/meeting/${call.id}`);
			}

			toast({
				title: 'Meeting created',
			});
		} catch (error) {
			console.log(error);
			toast({
				title: 'Failed to create meeting',
			});
		}
	};

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

			{/* Create meeting */}
			<MeetingModal
				isOpen={meetingState === 'isInstantMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Start an Instant Meeting'
				className='text-center'
				buttonText='Start Meeting'
				handleClick={createMeeting}
			/>
		</section>
	);
};

export default MeetingTypeList;
