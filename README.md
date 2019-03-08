# react-signalayer-player
To go live and start displaying campaigns to users, you'll need to install Signalayer Player script on your site.

## Installation
```bash
npm i react-signalayer-player --save
```

## Usage
Inside of your application where you would be running Signalayer, insert `SignalayerPlayer`:

NOTE! Parameters `projectId` and `API_KEY` are the same values and it's always required.

```js
import React from 'react';
import SignalayerPlayer from 'react-signalayer-player';

export class App extends React.Component {

  render () {
    // optional params
    const userData = {
        userId: "123",
        email: "user@email.com"
    };

    return (
      <div className="app">
        <SignalayerPlayer projectId="{API_KEY}" userData={userData} />
      </div>
    );
  }
}
```



#### API Usage
Player API is a developer interface to communicate your site's data to Signalayer. The API will help you set up custom triggers and personalize campaigns based on user data and actions.

Be sure to Install **Signalayer Player** on your site before using the API. 

```js
import { SignalayerAPI } from 'react-signalayer-player';
SignalayerAPI.show("campaign_id");
```


Find more information in our [Developer Documentation](https://signalayer.com/docs#apiDocsSection)