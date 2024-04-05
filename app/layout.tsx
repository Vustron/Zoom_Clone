import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Zooma',
	description: 'Zoom-Clone',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				layout: {
					logoImageUrl: '/icons/yoom-logo.svg',
					socialButtonsVariant: 'iconButton',
				},
				variables: {
					colorText: '#fff',
					colorPrimary: '#0E78F9',
					colorBackground: '#1c1f2e',
					colorInputBackground: '#252a41',
					colorInputText: '#fff',
				},
			}}
		>
			<html lang='en'>
				<body className={`${inter.className} bg-dark-2`}>
					{children}
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
