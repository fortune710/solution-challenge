export interface UserDetails{
    displayName: string;
    totalCarbonThisMonth: CarbonAmountForUser;
    carbonBudgetForMonth: number;
    friends?: Friend[];
    carbonHistory?: CarbonAmountForUser[];
}

export interface CarbonAmountForUser{
    month: number;
    year: number;
    carbonAmount: number;
}

export interface Friend{
    userId: string;
    displayName: string;
}