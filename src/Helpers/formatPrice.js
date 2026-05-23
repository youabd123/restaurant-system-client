export function formatPrice(amount) {
    if (amount == null || isNaN(amount)) return '0.00 kr'
    return `${Number(amount).toFixed(2)} kr`
}