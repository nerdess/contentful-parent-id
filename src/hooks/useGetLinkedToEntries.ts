import { useEffect, useState } from 'react';
import { Entry } from '@contentful/app-sdk';
import useCMA from './useCMA';

type GetEntriesHookResult = {
	isLoading: boolean;
	entries: Entry[];
};

const useGetLinkedToEntries = (id: string): GetEntriesHookResult => {

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [entries, setEntries] = useState<Entry[]>([]);
	const { environment } = useCMA();

	useEffect(() => {
		if (!environment || !id) return;

		setIsLoading(true);

		environment
			.getEntries({
				links_to_entry: id,
			})
			.then((entries) => {
				setIsLoading(false);
                console.log('entries in hook', entries.items);
				setEntries(entries.items);
			});

		return () => setIsLoading(false);
	}, [id, environment]);

	return {
		isLoading,
		entries,
	};
};

export default useGetLinkedToEntries;
