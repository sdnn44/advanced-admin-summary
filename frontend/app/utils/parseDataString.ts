export const parseDateString = (dateString: string) => {
    const [datePart, timePart] = dateString.split(' - ');
    const [day, month, year] = datePart.split('.').map(part => parseInt(part, 10));
    const [hour, minute, second] = timePart.split(':').map(part => parseInt(part, 10));

    return new Date(year, month - 1, day, hour, minute, second);
};

export const dateSortingFn = (rowA: any, rowB: any, columnId: string) => {
    const dateA = parseDateString(rowA.getValue(columnId));
    const dateB = parseDateString(rowB.getValue(columnId));
    return dateB.getTime() - dateA.getTime();
};