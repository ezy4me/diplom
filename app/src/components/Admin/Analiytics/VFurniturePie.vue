<template>
  <Doughnut v-if="loaded" id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "FurniturePieChart",
  components: { Doughnut },
  data: () => ({
    loaded: false,
    chartData: {
      labels: [],
      datasets: [
        {
          label: "Кол-во",
          backgroundColor: ["#1240AB", "#2A4480", "#06266F", "#4671D5", "#6C8CD5"],
          data: [],
        },
      ],
    },
    chartOptions: {
      responsive: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14,
              family: "system-ui",
            },
          },
        },
      },
    },
  }),
  async mounted() {
    this.loaded = false;
    await this.$store.dispatch("furniture/GET_FURNITURES_FROM_API");
    try {
      const furnituresListName = this.$store.state.furniture.furnituresPie.map(
        (m) => m.name
      );
      const furnituresListCount = this.$store.state.furniture.furnituresPie.map(
        (m) => m.count
      );
      this.chartData.labels = furnituresListName;
      this.chartData.datasets[0].data = furnituresListCount;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
