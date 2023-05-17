# Maintenance Mode

Activates a Maintenance Mode. Displays the store logo. Can display a custom headline and message or a hyperlinked image.

Tab and hold the finger down on the maintenance page for 5s to hide it.

## Configuration

- `enableMaintenanceMode`: true or false to activate or deactivate the Maintenance Mode in general.
- `testUser`: Add a users email address to a json array to deactivate the Maintenance Mode for this user. Multiple user email addresses are possible.
```json
"default": [
  "Email-address 1",
  "Email-address 2",
  "..."
],
```
- `customHeadline`: Define a custom headline which will replace the default headline.
- `customMessage`: Define a custom message which will replace the default message.
- `images`: Array of images with {imageSource, imageHref}
- `iosAppVersions`: The maintenance mode appears only for these iOS versions(e.g. `["10.46.0", "10.47.0", "10.47.1"]`).
- `androidAppVersions`: The maintenance mode appears only for these Android versions(e.g. `["5.18.0"]`).
- `iosLink`: Define an external url for iOS devices. A button will be displayed that is linked to the external url.
- `androidLink`: Define an external url for Android devices. A button will be displayed that is linked to the external url.
- `iosButtonText`: Define a text for the link on iOS devices.
- `androidButtonText`: Define a text for the link button on Android devices.
- `startDate`: Define a start date for the maintenance mode. You can also only define a start or an end date. Format: YYYY/MM/DD - HH:mm (e.g. `"2023/04/20 - 00:00"`).
- `endDate`: Define a end date for the maintenance mode. You can also only define a start or an end date. Format: YYYY/MM/DD - HH:mm (e.g. `"2023/05/17 - 10:00"`).

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
