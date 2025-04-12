
import { createContext, useContext, useState, useEffect } from 'react';
import {fetchChats} from '@/lib/api';


type ContactsContextType = {
    contacts: any; // nên thay `any` bằng kiểu cụ thể nếu có
    isLoading: boolean;
    error: string | null;
    setContacts: React.Dispatch<React.SetStateAction<any>>;
};
const ContactsContext = createContext<ContactsContextType | undefined>(undefined);
export function ContactsProvider({ children }: { children: React.ReactNode }) {
    const [contacts, setContacts] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadContacts = async () => {
            try {
                setIsLoading(true);
                const fetchedContacts = await fetchChats();
                setContacts(fetchedContacts);
                localStorage.setItem('cachedContacts', JSON.stringify(fetchedContacts));
            } catch (err: any) {
                console.error('Failed to load contacts:', err);
                setError(err.message);

                const cached = localStorage.getItem('cachedContacts');
                if (cached) {
                    try {
                        setContacts(JSON.parse(cached));
                    } catch (e) {
                        console.error('Failed to parse cached contacts:', e);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadContacts();
    }, []);

    return (
        <ContactsContext.Provider value={{ contacts, isLoading, error, setContacts }}>
            {children}
        </ContactsContext.Provider>
    );
}


export function useContacts() {
    const context = useContext(ContactsContext);
    if (context === undefined) {
        throw new Error("useContacts must be used within a ContactsProvider");
    }
    return context;
}