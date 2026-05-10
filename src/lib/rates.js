// BackdPayments rate sheet — Approval Tier 1.
//
// Rates are dimensionless multipliers (Payback ÷ Purchase Price).
// `payment = purchase_price × rate ÷ #_of_payments`.
//
// Term      Freq    #Payments  Rate
// 1 month   Net 30  1          1.000  (interest-free)
// 1 month   weekly  4          1.000
// 2 months  monthly 2          1.015
// 2 months  weekly  8          1.010
// 3 months  monthly 3          1.030
// 3 months  weekly  13         1.025
// 6 months  monthly 6          1.075
// 6 months  weekly  26         1.065
// 9 months  monthly 9          1.120
// 9 months  weekly  39         1.110
// 12 months monthly 12         1.170
// 12 months weekly  52         1.160
// 18 months monthly 18         1.250
// 18 months weekly  78         1.240
// 24 months monthly 24         1.330  ← lowest monthly payment ("as low as")
// 24 months weekly  104        1.320

export const TIER_1 = {
  netThirty: { months: 1, payments: 1, rate: 1.0 },
  asLowAs: { months: 24, payments: 24, rate: 1.33 },
};

// Lowest monthly payment achievable on Tier 1 — the value behind
// "as low as $X.XX/mo" on PDP and cart inserts.
export function asLowAsMonthlyCents(totalCents) {
  const { rate, payments } = TIER_1.asLowAs;
  return Math.round((totalCents * rate) / payments);
}

export function netThirtyTotalCents(totalCents) {
  return Math.round(totalCents * TIER_1.netThirty.rate);
}
