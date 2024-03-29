# Earn Strategy JSON Schema

## Overview

This JSON Schema defines the structure and constraints for describing earn strategies within our platform. Earn strategies represent various opportunities for users to earn rewards or benefits by participating in specific activities or programs offered by our platform or partner networks.

The schema is designed to capture essential details about each earn strategy, including its identifier, display name, platform provider, category, type, associated contracts, data endpoints, duration, risk level, start date and time, visibility status, messaging, and the assets involved.

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
- **geoblock**: Data endpoint for whether the region is geoblocked.
- **lockDuration**: Duration assets are locked (ISO 8601).
- **riskLevel**: Risk level indicator (0 to 1). 
- **startDateTimeUtc**: Start date and time (UTC) of the strategy.
- **unlisted**: Visibility status of the strategy.
- **disabled**: Interaction status with the strategy.
- **message**: Important messaging related to the strategy.
- **depositDenoms**: Array describing assets deposited for participation in the strategy.
- **positionDenoms**: Array describing assets representing a position in the strategy.
- **rewardDenoms**: Array describing rewarded assets for participating in the strategy.
- **categories**: Array of categories describing the deposit asset(s) of the strategy.

#### Type 

The currently accepted keywords for `type` are (case-sensitive):
- **Lending**: The assets are lent out to borrowers. 
- **Staking**: The assets are locked into a crypto platfrom specifically for concensus.
- **Liquid Staking**: The assets are staked and an economically representative derivative asset is also minted. 
- **Perps LP**: The assets provide liquidity for a perpetual futures contract market.
- **LP (Vault)**: The assets are added to a vault and provide liquidity in Osmosis spot pools.
  
Any new Type must also be added to the Strategies Schema.

#### Categories

The currently accepted `categories` are:
- **Stablecoins**: indicates that all assets required for deposit in the strategy are stablecoins of a world fiat currency.
- **Blue Chip**: (top 50 market cap.) indicates that one or more of the assets required for deposit in the strategy are of a high Market Capitalization--in this case, ranked among the top 50 on CoinGecko.
- **Correlated**: indicates that all assets (only applies to multi-asset strategies) required for deposit in the strategy follows a similar price action due to having a common relative asset. For example:
  - USDC/USDT LP is categorized as correlated because both the USDC and USDT prices are meant to follow the same asset's value (i.e., the U.S. Dollar's value).

Any new Category must also be added to the Strategies Schema.

#### Method

The Method value will guide how the controller queries the involved contracts or modules, and therefore should discriminate between platform, strategy type, vault type, bond duration, etc.

Some currently accepted values for `method` are:
- Osmosis Staking: 'osmosis-staking'
- Stride Liquid Staking: 'stride-liquid-staking'
- Quasar CL Vault: 'quasar-cl-vault'
- Levana LP: 'levana-pool-lp'
- Levana xLP: 'levana-pool-xlp'
- Mars Lending: 'mars-lending'

New Methods may also be added and are not hardcoded into the schema.

### Examples

Below are example 'strategy' objects, demonstrating valid JSON data conforming to the schema:

```
{
  "id": "osmosis-staking",
  "name": "OSMO Staking",
  "platform": "Cosmos SDK (on Osmosis)",
  "type": "Staking",
  "link": "https://app.osmosis.zone/stake",
  "contract": "osmo1234…",
  "tvl": "",
  "apr": "",
  "geoblock": "",
  "lockDuration": "P14D",
  "riskLevel": 0.01,
  “riskReportUrl”: “”
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

### Risk Level

The Risk Level of a strategy is determined formulaically using values entered into the submitted Earn Strategy Report Card Application:
https://docs.google.com/spreadsheets/d/1_FM7hJKl017wAaHcYybN3lGSMeJMqiuevNX6H8LGnD0

To apply for a risk assessment of an Earn Strategy,
 - create a copy the 'Earn Strategy Report Card Application' Google Sheets spreadsheet,
 - enter the relevant data pertaining to the strategy into the copied spreadsheet, and
 - provide a link to the copied spreadsheet in the Pull Request to this repository

Once the application has been reviewed (manually for accuracy), and a risk level determined, 


## Contributing

Contributions to the schema are welcome. If you identify any issues, have suggestions for improvements, or wish to contribute enhancements, feel free to open an issue or submit a pull request.
