const getMonthUserView = (monthIndex: number) => {
	switch (monthIndex + 1) {
		case 1:
			return 'jan';
		case 2:
			return 'feb';
		case 3:
			return 'mar';
		case 4:
			return 'apr';
		case 5:
			return 'may';
		case 6:
			return 'june';
		case 7:
			return 'july';
		case 8:
			return 'aug';
		case 9:
			return 'sept';
		case 10:
			return 'oct';
		case 11:
			return 'nov';
		case 12:
			return 'dec';
		default:
			return "";
	}
}

const DateHelper = {
	oneDayOffset: (24 * 60 * 60 * 1000),
	getDateString(date: Date): string {
		let dd: number | string = date.getDate();
		let mm: number | string = date.getMonth() + 1;
		const yyyy: number | string = date.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		return (yyyy + '-' + mm + '-' + dd).toString();
	},
	convertDateTimeToUTCTime(dateTime: number): number {
		return Math.floor(dateTime / 1000);
	},
	convertUTCTimeToDate(time: number): Date {
		return new Date(time * 1000);
	},
	convertDateToUserView(date: Date): string {
		return `${date.getDate()} ${getMonthUserView(date.getMonth())} ${date.getFullYear()}`
	}

}

export default DateHelper;