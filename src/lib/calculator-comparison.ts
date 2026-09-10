export type NetEstimateWinner = 'traditional' | 'cash' | 'tie'

export interface NetEstimateComparison {
  traditionalNet: number
  cashNet: number
  difference: number
  winner: NetEstimateWinner
}

export interface TraditionalSaleScenarioInput {
  moveInReadyValue: number
  repairs: number
  agentCompensationPercent: number
  sellerTransferTaxPercent: number
  otherSellerSettlementCosts: number
  inspectionConcessions: number
  holdingMonths: number
  monthlyHoldingCosts: number
  mortgagePayoff: number
}

export interface TraditionalSaleScenario {
  agentCompensation: number
  sellerTransferTax: number
  holdingCosts: number
  netProceeds: number
}

function nonNegative(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0
}

/** Calculate only the explicit traditional-sale assumptions shown in the UI. */
export function calculateTraditionalSaleScenario(
  input: TraditionalSaleScenarioInput,
): TraditionalSaleScenario {
  const moveInReadyValue = nonNegative(input.moveInReadyValue)
  const repairs = nonNegative(input.repairs)
  const agentCompensation = moveInReadyValue * (nonNegative(input.agentCompensationPercent) / 100)
  const sellerTransferTax = moveInReadyValue * (nonNegative(input.sellerTransferTaxPercent) / 100)
  const holdingCosts = nonNegative(input.holdingMonths) * nonNegative(input.monthlyHoldingCosts)

  return {
    agentCompensation,
    sellerTransferTax,
    holdingCosts,
    netProceeds: moveInReadyValue
      - repairs
      - agentCompensation
      - sellerTransferTax
      - nonNegative(input.otherSellerSettlementCosts)
      - nonNegative(input.inspectionConcessions)
      - holdingCosts
      - nonNegative(input.mortgagePayoff),
  }
}

/** Net a written cash offer using only seller costs entered by the visitor. */
export function calculateWrittenCashNet(
  offer: number,
  mortgagePayoff: number,
  sellerCosts: number,
): number {
  return nonNegative(offer) - nonNegative(mortgagePayoff) - nonNegative(sellerCosts)
}

/** Compare the same whole-dollar amounts that the visitor sees. */
export function compareRoundedNetEstimates(
  traditionalNet: number,
  cashNet: number,
): NetEstimateComparison {
  const roundedTraditionalNet = Math.round(traditionalNet)
  const roundedCashNet = Math.round(cashNet)
  const signedDifference = roundedTraditionalNet - roundedCashNet

  return {
    traditionalNet: roundedTraditionalNet,
    cashNet: roundedCashNet,
    difference: Math.abs(signedDifference),
    winner: signedDifference > 0
      ? 'traditional'
      : signedDifference < 0
        ? 'cash'
        : 'tie',
  }
}
