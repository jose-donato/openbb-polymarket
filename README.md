# Polymarket App for OpenBB Workspace

An OpenBB Workspace app that connects to the Polymarket API, enabling the integration of prediction market data. It defines widgets for visualizing Polymarket events, markets, price history, and analytics within the OpenBB Workspace interface.

## Connecting to OpenBB Workspace

Follow these steps to connect this backend as a data source in OpenBB Pro:

1. Log in to your OpenBB Pro account at [pro.openbb.co](https://pro.openbb.co)
2. Navigate to the **Apps** page
3. Click the **Connect backend** button
4. Fill in the following details:
   - **Name**: Polymarket Backend
   - **URL**: `https://openbb-polymarket.jose-donato.workers.dev/`
5. Click the **Test** button to verify the connection
6. If the test is successful, click the **Add** button

Once added, you'll find Polymarket app available in the Apps section of OpenBB Workspace.

## Available Widgets

This backend provides the following widgets for analyzing Polymarket data:

- **Search Events** - Search for events on Polymarket
- **Search Tags** - Search for tags on Polymarket  
- **Top Events** - Get the top events by volume
- **Top Markets** - Get the top markets by volume
- **Market Details** - Get detailed information about a specific market
- **Event Details** - Get detailed information about a specific event
- **Event Markets** - Get all markets for a specific event
- **Price History** - Get price history charts for markets
- **Event Price History** - Get price history for all markets in an event
- **Trending Tags** - Get trending tags on Polymarket
- **Home Cards** - Get featured events from the home page
- **Event Comments** - Get user comments for events

## Running locally

To run this project locally, follow these steps:

1.  **Prerequisites:**
    *   Ensure you have [Node.js](https://nodejs.org/) installed or [Bun](https://bun.sh/).

2.  **Clone the Repository:**
    ```bash
    git clone https://github.com/jose-donato/openbb-polymarket
    cd openbb-polymarket
    ```
3.  **Install Dependencies:**
    ```bash
    bun install # or npm install, yarn, pnpm
    ```
4.  **Start the Development Server:**
    ```bash
    bun run dev # or npm run dev, yarn dev, pnpm dev
    ```
    This command will start a local server at `http://localhost:5173`, where you can test the endpoints and view the setup instructions.

## Credits

Created by [@josedonato__](https://x.com/josedonato__)
