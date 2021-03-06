export let calculateMonthlyPayment = (principal, years, rate) => {
    let monthlyRate = 0;
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    return {principal, years, rate, monthlyPayment, monthlyRate};
    // Creating Objects from Variables ## ES6
    // shorted for the following ES5 syntax
    // return { principal: principal,
    //      years: years,
    //      rate: rate,
    //      monthlyPayment: monthlyPayment,
    //      monthlyRate: monthlyRate };
};
export let calculateAmortization = (principal, years, rate) => {
    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);
    let balance = principal;
    let amortization = [];
    for (let y=0; y<years; y++) {
        let interestY = 0; // Interest payment for year y
        let principalY = 0; // principal payment for year y
        for (let m=0; m<12; m++) {
            let interestM = balance * monthlyRate; // Interest payment for month m
            let principalM = monthlyPayment - interestM; //principal payment for month m
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({principalY, interestY, balance})
    }
    return {monthlyPayment, monthlyRate, amortization};
};
