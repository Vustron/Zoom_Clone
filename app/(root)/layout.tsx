import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
	return <main>{children}</main>;
}
