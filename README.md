## Set Up
```bash
# Clone this repository
$ git clone https://github.com/antopulvirenti/mars-rover.git

# Go into the repository
$ cd mars-rover

# Install dependencies
$ yarn install
```
## Getting Started


First, generate a .env file with the following variable:
```bash
API_URL = https://api.nasa.gov/mars-photos/api/v1/rovers
```
You will also need the `API_KEY` variable. You can use `DEMO_KEY` as a value or generate your own Key on the NASA website by following these steps:
1. Enter the [NASA website](https://api.nasa.gov).
2. Find the Generate API Key section and complete the form.
<img width="720" alt="Captura de Pantalla 2021-12-22 a la(s) 13 09 21" src="https://user-images.githubusercontent.com/72531489/147121812-535e4f1c-c86b-4320-83b5-516b96f48cd3.png">
3. It will redirect you to another screen where the value that we will use for our variable will be.

##
Then you can run the development server:

```bash
# Run the development server
$ yarn dev
```
