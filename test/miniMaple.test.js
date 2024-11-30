import {_miniMapl} from "../src/miniMaple";


test('Valid operation + - * ^', () => {
    const diff1 = _miniMapl.diff('4*x^3', 'x')
    const diff2 = _miniMapl.diff('4*x^3', 'y')
    const diff3 = _miniMapl.diff('4*x^3 - x^2', 'x')
    const diff4 = _miniMapl.diff('4*x^2 + 5', 'x')
    const diff5 = _miniMapl.diff('x^2 + 2*x - 1', 'x')
    const diff6 = _miniMapl.diff('x^3 - 3*x^2 + 2*x - 7', 'x')
    const diff7 = _miniMapl.diff('x^3 + y^3', 'x')
    const diff8 = _miniMapl.diff('y^2 + x^2', 'y')
    expect(diff1).toBe('12*x^2')
    expect(diff2).toBe('0')
    expect(diff3).toBe('12*x^2 - 2*x')
    expect(diff4).toBe('8*x')
    expect(diff5).toBe('2*x + 2')
    expect(diff6).toBe('3*x^2 - 6*x + 2')
    expect(diff7).toBe('3*x^2')
    expect(diff8).toBe('2*y')
})

test('Not valid operation throw errors', () => {
    expect(() => _miniMapl.diff('x / y', 'x').toThrow('Invalid operation'))
    expect(() => _miniMapl.diff('x * cos(y)', 'x').toThrow('Invalid operation'))
})




// Требования
// 1. Доступные опреации + - * ^
// 2. Любые другые операции должны привести к ошибке
// (вот тут с требованием ошибка, что подразумевается под любыми другими операциями, поэтому будем отталкиваться от обратного,
// из первого требования и общего описания выводим новое требование
// 2. В выражение должны присутствовать только операции описанные в пункте 1, любые символьные воспринимаются как переменные, наличие спец символов кроме + - * ^ приводит к ошибке
// 3. Функция должна принимать полином и переменную по которой вычисляется полином