export default function MeetingPage({ params }: { params: { id: string } }) {
	return <div>Meeting Room: #{params.id}</div>;
}
