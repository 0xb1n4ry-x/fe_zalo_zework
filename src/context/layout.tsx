import { ContactsProvider } from './ContactsContext';

export default function Layout({ children }) {
    return (
        <ContactsProvider>
            {children}
        </ContactsProvider>
    );
}