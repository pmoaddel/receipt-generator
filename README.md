# ReceiptGenerator

This application allow a user to print a receipt calculated from a basket of goods using a simple point and click interface.

Tax is calculated by the following:

1. Basic sales tax is applicable at a rate of 10% on all goods, except candy, popcorn and coffee, which are exempt.
2. Import duty is an additional sales tax applicable on all imported goods at a rate of 5%, with no exemptions.
3. Sales tax is rounded up to the nearest multiple of $0.05. This rounding is done by item, by type of tax (basic sales and import duty)

## Running Locally

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# receipt-generator
