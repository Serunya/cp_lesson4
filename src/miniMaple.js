class MiniMaple {
    
    diff(expression = '', variable) {
        if (!this.isValidExpression(expression))
            throw ('Invalid operation');
    
        const variableRegex = new RegExp(`(-?\\d*)\\*?${variable}\\^?(\\d*)`);
        const terms = expression.split(/\s*([\+\-])\s*/).filter(term => term);
    
        const deriveTerm = (term) => {
            const match = term.match(variableRegex);
            if (!match) {
                return term.includes(variable) ? term : '0';
            }
    
            let coefficient = match[1] === '' ? 1 : parseInt(match[1], 10);
            let exponent = match[2] === '' ? 1 : parseInt(match[2], 10);
    
            if (isNaN(coefficient) || isNaN(exponent)) return term;
            if (exponent === 0) return ''; 
    
            coefficient *= exponent;
            exponent -= 1;
    
            return exponent === 0 ? `${coefficient}` : `${coefficient}*${variable}${exponent > 1 ? `^${exponent}` : ''}`;
        };
    
        let result = '';
        for (let i = 0; i < terms.length; i++) {
            if (i % 2 === 1) {
                result += ` ${terms[i]} `;
            } else {
                const derived = deriveTerm(terms[i]);
                if (derived !== '0') {
                    result += derived;
                } else if (i === 0 || terms[i - 1] !== '-') {
                    result += derived;
                }
            }
        }
    
        result = result.trim()
            .replace(/\s*\+\s*0/g, '') 
            .replace(/\s*\-\s*0/g, '')  
            .replace(/^\s*0\s*[\+\-]/, '')
            .replace(/\s*[\+\-]\s*$/, '');
    
        return result || '0';
    }
    
    
    

    isValidExpression(expression) {
        const validRegex = /^[0-9a-zA-Z\^\*\+\-\s]+$/;
        return validRegex.test(expression)
    }
}



window.MiniMaple = MiniMaple;