export const indexToMatrix = (index) => {
    const row = Math.floor(index / 3)
    const column = index % 3;
    return `(${row}, ${column})`
}