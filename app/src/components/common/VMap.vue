<template>
  <div class="map">
    <YandexMap
      :settings="settings"
      :coordinates="[55.7887, 49.1221]"
      zoom="12"
      style="width: 30vw; height: 50vh"
    >
    </YandexMap>
  </div>
</template>

<script>
import { YandexMap } from "vue-yandex-maps";

export default{
  setup() {
    const settings = {
      apiKey: "1689e852-97b4-44b5-a42a-3a0873eb135c",
      lang: "ru_RU",
      coordorder: "latlong",
      enterprise: false,
      version: "2.1",
    };

    return {
      settings,
    };
  },
  components: { YandexMap },
};
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

.map{
  @include border-3d;
}
</style>
