

export const calcTotal = (justArticles, shipping, promo) => {
    
    // Calculate only articles + shipping
    let total = justArticles + shipping

    // Calculte with promo code
    let percent = percentage(promo, total);
     
    total = total - percent

    return total
}

export const percentage = (percent, total) => {
    return Math.round(((percent/ 100) * total))
}
