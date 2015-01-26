# HTTPRunner

## Description
HTTPRunner is an experiment to create a game from purely Javascript code just
because I can. I have an endlessly deep love of the game Android: Netrunner
and wanted to be able to play it with friends of mine remotely, and on a platform
that supports any OS. I landed on using Javascript because it would allow me to
make a browser-based version of the game, with native support for all platforms.

A couple other major goals for this system/platform is to create a language
processing portion and figure out a standardized DSL that the cards follow in
order to create game scripts directly from the card text, with little to no
human involvement. This will allow the game to stay up-to-date with the latest
cards with little to no time between a release and the cards in that release
being added.

*Note: This project is not intended to be a publicly released product, as it
stands. If the product is of sufficient quality, I may enter into talks with
Fantasy Flight Games in order to discuss licensing and potential public
release.*

## Next Steps

The following is a list of things that need to be completed in order to satisfy
my unending perfectionism:

 - Initial game state with supplied deck list
 - Basic player actions:
   - Take Action
   - Card Draw
   - Credit Gain
   - Play Events
   - Trigger Action Ability
   - Corp Actions:
     - Install Cards:
       - ICE
       - Agendas/Assets
       - Upgrades
     - Advance Cards
     - Rez Cards
     - Destroy Resources on Tagged Runner
     - Wipe Virus Counters
   - Runner Actions:
     - Install Cards
     - Make Run
     - Access Cards
     - Remove Tag
 - Turn Order:
   - Rez Windows
 - Text-Processing
   - Determine DSL
   - Parser Regexes

