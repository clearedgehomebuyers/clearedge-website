import { describe, expect, it } from 'vitest'
import {
  calculateTraditionalSaleScenario,
  calculateWrittenCashNet,
  compareRoundedNetEstimates,
} from './calculator-comparison'

describe('compareRoundedNetEstimates', () => {
  it('compares the same rounded amounts displayed to the visitor', () => {
    expect(compareRoundedNetEstimates(100.49, 100.4)).toEqual({
      traditionalNet: 100,
      cashNet: 100,
      difference: 0,
      winner: 'tie',
    })
  })

  it('identifies a traditional-sale advantage', () => {
    expect(compareRoundedNetEstimates(120_000.7, 110_000.2)).toEqual({
      traditionalNet: 120_001,
      cashNet: 110_000,
      difference: 10_001,
      winner: 'traditional',
    })
  })

  it('identifies a cash-sale advantage when both estimates are negative', () => {
    expect(compareRoundedNetEstimates(-25_000.2, -10_000.4)).toEqual({
      traditionalNet: -25_000,
      cashNet: -10_000,
      difference: 15_000,
      winner: 'cash',
    })
  })

  it('uses only the explicit traditional-sale costs supplied by the visitor', () => {
    expect(calculateTraditionalSaleScenario({
      moveInReadyValue: 300_000,
      repairs: 20_000,
      agentCompensationPercent: 5,
      sellerTransferTaxPercent: 1,
      otherSellerSettlementCosts: 750,
      inspectionConcessions: 0,
      holdingMonths: 2,
      monthlyHoldingCosts: 500,
      mortgagePayoff: 100_000,
    })).toEqual({
      agentCompensation: 15_000,
      sellerTransferTax: 3_000,
      holdingCosts: 1_000,
      netProceeds: 160_250,
    })
  })

  it('nets a written cash offer without hidden deductions', () => {
    expect(calculateWrittenCashNet(210_000, 100_000, 2_500)).toBe(107_500)
  })
})
