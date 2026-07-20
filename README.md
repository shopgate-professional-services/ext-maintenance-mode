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
- `timezone`: Fixed time zone in which `startDate` and `endDate` are interpreted, given as an IANA name (e.g. `"Europe/Berlin"`). Daylight saving time is handled automatically. Leave it empty to interpret the dates in the device's local time zone (the previous behaviour).
- `startDate`: Define a start date for the maintenance mode. You can also only define a start or an end date. Format: YYYY/MM/DD - HH:mm (e.g. `"2023/04/20 - 00:00"`). Interpreted in the configured `timezone`.
- `endDate`: Define a end date for the maintenance mode. You can also only define a start or an end date. Format: YYYY/MM/DD - HH:mm (e.g. `"2023/05/17 - 10:00"`). Interpreted in the configured `timezone`.
- `maintenancePagesWhitelist`: Whitelist that enables the maintenance mode only for configured pages (e.g. `["/cart"]`).

## Scheduling with a fixed timezone

`startDate` and `endDate` are wall-clock times. Without `timezone` they are interpreted in each shopper's device timezone, so the maintenance window would start at a different absolute moment per device. Set `timezone` to a fixed IANA name to make the window start and end at the same real moment for everyone, regardless of where the shopper is. Daylight saving time is applied automatically for the given zone.

Example – maintenance from 22:00 to 23:00 Berlin time on 2024/05/17:

```json
{
  "enableMaintenanceMode": true,
  "timezone": "Europe/Berlin",
  "startDate": "2024/05/17 - 22:00",
  "endDate": "2024/05/17 - 23:00"
}
```

With this configuration the maintenance page shows between 22:00 and 23:00 in Berlin (i.e. 20:00–21:00 UTC in summer) for every shopper, no matter their device timezone. Leaving `timezone` empty keeps the previous behaviour (each device's local time).


## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
