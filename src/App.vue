<template>
  <v-app>
    <v-app-bar color="primary" :elevation="1">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
      </template>
      <v-app-bar-title class="pl-3">
        Goronyantum Tool
      </v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer
      color="accent"
      v-model="drawer"
      disable-route-watcher
      temporary
    >
      <v-list nav>
        <v-list-item
          title="Home"
          value="home"
          @click="$router.push('/')"
        ></v-list-item>
        <v-list-item
          title="MarkdownCheckbox"
          value="markdowncheckbox"
          @click="$router.push('/markdowncheckbox')"
        ></v-list-item>
        <v-list-item
          title="TableConverter"
          value="tableconverter"
          @click="$router.push('/tableconverter')"
        ></v-list-item>
        <v-list-item
          title="RecipeConverter"
          value="recipeconverter"
          @click="$router.push('/recipeconverter')"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const drawer = ref(false);
</script>

<style scoped></style>
