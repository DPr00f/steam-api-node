[![wercker status](https://app.wercker.com/status/b8600ecd75b2a620d06ea912c29502c6/m/master "wercker status")](https://app.wercker.com/project/bykey/b8600ecd75b2a620d06ea912c29502c6)

# About
Node Wrapper to communicate with Steam Web API

# SteamID64 Finder
Please refer to [http://steamid.co/](http://steamid.co/) or [http://steamidconverter.com/](http://steamidconverter.com/) to find the user steam id.



# Install
`npm install steam-api`

# Usage
Note that the `'steam-api-key'` can be defined as an environment variable, with the name of `STEAM_API_KEY`
```es6
var SteamApi = require('steam-api');

var user = new SteamApi.User('steam-api-key', optionalSteamId);
var userStats = new SteamApi.UserStats('steam-api-key', optionalSteamId);
var news = new SteamApi.News('steam-api-key');
var app = new SteamApi.App('steam-api-key');
var player = new SteamApi.Player('steam-api-key', optionalSteamId);
var inventory = new SteamApi.Inventory('steam-api-key', optionalSteamId);
var items = new SteamApi.Items('steam-api-key', optionalSteamId);

// Steam API Backpack
items.GetPlayerItems(appId, optionalSteamId).done(function(result){
  console.log(result);
});

// Inventory
inventory.GetAppItems(appId, optionalSteamId).done(function(result){
  console.log(result);
});

// User methods
user.GetPlayerBans(optionalSteamId).done(function(result){
  console.log(result);
});

user.GetFriendList(optionalRelationship = 'all', optionalSteamId).done(function(result){
  console.log(result);
});

user.GetUserGroupList(optionalSteamId).done(function(result){
  console.log(result);
});

//// e.g. vanityUrl = "pr00fgames";
user.ResolveVanityUrl(vanityUrl).done(function(result){
  console.log(result);
});


// UserStats methods
//// e.g. appId = 17740;
//// e.g. statsName = ['global.map.emp_isle'];
userStats.GetGlobalStatsForGame(appId, statsName).done(function(result){
  console.log(result);
});

//// e.g. appId = 620;
userStats.GetNumberOfCurrentPlayers(appId).done(function(result){
  console.log(result);
});

userStats.GetSchemaForGame(appId).done(function(result){
  console.log(result);
});

userStats.GetPlayerAchievements(appId, optionalSteamId).done(function(result){
  console.log(result);
});

userStats.GetGlobalAchievementPercentagesForApp(appId).done(function(result){
  console.log(result);
});

userStats.GetUserStatsForGame(appId, optionalSteamId).done(function(result){
  console.log(result);
});


// News Methods
news.GetNewsForApp(
                    appId,
                    optionalCount = 5,
                    optionalMaxLength = null
                  )
    .done(function(result){
  console.log(result);
});


// App Methods
app.appDetails(appId).done(function(result){
  console.log(result);
});

app.GetAppList().done(function(result){
  console.log(result);
});

app.GetServersAtAddress(addressOrIp).done(function(result){
  console.log(result);
});

app.UpToDateCheck(appId, version).done(function(result){
  console.log(result);
});


// Player Methods
player.GetSteamLevel(optionalSteamId).done(function(result){
  console.log(result);
});

player.GetPlayerLevelDetails(optionalSteamId).done(function(result){
  console.log(result);
});

player.GetBadges(optionalSteamId).done(function(result){
  console.log(result);
});

player.GetCommunityBadgeProgress(optionalBadgeId, optionalSteamId).done(function(result){
  console.log(result);
});

player.GetOwnedGames(
                      optionalSteamId, 
                      optionalIncludeAppInfo = true, 
                      optionalIncludePlayedFreeGames = false, 
                      optionalAppIdsFilter = []
                    )
      .done(function(result){
  console.log(result);
});
```

# Release Changes

## 1.1.3

 - Bug fixes, check the closed pull requests for more info

## 1.1.2

 - Added Steam API IEconItems support (although the Community Inventory seems to be better for games like CS:GO)

## 1.1.1

 - Lint and BugFixes

## 1.1.0

 - Added Access to Community URL's
 - Introduced Inventory from community.

# More Info
Please Refer to the tests folder to get more information on how to use the library

# Objective
The objective of this library is to wrap the steam web API into a php object.

There are some missing methods that I plan to implement.

Feel free to add some missing methods and as for a pull request on this repo.

The missing methods can be found using the [swissapiknife](https://github.com/Lagg/steam-swissapiknife).

# How can you help
If you have the capacity to fix it yourself by all means do and create a pull request.

If you didn't already please raise an issue on github and I or someone else will try to fix it.
