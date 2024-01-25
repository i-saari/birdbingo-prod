export const checkForWin = (lineMarks: number[], size: number) => {
    // convert to tabular array
    const tableMarks: number[][] = [];
    while (lineMarks.length) tableMarks.push(lineMarks.splice(0, size));

    // sums of the rows
    const rowSums = tableMarks.map(row =>
        row.reduce((sum, current) =>
            sum + current, 0
        ));

    // sums of the columns
    const colSums = tableMarks.reduce((sum, current) => {
        current.forEach((element, index) => {
            sum[index] = (sum[index] || 0) + element;
        })
        return sum;
    }, []);

    // sums of the diagonals
    const diag1Sum = tableMarks.reduce((sum, row, index) =>
        sum + row[index], 0
    );
    const diag2Sum = tableMarks.reduce((sum, row, index) =>
        sum + row[row.length - index - 1], 0
    );

    // check if any sums equal board size
    return (rowSums.includes(size) || colSums.includes(size) || diag1Sum === size || diag2Sum === size)
}
