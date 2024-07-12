# Earn Strategy JSON Schema

## Overview

The Osmosis Zone Earn page presents various strategies for users to further utilize their available assets.
- The Earn page intends to only show strategies where the deposited asset(s) correlate to the performance of the strategy. For example:
  - Depositing ATOM for backing ATOM/USD Perpetual Futures Markets
  - Providing ATOM for an ATOM Borrowing Vault
  - Providing USDC and USDT for funding a USDC/USDT Liquidity Pool
- However, strategies that perform in ways unrelated to the deposit asset(s) are excluded from the Earn page. For example:
  - Depositing USDC for backing SOL/USDC Perpertual Futrures

This JSON Schema defines the structure and constraints for describing earn strategies within our platform. Earn strategies represent various opportunities for users to earn rewards or benefits by participating in specific activities or programs offered by our platform or partner networks.

The schema is designed to capture essential details about each earn strategy, including its identifier, display name, platform (project), type, categories, method, link to platform's UI, associated contracts, data endpoints, lock duration, risk level, start date and time, visibility status, messaging, and the assets involved.

### Properties

- **id**: Unique identifier for the strategy.
- **name**: Display name for the strategy.
- **platform**: Platform providing the earn strategy.
- **type**: Type classification of the strategy.
- **method**: Used for determining the specifc style of contract.
- **link**: URL for user participation interface.
- **contract**: Primary contract for the strategy.
- **tvl**: Data endpoint for Total Value Locked (TVL).
- **apr**: Data endpoint for Annual Percentage Rate (APR).
- **balance**: Data endpoint for address Balance.
- **geoblock**: Data endpoint for whether the region is geoblocked.
- **lockDuration**: Duration assets are locked (ISO 8601).
- **riskLevel**: Risk level indicator (0 to 1).
- **riskReportUrl**: URL to Report Card of the strategy.
- **startDateTimeUtc**: Start date and time (UTC) of the strategy.
- **unlisted**: Visibility status of the strategy.
- **disabled**: Interaction status with the strategy.
- **message**: Important messaging related to the strategy.
- **depositDenoms**: Array describing assets deposited for participation in the strategy.
- **positionDenoms**: Array describing assets representing a position in the strategy.
- **rewardDenoms**: Array describing rewarded assets for participating in the strategy.
- **categories**: Array of categories describing the underlying asset(s) of the strategy.

#### Type 

Broad type classification of the strategy. The currently accepted keywords for `type` are (case-sensitive):
- **Lending**: The assets are lent out to borrowers. 
- **Staking**: The assets are locked into a crypto platfrom specifically for concensus.
- **Liquid Staking**: The assets are staked and an economically representative derivative asset is also minted. 
- **Perps LP**: The assets provide liquidity for a perpetual futures contract market.
- **LP (Vault)**: The assets are added to a vault and provide liquidity in Osmosis spot pools.
  
Any new Type must also be added to the Strategies Schema.

#### Method

The Method value will guide how the controller queries the involved contracts or modules, and therefore should discriminate between platform, strategy type, vault type, bond duration, etc., but is shared among common strategies.

Some example values for `method` are:
- `osmosis-staking`: Used only for Osmosis Staking, and therefore is a method used by only one strategy.
- `quasar-cl-vault`: Used for many of Quasar's strategies, whether it be stkOSMO/OSMO Dynamic S+ or OSMO/ETH Dynamic A+.
- `levana-pool-lp`: Used for Levana's perpetual futures liquidy providing strategies, but only the unstaked positions.
- `levana-pool-xlp`: Used for Levana's Perps xLP (staked LP) strategies.
- `mars-lending`: Used for Mars Protocol's Red Bank Lending strategies.

New methods may also be added and are not hardcoded into the schema.

#### Categories

The currently accepted `categories` are:
- **Stablecoins**: indicates that all underlying crypto assets are stablecoins of a world fiat currency.
- **Correlated**: indicates that all underlying crypto assets (only applies to multi-asset strategies) follow a similar price action due to having a common relative asset. For example:
  - USDC/USDT LP is categorized as correlated because both the USDC and USDT prices are meant to follow the same asset's value (i.e., the U.S. Dollar's value).
- **Blue Chip**: (top 50 market cap.) indicates that all underlying crypto assets have a high (top 50) market capitalization.

Any new Category must also be added to the Strategies Schema.

### Examples

Below are example 'strategy' objects, demonstrating valid JSON data conforming to the schema:

```
{
  "id": "osmosis-staking",
  "name": "OSMO Staking",
  "platform": "Cosmos SDK (on Osmosis)",
  "type": "Staking",
  "method": "osmosis-staking",
  "link": "https://app.osmosis.zone/stake",
  "contract": "osmo1234…",
  "tvl": "",
  "apr": "",
  "balance": "https://...balance/${address}",
  "geoblock": "",
  "lockDuration": "P14D",
  "riskLevel": 0.01,
  “riskReportUrl”: “”,
  "startDateTimeUtc": "2019-01-01T01:01:01Z",
  "unlisted": false,
  "disabled": false,
  "message": "Staking on Osmosis grants the abillity to participate in Osmosis Governance.",
  "depositDenoms": [
    {
      “coinMininalDenom”: “uosmo”,
      “_comment”: “OSMO”
    }
  ],
  "positionDenoms": [],
  "rewardDenoms": [
    {
      “coinMininalDenom”: “uosmo”,
      “_comment”: “OSMO”
    }
  ],
  “categories”: [
    “Correlated”,
    “Stablecoin”,
    “Blue chip”
  ]
}
```


### Data Endpoints

The Data Endpoints used to provide TVL and APR data for strategies must follow a precise structure.

#### TVL Data Endpoint

The TVL Data Endpoint must specify the current Total Value Locked (TVL) for each deposit asset.
The amounts must include ALL deposit assets required for participation in the strategy.
The amounts must be represented as the base denominiation unit of the asset (and NOT in dollar amount).
If there is a maximum capacity TVL for each asset, they may also be specified.

The TVL and Maximum TVL at the 'strategy' level(, i.e., describing all deposit assets combined,) is optional, but must be expressed in U.S. Dollars. 

For example:
```
{
  "tvlUsd": "1000000",
  "maxTvlUsd": "10000000",
  "assets": [
    {
      "coinMinimalDenom": "ibc/27...",
      "tvl": "23456",
      "maxTvl": "234567"
    },
    {
      "coinMinimalDenom": "uosmo",
      "tvl": "23456",
      "maxTvl": "234567"
    }
  ]
}
```

#### APR Data Endpoint

The APR Data Endpoint must specify the current estimated Annual Rate Percentage (APR).
If the estimated APR is a range, opt for the low end of the range.
The amounts must be represented as a percent using decimal type.

For example:
```
{
  "apr": 123.456
}
```

#### Balance Data Endpoint

The Address Balance Data Endpoint must specify the Balance of the address in the strategy.
The Query requires a user address as a parameter, which replaces the inline `${address}` placeholder variable.
The result must specify:
  - the strategy ID.,
  - address balance denominated in both, amount and in U.S. Dollar value, and
  - value of unclaimed rewards (in USD).

For example:
```
{
  "strategy":"ibc-D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858-mars",
  "balance": {
    "amount":"0",
    "usd":0
  },
  "unclaimed_rewards": {
    "total_usd":0
  }
}
```

#### Geoblock Endpoint

The Geoblock Endpoint specifies whether the connecting region is geographically restricted by the primary interface for the strategy.
The connection region is confirmed as a country code.
The endpoint does not list all regions, nor accepts arguments; it only reports whether the region being used to query is 'allowed' or not.
The string shall be blank if there is no geographical restriction.

For example:
```
{
  "allowed": false,
  "countryCode": "US"
}
```

### Risk Level and Report Card

The Risk Level of a strategy is determined formulaically using information provided by the submitted **Earn Strategy Report Card** application:
https://docs.google.com/spreadsheets/d/1_FM7hJKl017wAaHcYybN3lGSMeJMqiuevNX6H8LGnD0

To apply for a Risk Report Card for an Earn Strategy,
 - create a copy the 'Earn Strategy Report Card' Google Sheets Spreadsheet Document,
 - review the instructions and enter the relevant data pertaining to the method and strategy into the copied spreadsheet, and
 - provide a link to the copied spreadsheet in your Pull Request to this repository.

Once the application has been reviewed and a risk level determined, the addition of the strategy into the CMS (`strategies.json`) can be completed. 


## Contributing

Contributions to the schema are welcome. If you identify any issues, have suggestions for improvements, or wish to contribute enhancements, feel free to open an issue or submit a pull request.
