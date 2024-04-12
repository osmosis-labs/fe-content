# Landing Page

This repository contains a JSON schema for structuring Osmosis Zone Landing Page content.

## Overview

The Landing Page CMS is designed to organize content for the Osmosis Zone landing page. It utilizes a JSON schema to define the structure of the content, ensuring consistency and ease of use.

### Past Airdrops

Past airdrops includes assets that have already been airdroped to Osmosis users, and are also listed on Osmosis Zone.
Assets added here that are not listed on Osmosis Zone will not be detected.

### Upcoming Assets (relocated)

Currently, the data for upcoming assets is maintained in the assetlists repo.

Assets shown here should be valuable and strategic for visitors to see.
Upcoming assets should only include assets launching within the next month, and have a plan for asset integration, as well as substanital market making. 

## Schema

### Properties

The Landing Page schema includes the following properties:

- `pastAirdrop`: An array of assets containing information about each asset:
  - `denom`: The minimal coin denomination of the asset when on Osmosis chain. This will usually look like an IBC denom.
  - `amount`: The amount of the asset that was distrubted via the airdrop. Exact speicifcation TBD.
  - `_comment`: Optional unused string property, best used to help identify the asset by name and ticker symbol.

- `upcomingAssets`: An array of assets containing information about each asset:
  - `assetName`: The name of the asset.
  - `symbol`: The symbol of the asset.
  - `chainName`: The name of the blockchain or network where the asset originates.
  - `logoURL`: The URL to the logo image of the asset. It must be hosted on the Cosmos chain registry master and have a `.png` or `.svg` extension.
  - `estimatedLaunchDate`: The estimated launch date of the asset. May be precise to the day (e.g., Mar 24, 2024) or to the quarter (e.g., Q3 2023). 
  - `osmosisAirdrop`: Indicates whether Osmosis Stakers or LPs are eligible for an airdrop of the asset.

### Example

Here's an example of how content can be structured using the Landing Page schema:

```json
{
  "pastAirdrops": [
    {
      "denom": "ibc/D79E7D83AB399BFFF93433E54FAA480C191248FC556924A2A8351AE2638B3877",
      "_comment": "Celestia $TIA"
    }
  ],
  "upcomingAssets": [
    {
      "assetName": "Osmosis",
      "symbol": "OSMO",
      "chainName": "Osmosis",
      "logoURL": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
      "estimatedLaunchDateUtc": "Jan 1, 2049",
      "osmosisAirdrop": false
    },
    {
      "assetName": "Celestia",
      "symbol": "TIA",
      "chainName": "Celstia",
      "logoURL": "https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/tia.png",
      "estimatedLaunchDateUtc": "Q3 2023",
      "osmosisAirdrop": true
    }
  ]
}
```

## Contributing

Contributions to the schema are welcome. If you identify any issues, have suggestions for improvements, or wish to contribute enhancements, feel free to open an issue or submit a pull request.
