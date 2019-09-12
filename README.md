# Maintenance Mode

Activates a Maintenance Mode. Displays the store logo. Can display a custom headline and message or a linked image.

## Configuration

- enableMaintenanceMode: true or false to activate or deactivate the Maintenance Mode in general.

- testUser: Add a users email address to a json array to deactivate the Maintenance Mode for this user. Multiple user email addresses are possible.

```json
"default": [
  "Email-address 1",
  "Email-address 2",
  "..."
],
```

- customHeadline: Define a custom headline which will replace the default headline.

- customMessage: Define a custom message which will replace the default message.

- imageSource: Define the image url source.

- imageHref: Define the url that opens when the image is selected.

- isText: Select true if the custom headline and custom message should be displayed, otherwise the image is shown.

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.
