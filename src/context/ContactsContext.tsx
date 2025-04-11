
import { createContext, useContext, useState, useEffect } from 'react';
import {fetchChats} from '@/lib/api';


const ContactsContext = createContext("light");

export function ContactsProvider({ children }) {
    const [contacts, setContacts] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadContacts = async () => {
            try {
                setIsLoading(true);
                const fetchedContacts = await fetchChats();
                setContacts(fetchedContacts);
                // Optionally store in localStorage for persistence between page refreshes
                localStorage.setItem('cachedContacts', JSON.stringify(fetchedContacts));

                console.log(localStorage.getItem('cachedGroups'));
            } catch (err) {
                console.error('Failed to load contacts:', err);
                setError(err.message);

                // Try to load from cache if available
                const cached = localStorage.getItem('cachedContacts');
                const cachedGroups = localStorage.getItem('cachedGroups');
                if (cached && cachedGroups ) {
                    try {
                        setContacts(JSON.parse(cached));

                    } catch (e) {
                        console.error('Failed to load contacts:', err);
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
    return useContext(ContactsContext);
}