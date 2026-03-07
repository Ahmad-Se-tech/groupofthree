---
layout: opencs
title: Adventure Game 
permalink: /gamify/adventure
---

<div id="gameContainer">
    <div id="promptDropDown" class="promptDropDown" style="z-index: 9999"></div>
    <!-- GameEnv will create canvas dynamically -->
</div>

<script type="module">
    // Adnventure Game assets locations
    import Core from "{{site.baseurl}}/assets/js/GameEnginev1/essentials/Game.js";
    import GameControl from "{{site.baseurl}}/assets/js/GameEnginev1/essentials/GameControl.js";
    import GameLevelKirby from "{{site.baseurl}}/assets/js/GameEnginev1/GameLevelKirby.js";
     import GameLevelSpace from "{{site.baseurl}}/assets/js/GameEnginev1/GameLevelSpace.js";
    import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    const gameLevelClasses = [GameLevelKirby, GameLevelSpace];

    // Web Server Environment data
    const environment = {
        path:"{{site.baseurl}}",
        pythonURI: pythonURI,
        javaURI: javaURI,
        fetchOptions: fetchOptions,
        gameContainer: document.getElementById("gameContainer"),
        gameLevelClasses: gameLevelClasses

    }
    // Launch Adventure Game using the central core and adventure GameControl
    Core.main(environment, GameControl);
</script>
