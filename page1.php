<?php require "src/blocks/header-main.php"?>

<div id="app">
    <h1>{{ product }}</h1>
    <p>{{ info }}</p>
    <img v-bind:src="image"/>
</div>

<?php require "src/blocks/footer-main.php" ?>
