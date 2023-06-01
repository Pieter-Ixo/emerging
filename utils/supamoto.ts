import { CHART_DATA } from '@components/chart/chart';
import { ArrayElement } from 'types/general';
import { STOVE_PELLETS_CONTENT, STOVE_PERIODS, STOVE_SESSIONS_CONTENT } from 'types/stove';
import { dynamicSort } from './general';

export const roundNumber = (num: number, scale: number) => {
	if (!('' + num).includes('e')) {
		return +(Math.round((num + 'e+' + scale) as unknown as number) + 'e-' + scale);
	} else {
		var arr = ('' + num).split('e');
		var sig = '';
		if (+arr[1] + scale > 0) {
			sig = '+';
		}
		return +(Math.round((+arr[0] + 'e' + sig + (+arr[1] + scale)) as unknown as number) + 'e-' + scale);
	}
};

export const hoursSaved = (totalPelletsPurchased: number) => roundNumber(totalPelletsPurchased * 0.5, 4);

export const lifeYearsSaved = (totalPelletsPurchased: number) => roundNumber(totalPelletsPurchased * 0.0001, 4);

export const datesFromPeriod = (period: STOVE_PERIODS) => {
	const now = new Date();
	let fromDate = new Date();
	// to make offset by one in future as graphps is from current midnight (future) for past day
	now.setDate(now.getDate() + 1);

	switch (period) {
		case STOVE_PERIODS.daily:
			fromDate.setDate(now.getDate() - 1);
			break;
		case STOVE_PERIODS.weekly:
			fromDate.setDate(now.getDate() - 7);
			break;
		case STOVE_PERIODS.monthly:
			fromDate.setMonth(now.getMonth() - 1);
			break;
		case STOVE_PERIODS.yearly:
			fromDate.setFullYear(now.getFullYear() - 1);
			break;
		default:
			fromDate.setFullYear(2000);
			break;
	}
	return { endDate: now, endDateISOString: now.toISOString().slice(0, 10), startDate: fromDate, startDateISOString: fromDate.toISOString().slice(0, 10) };
};

export const formatSessions = (sessions: STOVE_SESSIONS_CONTENT[], period: STOVE_PERIODS, dataFormatter?: (val: number) => number): CHART_DATA => {
	const valueFormatter = dataFormatter || ((v: number) => v);
	const { endDate, startDate } = datesFromPeriod(period);
	const endDateMilliseconds = endDate.getTime();
	const startDateMilliseconds = startDate.getTime();
	let date = 0;
	const ses = sessions
		.filter(s => {
			date = Date.parse(s.startDateTime!);
			return startDateMilliseconds < date && date < endDateMilliseconds;
		})
		.map(s => ({
			time: s.startDateTime!.slice(0, 10),
			value: 1,
		}))
		.sort(dynamicSort('time'));

	let finalSessions: CHART_DATA = [];
	let prevSession: ArrayElement<CHART_DATA>;
	ses.forEach((s, i) => {
		if (i === 0) return (prevSession = s);
		else {
			if (s.time === prevSession.time) return (prevSession = { ...prevSession, value: prevSession.value + s.value });
			else {
				finalSessions.push({ ...prevSession, value: valueFormatter(prevSession.value) });
				prevSession = s;
			}
		}
	});
	// @ts-ignore
	if (prevSession) finalSessions.push({ ...prevSession, value: valueFormatter(prevSession.value) });

	return finalSessions;
};

export const formatPellets = (pellets: STOVE_PELLETS_CONTENT[], period: STOVE_PERIODS, dataFormatter?: (val: number) => number): CHART_DATA => {
	const valueFormatter = dataFormatter || ((v: number) => v);
	const { endDate, startDate } = datesFromPeriod(period);
	const endDateMilliseconds = endDate.getTime();
	const startDateMilliseconds = startDate.getTime();
	let date = 0;
	const ses = pellets
		.filter(s => {
			date = Date.parse(s.dateTime!);
			return startDateMilliseconds < date && date < endDateMilliseconds;
		})
		.map(s => ({
			time: s.dateTime!.slice(0, 10),
			value: s.pelletsAmount!,
		}))
		.sort(dynamicSort('time'));

	let finalPellets: CHART_DATA = [];
	let prevPellet: ArrayElement<CHART_DATA>;
	ses.forEach((s, i) => {
		if (i === 0) return (prevPellet = s);
		else {
			if (s.time === prevPellet.time) return (prevPellet = { ...prevPellet, value: prevPellet.value + s.value });
			else {
				finalPellets.push({ ...prevPellet, value: valueFormatter(prevPellet.value) });
				prevPellet = s;
			}
		}
	});
	// @ts-ignore
	if (prevPellet) finalPellets.push({ ...prevPellet, value: valueFormatter(prevPellet.value) });

	return finalPellets;
};
