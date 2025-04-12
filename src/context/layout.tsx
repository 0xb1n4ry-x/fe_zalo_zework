import { ReactNode } from "react";
import { ContactsProvider } from './ContactsContext';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <ContactsProvider>
            {children}
        </ContactsProvider>
    );
}
