# Landing Page

Welcome to the Landing Page CMS! This repository contains a JSON schema for structuring landing page content. We welcome contributions from the community to help improve the CMS and keep the content up to date.

## Overview

The Landing Page CMS is designed to organize content for the Osmosis Zone landing page. It utilizes a JSON schema to define the structure of the content, ensuring consistency and ease of use.

### Upcoming Assets

Currently, the only data maintained in this CMS is the Upcoming Assets. Assets shown here should be valuable and strategic for visitors to see.
Upcoming assets should only include assets launching within the next month, and have a plan for asset integration, as well as substanital market making. 

## Schema

### Properties

The Landing Page schema includes the following properties:

- `upcomingAssets`: An array of assets containing information about each asset.
  - `assetName`: The name of the asset.
  - `symbol`: The symbol of the asset.
  - `chainName`: The name of the blockchain or network where the asset originates.
  - `logoURL`: The URL to the logo image of the asset. It must be hosted on the Cosmos chain registry master and have a `.png` or `.svg` extension.
  - `estimatedLaunchDate`: The estimated launch date of the asset. May be precise to the day (e.g., March 24, 2024) or to the quarter (e.g., Q3 2023). 
  - `osmosisAirdrop`: Indicates whether Osmosis Stakers or LPs are eligible for an airdrop of the asset.

### Example

Here's an example of how content can be structured using the Landing Page schema:

```json
{
  "upcoming_assets": [
    {
      "assetName": "Osmosis",
      "symbol": "OSMO",
      "chainName": "Osmosis",
      "logoURL": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
      "estimatedLaunchDateUtc": "January 1, 2049",
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
