# Osmosis Apps List
Osmosis Apps List is a curated list of applications built on, or interactive with, Osmosis. It serves as a resource for users to discover new and useful applications that enhance their experience on the platform.

## Adding Your Application
To add your application to the list, simply create a pull request to this repository that includes your application object added to the end of the applications array in the applications.json file. Your application object should include values for all the required properties. Once your pull request is merged, your application will be added to the list!

## Application Image Requirements
The Osmosis App Store aims for a high standard of quality, and therefore the images for each App must meet certain requirements.
We require 1) a Cover Image, used for the standard application cards, and 2) a Hero Image for if/when the aplication is Featured at the top. For both images, aim for thematic aesthetic/imagery. Avoid screenshots of the application's UI, and avoid text, like a slogan or a call to action; the only text that we will accept should be part of the logo (and note that the name willl already appear on top of, or adjacent to the image, so it's not required).
 - Cover Image Specs:
   - Aspect Ratio 5:3
   - Minimum Resolution: 525x315
 - Hero Image Specs:
   - Aspect Ratio 10:4
   - Minimum Resolution: 1446x579

We will accept just about any format (PNG, SVG, JPG), although we prefer to receive .WEBP, as that is that efficient format to which we would convert the images before adding the App. 

## Application Properties
Here are the properties that can be included in your application object:

 - **title** (required): The name of your application. This is the main title that users will see when browsing the app store.
 - **subtitle** (required, max 130 characters): A short and catchy phrase or tagline that describes your application. This should give users a quick idea of your app's purpose or function.
 - **external_URL** (required): The web address where users can learn more about your application, such as its official website or landing page.
 - **thumbnail_image_URL** (required): The web address of a representative image or icon for your application. This image will be displayed alongside your app's title and subtitle in the app store.
   - Aspect Ratio 5:3, Minimum Resolution: 525x315
   - Uploaded to this repository as: ./images/{app}_thumbnail.{ext}
   - No words in image (unless it's part of the project name or logo)
 - **hero_image_URL** (optional): The web address (uploaded to this repository) of a larger, eye-catching image that showcases your application. This image will be prominently displayed if your app is selected for the "featured" spot.
   - Aspect Ratio 10:4, Minimum Resolution: 1446x579
   - Uploaded to this repository as: ./images/{app}_hero.{ext}
   - No words in image (unless it's part of the project name or logo)
 - **twitter_URL** (optional, include if available): The web address of your application's official Twitter account. Providing this link enables users to follow your app's updates on Twitter.
 - **medium_URL** (optional, include if available): The web address of your application's official Medium account or blog. This link will direct users to articles or blog posts related to your app.
 - **github_URL** (optional, include if available): The web address of your application's source code repository on GitHub. Providing this link enables users to access and contribute to your app's codebase.
 - **featured** (optional, for internal use only): A true/false value that indicates whether your application should be showcased as a featured app in the app store. This property is for internal use and should not be modified by developers.

## Example Application Object
Here's an example of what your application object should look like:
```
{
  "title": "ION DAO",
  "subtitle": "$ION is the secondary native token on @OsmosisZone",
  "external_URL": "https://ion.wtf",
  "thumbnail_image_URL": "https://raw.githubusercontent.com/osmosis-labs/apps-list/main/images/ion_dao_thumbnail.png",
  "hero_image_URL": "https://raw.githubusercontent.com/osmosis-labs/apps-list/main/images/ion_dao_hero.png",
  "twitter_URL": "https://twitter.com/_IONDAO",
  "medium_URL": "https://medium.com/_IONDAO",
  "github_URL": "https://github.com/many-things/ion-dao-contracts",
  "featured": false
}
```
