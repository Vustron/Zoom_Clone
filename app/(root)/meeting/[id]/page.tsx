'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Loader from '@/components/ui/loader';
import MeetingRoom from '@/components/meeting/meetingRoom';
import { useGetCallById } from '@/lib/hooks/useGetCallById';
import MeetingSetup from '@/components/meeting/meetingSetup';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';

export default function MeetingPage({
	params: { id },
}: {
	params: { id: string };
}) {
	// fetch user
	const { user, isLoaded } = useUser();

	// init state
	const [isSetupComplete, setIsSetupComplete] = useState(false);

	// call hook
	const { call, isCallLoading } = useGetCallById(id);

	if (!isLoaded || isCallLoading) return <Loader />;

	return (
		<main className='h-screen w-full'>
			<StreamCall call={call}>
				<StreamTheme>
					{!isSetupComplete ? (
						<MeetingSetup setIsSetupComplete={setIsSetupComplete} />
					) : (
						<MeetingRoom />
					)}
				</StreamTheme>
			</StreamCall>
		</main>
	);
}
