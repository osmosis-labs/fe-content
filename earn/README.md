# Earn Strategy JSON Schema

## Overview

This JSON Schema defines the structure and constraints for describing earn strategies within our platform. Earn strategies represent various opportunities for users to earn rewards or benefits by participating in specific activities or programs offered by our platform or partner networks.

The schema is designed to capture essential details about each earn strategy, including its identifier, display name, platform provider, category, type, associated contracts, data endpoints, duration, risk level, start date and time, visibility status, messaging, and the assets involved.

### Properties

- **id**: Unique identifier for the strategy.
- **name**: Display name for the strategy.
- **platform**: Platform providing the earn strategy.
- **category**: Broad category classification for the strategy.
- **type**: Further classification of the strategy.
- **link**: URL for user participation interface.
- **contract**: Primary contract for the strategy.
- **tvl**: Data endpoint for Total Value Locked (TVL).
- **apr**: Data endpoint for Annual Percentage Rate (APR).
- **lockDuration**: Duration assets are locked (ISO 8601).
- **riskLevel**: Risk level indicator (0 to 1).
- **riskReportUrl**: URL to risk report on Google Sheets.
- **startDateTimeUtc**: Start date and time (UTC) of the strategy.
- **unlisted**: Visibility status of the strategy.
- **disabled**: Interaction status with the strategy.
- **message**: Important messaging related to the strategy.
- **tokenDenoms**: Array describing assets needed for participation.
- **rewardDenoms**: Array describing rewarded assets.
- **tags**: Array of tags associated with the strategy.

#### Category 

The currently accepted 'categories' are:
- **Lending**: The assets are lent out to borrowers. 
- **Trading Vault**: The assets are actively managed by a vault controller. The assets are under complete control of the agent, and can be traded, lent, staked, provided as liquidity, etc.
- **Staking**: The assets are locked into a crypto platfrom specifically for concensus.
- **Liquid Staking**: The assets are staked and an economically representative derivative asset is also minted. 
- **Perp LP**: The assets provide liquidity for a perpetual futures contract market.
- **LP**: The assets provide liquidity for a liquidity pool.

#### Tags

The currently accepted `tags` are:
- **Correlated**: indicating that any two assets involved in the strategy are closely related. For example,
  - USDC/USDT LP is correlated because both the USDC and USDT prices are meant to follow the same asset (i.e., U.S. Dollar).
  - Liquid Staking strategies also count as correlated, because the staked token and the LST are closely related.
- **Stablecoin**: indicating that the asset(s) required by the strategy is a stablecoin of a world fiat currency.
- **Blue Chip**: indicating that one or more of the assets required by the strategy are 'Blue Chip' assets, i.e., of a high Market Capitalization--in this case, ranked among the top 50 on CoinGecko.

### Examples

Below are example 'strategy' objects, demonstrating valid JSON data conforming to the schema:

```
{
  "id": "osmosis-staking",
  "name": "OSMO Staking",
  "platform": "Cosmos SDK (on Osmosis)",
  "category": "staking",
  “type”: “osmosis-staking”,
  "link": "/stake",
  "contract": "osmo1234…",
  "tvl": "",
  "apr": "",
  "lockDuration": "P14D",
  "riskLevel": 0.01,
  “riskReportUrl”: “”
  "startDateTimeUtc": "2019-01-01T01-01-01Z",
  "unlisted": false,
  "disabled": false,
  "message": "Staking on Osmosis grants the abillity to participate in Osmosis Governance.",
  "tokenDenoms": [
    {
      “coinMininalDenom”: “ibc/27..”,
      “_comment”: “ATOM”
    }
  ],
  "rewardDenoms": [
    {
      “coinMininalDenom”: “ibc/27..”,
      “_comment”: “ATOM”
    }
  ],
  “tags”: [
    “Correlated”,
    “Stablecoin”,
    “Blue chip”
  ]
}
```


### Data Endpoints

The Data Endpoints used to provide TVL and APR data for strategies must follow a precise structure.

#### TVL Data Endpoint

The TVL Data Endpoint must specify the current Total Value Locked (TVL), as well as the maximum capacity for the strategy.
If there is no maximum capacity, specify the value as "-1".
The amounts must include all assets required to participate in the strategy.
The amounts must be represented in the base denominiation unit of the asset (and NOT in dollar amount).
For example:
```
{
  "assets": [
    {
      "coinMinimalDenom": "ibc/27...",
      "tvl": 23456,
      "max_tvl": 234567
    },
    {
      "coinMinimalDenom": "uosmo",
      "tvl": 23456,
      "max_tvl": 234567
    }
  ]
}
```

#### APR

The APR Data Endpoint must specify the current estimated Annual Rate Percentage (APR).
If the estimated APR is a range, opt for the low end of the range.
The amounts must be represented as a percent using decimal type.
For example:
```
{
  "apr": 123.456
}
```

### Report Card

All strategies require a Report Card and Risk Assessment. Apply for risk assessment [here](here).


## Contributing

Contributions to the schema are welcome. If you identify any issues, have suggestions for improvements, or wish to contribute enhancements, feel free to open an issue or submit a pull request.
