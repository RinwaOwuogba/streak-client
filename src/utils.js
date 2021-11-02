import isSameDay from 'date-fns/isSameDay';

const hasActivityOnDate = (entries, targetDate) =>
	entries.find((entry) =>
		isSameDay(new Date(entry.createdAt), new Date(targetDate))
	);

export default hasActivityOnDate;
